import { db } from "../services/firebase";  // Import Firestore instance
import { serverTimestamp, addDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import pdfToText from "react-pdftotext";
import { getContextAwareResponse } from "../services/contextGeminiService";

/**
 * Handles uploading and git parsing a resume PDF,
 * sending the extracted content to Gemini,
 * and updating Firestore and UI state.
 *
 * @param {File} file - The uploaded PDF file
 * @param {CollectionReference} messagesRef - Firestore reference to "messages" collection
 * @param {Function} setMessages - State setter to update messages in Chat UI
 */
export const handleResumeUpload = async (file, messagesRef, setMessages) => {
  if (!file || file.type !== "application/pdf") {
    alert("Please upload a valid PDF file.");
    return;
  }

  try {
    // Convert PDF to text
    const extractedText = await pdfToText(file);

    const userMessage = {
      text: `📄 Uploaded a resume:\n${extractedText.slice(0, 500)}...`,
      sender: "user"
    };

    // Save to Firestore (attendees collection)
    const email = "example@example.com"; // Replace with dynamic logic if needed
    const attendeeQuerySnapshot = await getDocs(
      query(collection(db, "attendees"), where("email", "==", email))
    );

    if (!attendeeQuerySnapshot.empty) {
      const docRef = attendeeQuerySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        resumeText: extractedText,
        uploadedAt: new Date()
      });
    }

    // Update UI with user's PDF upload
    setMessages(prev => [...prev, userMessage]);
    await addDoc(messagesRef, {
      ...userMessage,
      timestamp: serverTimestamp()
    });

    // Send text to Gemini
    const botResponse = await getContextAwareResponse(extractedText);

    const botMessage = {
      text: botResponse,
      sender: "bot"
    };

    // Update UI with Gemini's reply
    setMessages(prev => [...prev, botMessage]);
    await addDoc(messagesRef, {
      ...botMessage,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("❌ Error parsing resume PDF:", error);

    const errorMessage = {
      text: "⚠️ Sorry, I couldn't read the uploaded resume.",
      sender: "bot"
    };

    setMessages(prev => [...prev, errorMessage]);
    await addDoc(messagesRef, {
      ...errorMessage,
      timestamp: serverTimestamp()
    });
  }
};
