import { sendVerificationEmail } from "@/email/mail";
import { LoginSchema } from "@/schemas/auth";
import {
  generatePasswordToken,
  generateVerificationToken,
} from "@/services/auth/tokens";
import { getUserByEmail } from "@/services/auth/user";
import { signIn } from "@/services/next-auth/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const validation = LoginSchema.safeParse(body);

  if (!validation.success) {
    return new NextResponse("Invalid fields");
  }

  const { email, password } = validation.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return NextResponse.json({ message: "User already exists" });
  }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(
  //     existingUser.email
  //   );
  //   const passwordToken = await generatePasswordToken(verificationToken.email);

  //   await sendVerificationEmail({
  //     email: verificationToken.email,
  //     verificationToken: verificationToken.token,
  //     passwordToken: passwordToken.token,
  //     userName: existingUser.username,
  //   });

  //   return NextResponse.json({
  //     message: "Confirmation email sent",
  //     status: 200,
  //   });
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    message: "User login successfully",
    status: 200,
  });
}