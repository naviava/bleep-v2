// External packages.
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  label?: string;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon size={25} />
      {!!label && <div className="ml-2">{label}</div>}
    </button>
  );
};

export default AuthSocialButton;
