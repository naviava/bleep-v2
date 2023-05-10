// Lib and utils.
import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getConversations() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return [];

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      where: { userIds: { has: currentUser.id } },
      include: {
        users: true,
        messages: { include: { sender: true, seenBy: true } },
      },
    });

    return conversations;
  } catch (err: any) {
    return [];
  }
}
