"use client";

// Custom hooks.
import useActiveChannel from "@/hooks/useActiveChannel";

interface ActiveStatusProps {}

const ActiveStatus: React.FC<ActiveStatusProps> = ({}) => {
  useActiveChannel();

  return null;
};

export default ActiveStatus;
