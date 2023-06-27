import React from "react";
import Contact from "./Contact";
import ContactList from "./ContactList";
import Notification from "./Notification";
import data from "../data";

interface Params {
  isTyping: number;
  activeContactId: number;
  setActiveContactId: (id: number) => void;
}

const ContactsPage = (params: Params) => {
  const { name: userName, avatar: userAvatar } = data.user;
  const { activeContactId, setActiveContactId, isTyping } = params;

  return (
    <section id="contacts">
      <header className="d-flex justify-between">
        <Contact name={userName} avatar={userAvatar} />
        <div className="activity-buttons">
          <i className="fa-solid fa-xl fa-circle-notch"></i>
          <i className="fa-solid fa-xl fa-message"></i>
          <i className="fa-solid fa-xl fa-ellipsis-vertical"></i>
        </div>
      </header>
      <Notification />
      <div className="search-contact">
        <input type="search" placeholder="Search or start a new chat"></input>
      </div>
      <ContactList
        activeContactId={activeContactId}
        setActiveContactId={setActiveContactId}
        isTyping={isTyping}
      />
    </section>
  );
};

export default ContactsPage;
