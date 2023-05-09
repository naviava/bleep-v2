// Next.
import { NextResponse } from "next/server";

// External packages.
import bcrypt from "bcrypt";

// Lib and utils.
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Check for missing fields.
    if (!name || !email || !password)
      return new NextResponse("Missing fields", { status: 400 });

    // Hash password.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user and return it.
    const user = await prisma.user.create({
      data: { email, name, hashedPassword },
    });
    return NextResponse.json(user);
  } catch (err: any) {
    console.log(err, "REGISTRATION_ERROR");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
