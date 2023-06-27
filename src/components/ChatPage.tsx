import React, { useState } from "react";
import Chat from "./Chat";
import Contact from "./Contact";
import { ContactObj, Message } from "../data";
import data from "../data";
import { createNewMessage } from "../functions";

interface Params {
  activeContactId: number;
}

const ChatPage = (params: Params) => {
  const { activeContactId } = params;
  const activeContact: ContactObj | undefined = data.contacts.find(
    ({ id }) => id === activeContactId
  );
  const name = activeContact ? activeContact.name : "";
  const avatar = activeContact ? activeContact.avatar : "";
  const messages = activeContact ? activeContact.messages : [];

  const [updatedMessages, setUpdatedMessages] = useState(messages);

  const send = (contact: ContactObj, message: Message) => {
    contact.messages.push(message);
    setUpdatedMessages([...contact.messages]);
  };

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const message: string = e.currentTarget.value;
    e.currentTarget.value = "";
    if (activeContact) {
      const newMessage: Message = createNewMessage(
        activeContact,
        message,
        "sent"
      );

      send(activeContact, newMessage);
    }
  };

  return (
    <section id="chat">
      <header className="d-flex justify-space-between align-center">
        <div className="d-flex align-center">
          <div>{/* TODO add back button */}</div>
          <div className="contact flex-shrink-0">
            <Contact name={name} avatar={avatar} messages={messages} />
          </div>
        </div>
        <div className="activity-buttons">
          <i className="fa-solid fa-xl fa-magnifying-glass"></i>
          <i className="fa-solid fa-xl fa-paperclip"></i>
          <i className="fa-solid fa-xl fa-ellipsis-vertical"></i>
        </div>
      </header>
      <Chat messages={messages} />
      <footer className="d-flex justify-center align-center">
        <div className="emoticons activity-buttons">
          <i className="fa-regular fa-face-smile fa-xl"></i>
        </div>
        <div className="message-input h-100 flex-grow-1">
          <input
            placeholder="Type a message"
            onKeyUp={(e) => e.key === "Enter" && handleInput(e)}
          />
        </div>
        <div className="send activity-buttons">
          <i className="fa-solid fa-microphone fa-xl"></i>
        </div>
      </footer>
    </section>
  );
};

export default ChatPage;
