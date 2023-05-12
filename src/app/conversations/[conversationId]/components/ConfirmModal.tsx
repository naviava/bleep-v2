"use client";

// React and Next.
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// External packages.
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";

// Custom hooks.
import useConversation from "@/hooks/useConversation";

// Components
import Modal from "@/components/Modal";
import Button from "@/components/Button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        toast.success("Bleep deleted.");
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Couldn't delete bleep."))
      .finally(() => setIsLoading(false));
  }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Bleep?
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              This action cannot be undone. Are you sure?
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button onClick={onDelete} disabled={isLoading} danger>
          Delete
        </Button>
        <Button onClick={onClose} disabled={isLoading} secondary>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
