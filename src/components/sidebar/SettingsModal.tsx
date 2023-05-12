"use client";

// React and Next.
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// External packages.
import axios from "axios";
import { toast } from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// Types.
import { User } from "@prisma/client";

// Components.
import Modal from "../Modal";
import Button from "../Button";
import Input from "../inputs/Input";

// Lib and utils.
import { images } from "@/utils/utils";

interface SettingsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: user?.name || "", image: user?.image || "" },
  });

  const image = watch("image");

  const handleUpload = (result: any) =>
    setValue("image", result?.info?.secure_url, { shouldValidate: true });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong."))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Let others know the coolest person on Bleeper!
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                label="Name"
                id="name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    src={image || user?.image || images.defaultAvatar}
                    alt="Avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="ozzv36tt"
                  >
                    <Button type="button" disabled={isLoading} secondary>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              disabled={isLoading}
              onClick={onClose}
              secondary
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
