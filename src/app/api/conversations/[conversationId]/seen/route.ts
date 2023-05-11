// Next.
import { NextResponse } from "next/server";

// Lib and utils.
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/utils/getCurrentUser";

interface IParams {
  conversationId: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: { include: { seenBy: true } },
        users: true,
      },
    });

    if (!conversation)
      return new NextResponse("Invalid conversation.", { status: 400 });

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) return NextResponse.json(conversation);

    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { seenBy: true, sender: true },
      data: { seenBy: { connect: { id: currentUser.id } } },
    });

    return NextResponse.json(updatedMessage);
  } catch (err: any) {
    console.log(err, "ERROR_MESSAGE_SEEN");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
