import React from "react";
import Chat from "./Chat";
import Contact from "./Contact";
import { ContactObj } from "../data";
import data from "../data";

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
      <Chat />
      <footer className="d-flex justify-center align-center">
        <div className="emoticons activity-buttons">
          <i className="fa-regular fa-face-smile fa-xl"></i>
        </div>
        <div className="message-input h-100 flex-grow-1">
          <textarea placeholder="Type a message"></textarea>
        </div>
        <div className="send activity-buttons">
          <i className="fa-solid fa-microphone fa-xl"></i>
        </div>
      </footer>
    </section>
  );
};

export default ChatPage;
