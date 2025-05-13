import React, { useState } from "react";
import { db } from "../services/firebase"; // adjust path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FeedbackForm = ({ sessionId = "default_session" }) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    "💬 How was the session overall?",
    "💬 What did you like the most?",
    "💬 Any suggestions for improvement?",
    "💬 Would you attend a similar session again?"
  ];

  const handleNext = async () => {
    if (!input.trim()) return;

    const updatedResponses = {
      ...responses,
      [`q${step + 1}`]: input
    };

    setResponses(updatedResponses);
    setInput("");

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      try {
        await addDoc(collection(db, "feedback"), {
          sessionId,
          responses: updatedResponses,
          timestamp: serverTimestamp()
        });
        setSubmitted(true);
      } catch (err) {
        console.error("Error submitting feedback:", err);
      }
    }
  };

  if (submitted) {
    return <div style={styles.thankYou}>✅ Thanks for your feedback!</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.message}>{questions[step]}</div>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
          style={styles.input}
        />
        <button onClick={handleNext} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;

// 💅 Styles
const styles = {
  container: {
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginTop: "1rem"
  },
  message: {
    fontWeight: "bold",
    marginBottom: "0.5rem"
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem"
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  thankYou: {
    color: "#28a745",
    fontWeight: "bold",
    padding: "1rem"
  }
};
