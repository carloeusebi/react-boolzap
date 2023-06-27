import React, { createContext } from "react";
import Contact from "./Contact";
import data from "../data";

interface Params {
  setActiveContactId: (id: number) => void;
}

const ContactList = (params: Params) => {
  const { contacts } = data;
  const { setActiveContactId } = params;

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
              name={contact.name}
              avatar={contact.avatar}
              messages={contact.messages}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
