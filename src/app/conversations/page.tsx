"use client";

// External packages.
import clsx from "clsx";

// Custom hooks.
import useConversation from "@/hooks/useConversation";

// Components.
import EmptyState from "@/components/EmptyState";

interface ConversationsPageProps {}

const ConversationsPage: React.FC<ConversationsPageProps> = ({}) => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx("h-full lg:block lg:pl-80", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
