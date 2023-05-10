"use client";

// React and Next.
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

// External packages.
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

// Custom Hooks.
import useChatPartner from "@/hooks/useChatPartner";

// Types.
import { Conversation, Message, User } from "@prisma/client";
import { FullConversationType } from "@/types";
import Avatar from "@/components/Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const router = useRouter();
  const session = useSession();
  const chatPartner = useChatPartner(data);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [router, data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session?.data?.user?.email,
    [session?.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) return false;

    const seenByArray = lastMessage.seenBy || [];

    return seenByArray.filter((user) => user.email === userEmail).length > 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage.body;

    return "Started a conversation.";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={chatPartner} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-medium text-gray-900">
              {data.name || chatPartner.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-gray-400">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              "truncate text-sm",
              hasSeen ? "text-gray-500" : "font-medium text-black"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
