"use client";

// React and Next.
import { useState } from "react";
import { useRouter } from "next/navigation";

// Types.
import { User } from "@prisma/client";

interface UserBoxProps {
  user: User;
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return <div>UserBox</div>;
};

export default UserBox;
