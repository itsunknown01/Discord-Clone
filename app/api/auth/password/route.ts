import bcrypt from 'bcryptjs';
import { sendPasswordEmail } from "@/email/mail";
import { PasswordSchema } from "@/schemas";
import { getPasswordTokenByEmail, getPasswordTokenByToken } from "@/services/auth/password-token";
import { generatePasswordToken } from "@/services/auth/tokens";
import { getUserByEmail } from "@/services/auth/user";
import { db } from "@/services/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
     const {email} = await req.json()

     const existingUser = await getUserByEmail(email)

     if(!existingUser) {
        return new NextResponse("User does not exist", {status: 404})
     }

     const passwordToken = await generatePasswordToken(existingUser.email)
     await sendPasswordEmail({
        email: passwordToken.email,
        passwordToken: passwordToken.token,
        userName: existingUser.username
     })
     return NextResponse.json({success: true, message:"Email sent successfully"})
   } catch (error) {
    console.error(error);
   }    
}

export async function PUT(req: NextRequest) {
   try {
     const {token,values} = await req.json()

     if(!token) {
      return new NextResponse("Token does not exist", {status: 404})
     }

     const validation = PasswordSchema.safeParse(values)

     if(!validation.success) {
      return new NextResponse("Invalid fields", {status: 404})  
     }

     const {password} = validation.data

     const existingToken = await getPasswordTokenByToken(token)

     if(!existingToken) {
      return new NextResponse("Invalid Token",{status: 404})
     }

     const hasExpired = new Date(existingToken.expires) < new Date();
    
     if (hasExpired) {
      return new NextResponse("Token has expired",{status: 404});
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return new NextResponse("User does not exist!", {status: 404});
    }

    const hashPassword = await bcrypt.hash(password,10)

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashPassword
      },
    });

    await db.passwordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
     return NextResponse.json({success: true, message:"Password changed successfully"})
   } catch (error) {
    console.error(error);
   }    
}