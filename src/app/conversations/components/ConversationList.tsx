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
import { FullConversationType } from "@/types";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const routr = useRouter();
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0",
        isOpen ? "hidden" : "left-0 block w-full"
      )}
    >
      <div className="px-5">
        <div className="mb-4 flex justify-between pt-4">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <div className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 shadow-sm transition duration-300 hover:bg-sky-500 hover:text-white">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
