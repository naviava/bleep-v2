// Next.
import { NextResponse } from "next/server";

// Lib and utils.
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, image } = body;

    const currentUser = await getCurrentUser();
    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { name, image },
    });

    return NextResponse.json(updatedUser);
  } catch (err: any) {
    console.log(err, "ERROR_SETTINGS");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
