"use client";

// React and Next.
import { useMemo, useState } from "react";
import Link from "next/link";

// External packages.
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

// Custom hooks.
import useChatPartner from "@/hooks/useChatPartner";

// Types.
import { Conversation, User } from "@prisma/client";

// Components.
import Avatar from "@/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & { users: User[] };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const chatPartner = useChatPartner(conversation);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return "Online";
  }, [conversation.isGroup, conversation.users.length]);

  return (
    <>
      <ProfileDrawer
        conversation={conversation}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <div className="flex w-full items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/conversations"
            className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={chatPartner} />
          <div className="flex flex-col">
            <div>{conversation.name || chatPartner.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setIsDrawerOpen(true)}
          className="cursor-pointer text-sky-500 transition hover:text-sky-600"
        />
      </div>
    </>
  );
};

export default Header;
