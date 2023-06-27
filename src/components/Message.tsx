import React from "react";
import { MessageObj } from "../data";

const Message = ({ message }: { message: MessageObj }) => {
  const { message: text, status, date } = message;
  return (
    <div className={`bubble ${status}`}>
      <p className="message mr-20">{text}</p>
      <div className="date">{date}</div>
      <i className="fa-solid fa-angle-down"></i>
    </div>
  );
};

export default Message;
