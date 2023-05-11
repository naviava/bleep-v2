"use client";

// External packages.
import axios from "axios";
import toast from "react-hot-toast";
import { HiPhoto } from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";

// Custom hooks.
import useConversation from "@/hooks/useConversation";

// Components.
import MessageInput from "./MessageInput";

interface FormProps {}

const Form: React.FC<FormProps> = ({}) => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { message: "" } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/messages", { ...data, conversationId })
      .then(() => setValue("message", "", { shouldValidate: true }))
      .catch(() => toast.error("Couldn't send message. Try again."));
  };

  const handleImageUpload = (image: any) => {
    axios.post("/api/messages", {
      image: image?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleImageUpload}
        uploadPreset="ozzv36tt"
      >
        <HiPhoto
          size={30}
          className="text-sky-500 transition hover:scale-110"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Start chatting..."
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-sky-500 p-2 text-white transition hover:bg-sky-600"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Form;
