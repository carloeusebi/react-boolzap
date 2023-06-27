import React from "react";
import { Message } from "../data";

interface Props {
  id?: number | null;
  name: string;
  avatar: string;
  messages?: Message[];
  isTyping?: number;
  activeContactId?: number;
}

const Contact = (props: Props) => {
  const { name, avatar, messages } = props;
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
        {props.id && props.isTyping === props.id ? (
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
