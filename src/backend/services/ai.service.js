
export const getAIResponse = async (prompt) => {
  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",  // make sure you pulled this model
        prompt: `
You are an experienced Ayurvedic doctor.

Respond clearly with:
1. Cause
2. Ayurvedic View
3. Medicines
4. Foods
5. Exercises

Patient says:
${prompt}
        `,
        stream: false
      })
    });

    const data = await response.json();

    if (!data.response) {
      return "⚠ AI did not generate a response.";
    }

    return data.response;

  } catch (error) {
    console.error("AI SERVICE ERROR:", error.message);
    return "⚠ AI service temporarily unavailable.";
  }
};