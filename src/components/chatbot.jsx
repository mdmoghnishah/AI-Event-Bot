// File: src/components/ChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../services/firebase";
import { handleResumeUpload } from "../utils/resumeParser"; // adjust path if needed

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
//import { getGeminiResponse } from "../services/geminiService";
import { getContextAwareResponse } from "../services/contextGeminiService";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);
  

  const messagesRef = collection(db, "messages");
  
 
  // Fetch messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      const snapshot = await getDocs(q);
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    };
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);

    await addDoc(messagesRef, {
      ...userMessage,
      timestamp: serverTimestamp()
    });

    try {
      //const botResponse = await getGeminiResponse(input);
      const botResponse = await getContextAwareResponse(input);


      const botMessage = {
        text: botResponse,
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);

      await addDoc(messagesRef, {
        ...botMessage,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error during AI response:", error);
    }

    setInput("");
  };

  const handlePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    handleResumeUpload(file, messagesRef, setMessages);
  }
  event.target.value = null; // Clear input
};



  return (
    <div className="chatbot-container" style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da"
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
        {/* Plus button */}
        <button
          onClick={handlePlusClick}
          style={styles.plusButton}
          type="button"
          aria-label="Upload document"
          title="Upload document"
          >+</button>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={styles.input}
          placeholder="Ask me something..."
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff"
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  message: {
    padding: "0.75rem",
    borderRadius: "12px",
    maxWidth: "70%"
  },
  inputContainer: {
    display: "flex",
    gap: "0.5rem",
    paddingTop: "0.5rem"
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  plusButton: {
    padding: "0 12px",
    fontSize: "1.5rem",
    borderRadius: "4px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    cursor: "pointer",
    lineHeight: 1,
    userSelect: "none"
  }
};

export default ChatBot;
