"use client";

// React and Next.
import { useSession } from "next-auth/react";
import Image from "next/image";

// External packages.
import clsx from "clsx";
import { format } from "date-fns";

// Types.
import { FullMessageType } from "@/types";

// Components.
import Avatar from "@/components/Avatar";

interface MessageBoxProps {
  isLast: boolean;
  message: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, message }) => {
  const session = useSession();

  const isOwnMessage = session?.data?.user?.email === message.sender.email;

  const seenByList = (message.seenBy || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwnMessage && "justify-end");
  const avatar = clsx(isOwnMessage && "order-2");
  const body = clsx("flex flex-col gap-2", isOwnMessage && "items-end");
  const messageContent = clsx(
    "text-sm w-fit overflow-hidden",
    isOwnMessage ? "bg-sky-500 text-white" : "bg-gray-100",
    message.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={message.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>
        <div className={messageContent}>
          {message.image ? (
            <Image
              src={message.image}
              alt="Image"
              width="288"
              height="288"
              className="translate cursor-pointer object-cover transition hover:scale-110"
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
        {isLast && isOwnMessage && seenByList.length > 0 && (
          <div className="text-xs font-light text-gray-500">{`Seen by ${seenByList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
