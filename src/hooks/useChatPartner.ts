// React and Next.
import { useMemo } from "react";

// External packages.
import { useSession } from "next-auth/react";

// Types.
import { User } from "@prisma/client";
import { FullConversationType } from "@/types";

const useChatPartner = (
  conversation: FullConversationType | { users: User[] }
) => {
  const session = useSession();

  const chatPartner = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const chatPartner = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return chatPartner[0];
  }, [session?.data?.user?.email, conversation.users]);

  return chatPartner;
};

export default useChatPartner;
