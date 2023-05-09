"use client";

// React and Next.
import { useCallback, useState } from "react";

// External packages.
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

// Components.
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

interface AuthFormProps {}

const AuthForm: React.FC<AuthFormProps> = ({}) => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleVariant = useCallback(
    () => setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN")),
    []
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Register logic.
    }

    if (variant === "LOGIN") {
      // Login logic.
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // Social login logic.
  };

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {variant === "LOGIN" ? "Sign in to your account" : "Create an account"}
      </h2>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
              />
            )}
            <Input
              id="email"
              label="Email address"
              type="email"
              register={register}
              errors={errors}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
            />
            <div>
              <Button type="submit" disabled={isLoading} fullWidth>
                {variant === "LOGIN" ? "Sign In" : "Register"}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            {/* Intersecting line and text. */}
            <div className="relative">
              {/* Line. */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              {/* Text */}
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                label="Github"
                onClick={() => socialAction("github")}
              />
              <AuthSocialButton
                icon={FcGoogle}
                label="Google"
                onClick={() => socialAction("google")}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to Bleep?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="cursor-pointer underline">
              {variant === "LOGIN" ? "Create an account" : "Sign in"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
