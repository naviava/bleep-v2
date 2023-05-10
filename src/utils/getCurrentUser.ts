// Lib and utils.
import prisma from "@/lib/prismadb";
import getSession from "./getSession";

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) return null;
    return currentUser;
  } catch (err: any) {
    return null;
  }
}
