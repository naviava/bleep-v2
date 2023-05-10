// Components.
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

// Lib and utils.
import getCurrentUser from "@/utils/getCurrentUser";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = async ({ children }: SidebarProps) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;
