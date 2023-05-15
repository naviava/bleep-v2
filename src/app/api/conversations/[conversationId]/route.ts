// Next.
import { NextResponse } from "next/server";

// Lib and utils.
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/utils/getCurrentUser";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    const existingConversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    if (!existingConversation)
      return new NextResponse("Invalid parameters.", { status: 400 });

    const deletedConversation = await prisma.conversation.deleteMany({
      where: { id: conversationId, userIds: { hasSome: [currentUser.id] } },
    });

    existingConversation.users.forEach((user) => {
      if (user.email)
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation
        );
    });

    return NextResponse.json(deletedConversation);
  } catch (err: any) {
    console.log(err, "ERROR_MESSAGE_DELETE");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
