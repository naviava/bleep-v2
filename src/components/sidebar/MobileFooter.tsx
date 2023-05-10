"use client";

// Custom hooks.
import useRoutes from "@/hooks/useRoutes";
import useConversation from "@/hooks/useConversation";

// Components.
import MobileItem from "./MobileItem";

interface MobileFooterProps {}

const MobileFooter: React.FC<MobileFooterProps> = ({}) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  // If the conversation is open, don't render the mobile footer.
  if (isOpen) return null;

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] bg-white lg:hidden">
      {routes.map((item) => (
        <MobileItem
          key={item.href}
          label={item.label}
          href={item.href}
          icon={item.icon}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
