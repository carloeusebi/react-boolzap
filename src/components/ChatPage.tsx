import React, { useState } from "react";
import Chat from "./Chat";
import Contact from "./Contact";
import { ContactObj, Message } from "../data";
import data from "../data";
import { createNewMessage, getResponse } from "../functions";

interface Props {
  activeContactId: number;
  isTyping: number;
  setIsTyping: (id: number) => void;
}

const ChatPage = (props: Props) => {
  const { activeContactId, isTyping, setIsTyping } = props;
  const activeContact: ContactObj | undefined = data.contacts.find(
    ({ id }) => id === activeContactId
  );

  const id = activeContact ? activeContact.id : -1;
  const name = activeContact ? activeContact.name : "";
  const avatar = activeContact ? activeContact.avatar : "";
  const messages = activeContact ? activeContact.messages : [];

  const [updatedMessages, setUpdatedMessages] = useState(messages);

  /**
   * Logs the message and scrolls the page
   * @param contact the contact we are chatting with
   * @param message the obj with the message to send
   */
  const send = (contact: ContactObj, message: Message): void => {
    contact.messages = [...contact.messages, message];
    setUpdatedMessages([...contact.messages]);
  };

  const sendResponse = async (): Promise<void> => {
    if (activeContact) {
      setIsTyping(activeContactId);
      const message: string = await getResponse(data.user.name, activeContact);

      const responseMessage: Message = createNewMessage(
        activeContact,
        message,
        "received"
      );

      send(activeContact, responseMessage);
      setIsTyping(-1);
    }
  };

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const message: string = e.currentTarget.value.trim();

    if (!message) return;

    e.currentTarget.value = "";
    if (activeContact) {
      const newMessage: Message = createNewMessage(
        activeContact,
        message,
        "sent"
      );

      send(activeContact, newMessage);

      sendResponse();
    }
  };

  return (
    <section id="chat">
      <header className="d-flex justify-space-between align-center">
        <div className="d-flex align-center">
          <div>{/* TODO add back button */}</div>
          <div className="contact flex-shrink-0">
            <Contact
              id={id}
              name={name}
              avatar={avatar}
              messages={messages}
              isTyping={isTyping}
            />
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
            onKeyUp={e => e.key === "Enter" && handleInput(e)}
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
