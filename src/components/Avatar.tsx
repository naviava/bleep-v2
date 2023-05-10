// React and Next.
import Image from "next/image";

// Types.
import { User } from "@prisma/client";

// Lib and utils.
import { images } from "@/utils/utils";

interface AvatarProps {
  user?: User | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11">
        <Image alt="Avatar" src={user?.image || images.defaultAvatar} fill />
      </div>
      <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3" />
    </div>
  );
};

export default Avatar;
