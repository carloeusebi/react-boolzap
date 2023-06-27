import React, { createContext } from "react";
import Contact from "./Contact";
import data from "../data";

interface Props {
  isTyping: number;
  searchWord: string;
  activeContactId: number;
  setActiveContactId: (id: number) => void;
}

const ContactList = (props: Props) => {
  const { contacts } = data;
  const { activeContactId, setActiveContactId, isTyping } = props;

  return (
    <ul id="contact-list">
      {contacts.map(contact => {
        if (contact.name.toLowerCase().includes(props.searchWord)) {
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
        }
      })}
    </ul>
  );
};

export default ContactList;
