import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

// Load Gemini model
let model = null;

async function loadModel() {
  if (!model) {
    try {
      model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    } catch (error) {
      console.error("Error loading Gemini model:", error);
      throw new Error("Failed to load Gemini model");
    }
  }
  return model;
}

/**
 * Get AI-generated response using Google Gemini
 * @param {string} prompt - The input question/message
 * @returns {Promise<string>} - The AI response
 */
export async function getGeminiResponse(prompt) {
  try {
    const model = await loadModel();

    // Use generateContent (correct method)
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "⚠️ Sorry, I couldn’t generate a response.";
  }
}
