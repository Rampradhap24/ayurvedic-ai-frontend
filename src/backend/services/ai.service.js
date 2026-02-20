// src/backend/services/ai.service.js

import OpenAI from "openai";

let openai = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

/* ================= MAIN FUNCTION ================= */
export const getAIResponse = async (userMessage) => {
  try {
    // 1️⃣ Try Ollama first (FREE)
    const ollamaReply = await callOllama(userMessage);

    if (ollamaReply) return ollamaReply;

    // 2️⃣ Fallback to OpenAI
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: buildPrompt(userMessage),
      });

      return completion.choices[0].message.content;
    }

    return null;

  } catch (err) {
    console.error("AI Service Error:", err.message);
    return null;
  }
};

/* ================= OLLAMA CALL ================= */
const callOllama = async (message) => {
  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: buildSystemPrompt(message),
        stream: false,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.response;

  } catch (err) {
    console.log("Ollama not available");
    return null;
  }
};

/* ================= PROMPT FORMAT ================= */
const buildPrompt = (message) => [
  {
    role: "system",
    content: systemInstruction(),
  },
  {
    role: "user",
    content: message,
  },
];

const buildSystemPrompt = (message) => {
  return `
${systemInstruction()}

User: ${message}
`;
};

/* ================= SYSTEM INSTRUCTION ================= */
const systemInstruction = () => `
You are an experienced Ayurvedic doctor.

Respond ONLY in this format:

Cause:
- Explain root cause

Ayurvedic View:
- Explain dosha imbalance

Keva Medicines:
- Suggest ONLY from this list:
Cure Cell
BP Care Capsules
Cholestrium Care Capsules
Digestive Care Capsules
Heart Care Capsules
Hridya Amrit
Daily Super Plus
Protein Plus
Multivitamin
Solar Energy Drops
D Toxi Plus
Liver Care
Milk Thistle
HB Tonic
Sugar Control

Foods:
- Recommended foods

Exercises:
- Recommended yoga or exercise

Avoid modern medicine suggestions.
Avoid diagnosis claims.
Keep it professional and clear.
`;