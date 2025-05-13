import { useState } from 'react'
import ChatBot from './components/chatbot';

function App() {
  return (
    <div className="App">
      <h1>AI Event Bot</h1>
      <ChatBot /> {/* Render the ChatBot component */}
    </div>
  );
}

export default App;
