// React and Next.
import Link from "next/link";

// External packages.
import clsx from "clsx";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "hover: group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-500 transition hover:bg-gray-100",
          isActive && "bg-gray-100 text-black",
          label === "Chat" && "hover:text-sky-500",
          label === "Users" && "hover:text-green-600",
          label === "Logout" && "hover:text-rose-600"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
