import React from 'react';
import ContactsPage from './components/ContactsPage';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <div className="App">
      <section id="content">
        <ContactsPage />
        <ChatPage/>
      </section>
    </div>
  );
}

export default App;
