import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/services/auth/user";
import { db } from "@/services/db";

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

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username,
        dateOfBirth: dateofbirth,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}