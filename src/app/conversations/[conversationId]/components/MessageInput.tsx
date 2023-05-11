"use client";

import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  placeholder: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  register,
  errors,
  required,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete="off"
        {...register(id, { required })}
        className="w-full rounded-full bg-neutral-100 px-4 py-2 font-light text-black focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
