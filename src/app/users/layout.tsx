// Components.
import Sidebar from "@/components/sidebar/Sidebar";

// Lib and utils.
import getUsers from "@/utils/getUsers";
import UserList from "./components/UserList";

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout = async ({ children }: UsersLayoutProps) => {
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
