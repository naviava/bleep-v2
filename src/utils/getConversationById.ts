// Lib and utils.
import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getConversationById(id: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: { users: true },
    });

    return conversation;
  } catch (err: any) {
    return null;
  }
}
