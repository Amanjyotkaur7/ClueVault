// backend/utils/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API with your environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (prompt) => {
  try {
   // ✅ CORRECT model name
   const model = genAI.getGenerativeModel({
  model: "models/gemini-pro",
});

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI error:", error);
    throw error;
  }
};

module.exports = { generateResponse };
