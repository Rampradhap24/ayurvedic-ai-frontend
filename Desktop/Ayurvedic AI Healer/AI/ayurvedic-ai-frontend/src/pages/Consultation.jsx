import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/consultation.css";

function Consultation() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello 👋 I am your Ayurvedic AI assistant. Please describe your symptoms.",
    },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    const aiMessage = {
      role: "assistant",
      text: `
🩺 Analysis:
Possible digestive imbalance (Agni).

💊 Medicines:
• Triphala (night)
• Hingvastak Churna (before meals)

🥗 Diet:
• Warm water
• Avoid spicy food
• Rice, curd, banana

🧘 Exercise:
• Vajrasana
• Morning walk
• Pranayama
      `,
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <>
      <Navbar />

      <div className="consult-bg">
        <div className="consult-glass">

          {/* CHAT */}
          <div className="consult-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`consult-msg ${msg.role}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="consult-input">
            <textarea
              placeholder="Describe your symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Consultation;