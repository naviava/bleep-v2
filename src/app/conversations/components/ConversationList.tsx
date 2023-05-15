"use client";

// React and Next.
import { useState } from "react";
import { useRouter } from "next/navigation";

// External packages.
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";

// Custom Hooks.
import useConversation from "@/hooks/useConversation";

// Types.
import { User } from "@prisma/client";
import { FullConversationType } from "@/types";
import ConversationBox from "./ConversationBox";

// Components.
import GroupChatModal from "./GroupChatModal";

interface ConversationListProps {
  users: User[];
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  users,
  initialItems,
}) => {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0",
          isOpen ? "hidden" : "left-0 block w-full"
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-800">Bleeps</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 shadow-sm transition duration-300 hover:bg-sky-500 hover:text-white"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.length === 0 && (
            <div className="text-center">
              <h3 className="mt-10 text-2xl text-gray-900">No Bleeps!</h3>
              <p className="mt-2 text-center text-sm font-light text-gray-500">
                Start chatting by looking for Bleeple.
              </p>
            </div>
          )}
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
