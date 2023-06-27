import React, { createContext } from "react";
import Contact from "./Contact";
import data from "../data";

interface Params {
  isTyping: number;
  activeContactId: number;
  setActiveContactId: (id: number) => void;
}

const ContactList = (params: Params) => {
  const { contacts } = data;
  const { activeContactId, setActiveContactId, isTyping } = params;

  return (
    <ul id="contact-list">
      {contacts.map((contact) => {
        return (
          <li
            key={contact.id}
            onClick={() => {
              setActiveContactId(contact.id);
            }}
          >
            <Contact
              id={contact.id}
              name={contact.name}
              avatar={contact.avatar}
              messages={contact.messages}
              isTyping={isTyping}
              activeContactId={activeContactId}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
