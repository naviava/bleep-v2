// React and Next.
import Image from "next/image";

// Types.
import { User } from "@prisma/client";

// Lib and utils.
import { images } from "@/utils/utils";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, idx) => (
        <div
          key={user.id}
          className={`absolute inline-block h-[21px] w-[21px] overflow-hidden rounded-full 
          ${positionMap[idx as keyof typeof positionMap]}
          `}
        >
          <Image alt="Avatar" src={user.image || images.defaultAvatar} fill />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
