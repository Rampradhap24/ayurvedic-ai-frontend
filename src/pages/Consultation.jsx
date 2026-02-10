import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/consultation.css";

function Consultation() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hello 👋 I am your Ayurvedic AI assistant. Please describe your symptoms.",
    },
  ]);

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* SEND MESSAGE */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    /* USER MESSAGE */
    const userText = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    setInput("");
    setLoading(true);

    /* 🌿 MOCK AI RESPONSE (replace later with real AI) */
    const aiText = `🩺 Analysis:
Possible digestive imbalance (Agni).

💊 Medicines:
• Triphala (night)
• Hingvastak Churna (before meals)

🥗 Diet:
• Warm water
• Rice
• Curd
• Banana

🧘 Exercise:
• Vajrasana
• Morning walk
• Pranayama`;

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: aiText },
    ]);

    setLoading(false);

    /* 📦 SAVE TO MONGODB */
    try {
      await fetch("http://localhost:5001/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          symptoms: userText,
          aiResponse: aiText,
          recommendedMedicines: [
            "Triphala",
            "Hingvastak Churna",
          ],
          recommendedFoods: [
            "Warm water",
            "Rice",
            "Curd",
            "Banana",
          ],
        }),
      });
    } catch (err) {
      console.error("❌ Failed to save consultation", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="consult-bg page-animate">
        <div className="consult-glass">

          {/* 💬 CHAT */}
          <div className="consult-messages">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`consult-msg ${msg.role}`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="consult-msg assistant">
                🌿 Analyzing your symptoms...
              </div>
            )}
          </div>

          {/* ✍️ INPUT */}
          <div className="consult-input">
            <textarea
              placeholder="Describe your symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage}>➤</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Consultation;