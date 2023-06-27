import React, { useEffect, useRef } from "react";
import { MessageObj } from "../data";
import Message from "./Message";

const Chat = ({ messages }: { messages: MessageObj[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <section className="chat">
      {messages.map(m => {
        return <Message message={m} key={m.id} />;
      })}
      <div ref={messagesEndRef} />
    </section>
  );
};

export default Chat;
