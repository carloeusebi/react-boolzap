import React from "react";
import { Message } from "../data";
interface Params {
  messages: Message[];
}

const Chat = (params: Params) => {
  const { messages } = params;
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
    </section>
  );
};

export default Chat;
