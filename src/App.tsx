import React, { useState } from "react";
import ContactsPage from "./components/ContactsPage";
import ChatPage from "./components/ChatPage";
import { act } from "react-dom/test-utils";

function App() {
  const [activeContactId, setActiveContactId] = useState(-1);
  const [isTyping, setIsTyping] = useState(-1);

  return (
    <div className="App">
      <section id="content">
        <ContactsPage
          activeContactId={activeContactId}
          setActiveContactId={setActiveContactId}
          isTyping={isTyping}
        />
        {activeContactId !== -1 ? (
          <ChatPage
            activeContactId={activeContactId}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
        ) : (
          <div id="wallpaper"></div>
        )}
      </section>
    </div>
  );
}

export default App;
