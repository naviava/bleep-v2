"use client";

// React and Next.
import { useEffect, useRef, useState } from "react";

// External packages.
import axios from "axios";

// Custom hooks.
import useConversation from "@/hooks/useConversation";

// Types.
import { FullMessageType } from "@/types";

// Components.
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, idx) => (
        <MessageBox
          key={message.id}
          isLast={idx === messages.length - 1}
          message={message}
        />
      ))}
      <div ref={bottomRef} className="pt-2" />
    </div>
  );
};

export default Body;
