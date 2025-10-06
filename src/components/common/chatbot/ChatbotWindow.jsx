import React, { useState } from "react";
import axios from "axios";
import "./ChatbotWindow.css";

export default function ChatbotWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const res = await axios.post("/api/chat", { prompt: input });
      const botMessage = { role: "bot", content: res.data };
      setMessages([...messages, userMessage, botMessage]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <span>꺼비</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "bot" ? "bot" : "user"}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}
