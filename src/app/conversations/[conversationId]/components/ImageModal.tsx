"use client";

// React and Next.
import Image from "next/image";

// Components.
import Modal from "@/components/Modal";

interface ImageModalProps {
  src?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[30rem] w-[30rem]">
        <Image alt="Image" src={src} fill className="object-cover" />
      </div>
    </Modal>
  );
};
export default ImageModal;
