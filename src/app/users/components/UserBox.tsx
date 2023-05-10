"use client";

// React and Next.
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// External packages.
import axios from "axios";

// Types.
import { User } from "@prisma/client";
import Avatar from "@/components/Avatar";

interface UserBoxProps {
  user: User;
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: user.id })
      .then(({ data }) => router.push(`/conversations/${data.id}`))
      .finally(() => setIsLoading(false));
  }, [user.id, router]);

  return (
    <div
      onClick={handleClick}
      className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 transition hover:bg-neutral-100"
    >
      <Avatar user={user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
