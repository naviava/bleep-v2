// External packages.
import { getServerSession } from "next-auth";

// Lib and utils.
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getSession() {
  return await getServerSession(authOptions);
}
