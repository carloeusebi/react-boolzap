import React, { useEffect, useRef } from "react";
import { Message } from "../data";

interface Params {
  messages: Message[];
}

const Chat = (params: Params) => {
  const { messages } = params;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(messages);
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <section className="chat">
      {messages.map(({ id, message, status, date }) => {
        return (
          <div className={`bubble ${status}`} key={id}>
            <p className="message mr-20">{message}</p>
            <div className="date">{date}</div>
            <i className="fa-solid fa-angle-down"></i>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </section>
  );
};

export default Chat;
