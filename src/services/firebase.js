// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  authDomain: "sample-firebase-ai-app-5b55a.firebaseapp.com",
  projectId: "sample-firebase-ai-app-5b55a",
  storageBucket: "sample-firebase-ai-app-5b55a.firebasestorage.app",
  messagingSenderId: "92115562691",
  appId: "1:92115562691:web:c05067a5600f868630f276"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };