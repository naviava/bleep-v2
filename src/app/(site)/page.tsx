// React and Next.
import Image from "next/image";

// Components.
import AuthForm from "./components/AuthForm";

// Libs and utils.
import { images } from "@/utils/utils";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center bg-gray-200 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
          src={images.logoImage}
        />
      </div>
      {/* Authentication Form */}
      <AuthForm />
    </div>
  );
}
