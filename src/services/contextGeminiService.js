import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { getGeminiResponse } from "./geminiService";

//helper function to convert Firestore timestamp to a readable format
function convertFirestoreTimestampToReadable(seconds, nanoseconds) {
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1_000_000);
  const date = new Date(milliseconds);
  return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Adjust as needed
}

// Fetch data from all relevant Firestore collections
async function getEventContextData() {
  const collections = ["sessions", "agendas", "attendees", "eventMeta", "feedbacks", "locations"];
  let context = "";

  for (const col of collections) {
  const snapshot = await getDocs(collection(db, col));
  context += `\n--- ${col.toUpperCase()} ---\n`;

  snapshot.forEach(doc => {
    const data = doc.data();

    // Convert Firestore timestamps to human-readable format
    for (const key in data) {
      const value = data[key];
      if (
        value &&
        typeof value === 'object' &&
        'seconds' in value &&
        'nanoseconds' in value
      ) {
        data[key] = convertFirestoreTimestampToReadable(value.seconds, value.nanoseconds);
      }
    }

    context += JSON.stringify(data, null, 2) + "\n";
  });
}

  return context;
}

// Merge context + user input to send to Gemini
export async function getContextAwareResponse(userInput) {
  try {
    const context = await getEventContextData();
    const prompt = `
You are a friendly Event Information Assistant named "AI-Event Bot". Your primary purpose is to answer questions about the event described in the provided context. Follow these guidelines:

1. You can respond to basic greetings like "hi", "hello", or "how are you" in a warm, welcoming manner.
2. For event information, only provide details that are present in the context.
3. If information is not in the context, politely say "I'm sorry, I don't have that specific information about the event."
4. Keep responses concise but conversational.
5. Do not make assumptions beyond what's explicitly stated in the context.
6. Always prioritize factual accuracy while maintaining a helpful tone.
7. Do not introduce information that isn't in the context.
8. If unsure about any information, acknowledge uncertainty rather than guess.
9. You may suggest a few general questions users might want to ask about the event.
10. Remember to maintain a warm, friendly tone in all interactions.
11. You should refer to yourself as "Event Bot".

Remember: While you can be conversational, your primary role is providing accurate information about this specific event based on the context provided.

Here is the event context:
${context}

User Question: ${userInput}
`;

    const response = await getGeminiResponse(prompt);
    return response;
  } catch (error) {
    console.error("Error generating context-aware response:", error);
    return "⚠️ Sorry, something went wrong fetching context.";
  }
}
