// React and Next.
import Link from "next/link";

// External packages.
import clsx from "clsx";

interface MobileItemProps {
  label: string;
  href: string;
  icon: any;
  isActive?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  icon: Icon,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "group flex w-full justify-center gap-x-3 p-4 text-sm font-semibold leading-6 text-gray-500 transition hover:bg-gray-100 hover:text-black",
        isActive && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="sr-only">{label}</span>
    </Link>
  );
};

export default MobileItem;
