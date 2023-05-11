// Lib and utils.
import prisma from "@/lib/prismadb";

export default async function getMessages(conversationId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: { sender: true, seenBy: true },
      orderBy: { createdAt: "asc" },
    });

    return messages;
  } catch (err: any) {
    return [];
  }
}
