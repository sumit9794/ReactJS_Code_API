// src/pages/GenAIChat.jsx
import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

export default function GenAIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Send message to backend (Express API)
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://node-api-products-erq0.onrender.com/genai/chat", // ✅ Render backend URL
        { message: input },
        { withCredentials: true } // ✅ Required for session-based auth
      );

      const aiMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const aiMessage = {
        role: "assistant",
        content: "⚠️ Error: Unable to get AI response.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.header}>🤖 AI Real Estate Assistant</h2>

        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#007bff" : "#444",
              }}
            >
              {msg.content}
            </div>
          ))}

          {loading && <div style={styles.loading}>AI is typing...</div>}
        </div>

        <div style={styles.inputSection}>
          <input
            style={styles.input}
            placeholder="Ask about properties, listings, etc..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button style={styles.button} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#2c3e50",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    background: "#fff",
    borderRadius: "10px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #ddd",
  },
  message: {
    maxWidth: "70%",
    padding: "10px 15px",
    borderRadius: "12px",
    color: "#fff",
    lineHeight: "1.4",
  },
  inputSection: {
    display: "flex",
    marginTop: "15px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    marginRight: "10px",
  },
  button: {
    background: "#007bff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
  },
  loading: {
    color: "#555",
    fontStyle: "italic",
  },
};
