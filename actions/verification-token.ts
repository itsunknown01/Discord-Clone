"use server"

import { getUserByEmail } from "@/services/auth/user";
import { getVerificationTokenByToken } from "@/services/auth/verification-token";
import { db } from "@/services/db";

export const newVerficationToken = async (token: string) => {
    try {
        const existingToken = await getVerificationTokenByToken(token);
    
        if (!existingToken) {
          return {success: false ,error: "Token does not exist!"};
        }
    
        const hasExpired = new Date(existingToken.expires) < new Date();
    
        if (hasExpired) {
          return {success: false ,error:"Token has expired"};
        }
    
        const existingUser = await getUserByEmail(existingToken.email);
    
        if (!existingUser) {
          return {success: false ,error:"User does not exist!"};
        }
    
        await db.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            emailVerified: new Date(),
            email: existingToken.email,
          },
        });
    
        await db.verificationToken.delete({
          where: {
            id: existingToken.id,
          },
        });
    
        return { success: true, message: "User is allowed to login" };
      } catch (error) {
        console.log(error);
      }
}