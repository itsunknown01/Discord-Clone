import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/services/auth/user";
import { signIn } from "@/services/next-auth/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const validation = LoginSchema.safeParse(body);

  if (validation.success) {
    const { email, password } = validation.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return NextResponse.json({ message: "User already exists" });
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false
      });
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json({
      message: "User created successfully",
      status: 200,
    });
  }

  return new NextResponse("Invalid fields", { status: 500 });
}