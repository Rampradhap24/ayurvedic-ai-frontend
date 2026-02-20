import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import "../styles/consultation.css";

function Consultation() {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const { addToCart } = useCart();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inventory, setInventory] = useState([]);

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* ================= LOAD INVENTORY ================= */
  useEffect(() => {
    const loadInventory = async () => {
      const res = await fetch("http://localhost:5001/api/inventory");
      const data = await res.json();
      if (Array.isArray(data)) setInventory(data);
    };
    loadInventory();
  }, []);

  /* ================= LOAD CHAT HISTORY ================= */
  useEffect(() => {
    const loadHistory = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5001/api/consultation/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setMessages([
          {
            role: "assistant",
            text:
              "Hello 👋 I am your Ayurvedic AI assistant. Please describe your symptoms.",
          },
        ]);
        return;
      }

      const formatted = [];

      data.reverse().forEach((consult) => {
        formatted.push({
          role: "date",
          text: new Date(consult.createdAt).toLocaleString(),
        });

        consult.messages.forEach((msg) => {
          formatted.push({
            role: msg.role,
            text: msg.content,
          });
        });
      });

      setMessages(formatted);
    };

    loadHistory();
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= RENDER MESSAGE SMART ================= */
  const renderMessage = (text) => {
    if (!text) return null;

    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const medName = part.replace(/\*\*/g, "");

        const product = inventory.find(
          (item) =>
            item.name.toLowerCase() === medName.toLowerCase()
        );

        if (product) {
          return (
            <span key={index} className="medicine-wrapper">
              <span className="clickable-med">
                {medName}
              </span>

              <button
                className="mini-buy-btn"
                onClick={() => {
                  addToCart(product);
                }}
              >
                🛒
              </button>
            </span>
          );
        }

        return (
          <b key={index} className="med-highlight">
            {medName}
          </b>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    const userText = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5001/api/consultation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: userText }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "⚠ Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  /* ================= CLEAR CHAT ================= */
  const clearChat = async () => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Clear chat history?")) return;

    await fetch(
      "http://localhost:5001/api/consultation/clear",
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setMessages([
      {
        role: "assistant",
        text:
          "Hello 👋 I am your Ayurvedic AI assistant. Please describe your symptoms.",
      },
    ]);
  };

  return (
    <>
      <Navbar />

      <div className="consult-bg page-animate">
        <div className="consult-glass">

          <div className="consult-header">
            <h3>🌿 Ayurvedic AI Consultation</h3>
            <button
              className="clear-chat-btn"
              onClick={clearChat}
            >
              🗑 Clear Chat
            </button>
          </div>

          <div className="consult-messages">
            {messages.map((msg, index) => {
              if (msg.role === "date") {
                return (
                  <div key={index} className="chat-date">
                    {msg.text}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`consult-msg ${msg.role}`}
                >
                  {renderMessage(msg.text)}
                </div>
              );
            })}

            {loading && (
              <div className="consult-msg assistant">
                🌿 Analyzing your symptoms...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

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