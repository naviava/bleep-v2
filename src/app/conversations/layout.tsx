// Components.
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

// Lib and utils.
import getConversations from "@/utils/getConversations";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const conversations = await getConversations();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
