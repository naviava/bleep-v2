// Next.
import { NextResponse } from "next/server";

// Lib and utils.
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/utils/getCurrentUser";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    const { userId, isGroup, members, name } = body;

    // Check for missing fields.
    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    // Check group validity.
    if (isGroup && (!members || members.length < 2 || !name))
      return new NextResponse("Invalid data", { status: 400 });

    // Check if it is a group chat.
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((memberId: { value: string }) => ({
                id: memberId.value,
              })),
              { id: currentUser.id },
            ],
          },
        },
        include: { users: true },
      });

      newConversation.users.forEach((user) => {
        if (user.email)
          pusherServer.trigger(user.email, "conversation:new", newConversation);
      });

      return NextResponse.json(newConversation);
    }

    // Check if conversation already exists.
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { userIds: { equals: [currentUser.id, userId] } },
          { userIds: { equals: [userId, currentUser.id] } },
        ],
      },
    });

    const existingConversation = existingConversations[0];
    if (existingConversation) return NextResponse.json(existingConversation);

    // Create new conversation.
    const newConversation = await prisma.conversation.create({
      data: { users: { connect: [{ id: currentUser.id }, { id: userId }] } },
      include: { users: true },
    });

    newConversation.users.forEach((user) => {
      if (user.email)
        pusherServer.trigger(user.email, "conversation:new", newConversation);
    });

    return NextResponse.json(newConversation);
  } catch (err: any) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
