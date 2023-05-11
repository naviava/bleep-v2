// Next.
import { NextResponse } from "next/server";

// Lib and utils.
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: currentUser.id } },
        seenBy: { connect: { id: currentUser.id } },
      },
      include: { seenBy: true, sender: true },
    });

    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } },
      },
      include: { users: true, messages: { include: { seenBy: true } } },
    });

    return NextResponse.json(newMessage);
  } catch (err: any) {
    console.log(err, "ERROR_SENDING_MESSAGE");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
