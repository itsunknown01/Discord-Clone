import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return new NextResponse("No File Uploaded", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}.png`;

    if (!existsSync(UPLOAD_DIR)) {
      mkdir(UPLOAD_DIR, { recursive: true });
    }

    const filePath = path.join(UPLOAD_DIR, fileName);
    await writeFile(filePath, buffer);

    const url = `http://localhost:3000/uploads/${fileName}`;

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
