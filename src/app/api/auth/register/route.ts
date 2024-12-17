import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/services/auth/user";
import { db } from "@/services/db";
import { generateVerificationToken } from "@/services/auth/tokens";
import { sendVerificationEmail } from "@/email/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = RegisterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Invalid fields", status: 400 });
    }

    const { name, email, username, password, dateofbirth } = validation.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username,
        dateOfBirth: dateofbirth,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "Unable to create User",
        status: 500,
      });
    }

    const account = await db.account.create({
      data: {
        userId: user.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: user.id,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail({
      email: verificationToken.email,
      verificationToken: verificationToken.token,
      userName: user.username,
    });

    if (user && account) {
      return NextResponse.json({
        message: "User created successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "Unable to link account to created user profile",
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
