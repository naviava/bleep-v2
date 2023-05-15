// Components.
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

// Lib and utils.
import getUsers from "@/utils/getUsers";
import getConversations from "@/utils/getConversations";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
