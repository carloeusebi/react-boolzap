import React from "react";
import { Message } from "../data";

interface Params {
  id?: number | null;
  name: string;
  avatar: string;
  messages?: Message[];
  isTyping?: number;
  activeContactId?: number;
}

const Contact = (params: Params) => {
  const { name, avatar, messages } = params;
  let lastMessage: Message | undefined;

  if (messages) {
    lastMessage = messages.length ? messages.at(-1) : undefined;
  }

  return (
    <div className="contact">
      <div className="avatar">
        <img src={`img/avatar${avatar}.jpg`} alt={name} />
      </div>
      <div className="name-wrapper">
        <p className="name">{name}</p>
        {params.id && params.isTyping === params.id ? (
          <p className="typing">Is Typing..</p>
        ) : (
          <div>
            <p className="message">{lastMessage && lastMessage.message}</p>
            <p className="last-access">{lastMessage && lastMessage.date}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
