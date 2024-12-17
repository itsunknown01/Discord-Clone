import { getUserByEmail } from "@/services/auth/user";
import { getVerificationTokenByToken } from "@/services/auth/verification-token";
import { db } from "@/services/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request
) {
  const { token } = await req.json();

  if (!token) return new NextResponse("Token does not exist");

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return new NextResponse("Token does not exist!")
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return new NextResponse("Token has expired")
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return new NextResponse("User does not exist!")
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

  return NextResponse.json("User is allowed to login");
}
