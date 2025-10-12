import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatbotWindow.css";

export default function ChatbotWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // 스크롤 자동 하단

  // 1. 컴포넌트 마운트 시 초기 안내 메시지 추가
  useEffect(() => {
    const initialMessage = {
      role: "bot",
      content: "안녕하세요! 무엇을 도와드릴까요? 문화재 정보, 방문 뱃지, 이벤트 등 관련 질문을 해보세요."
    };
    setMessages([initialMessage]);
  }, []);

  // 2. 메시지 전송
  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setInput(""); // 입력창 초기화

    try {
      const res = await axios.post("http://localhost:8080/api/chat", { message: input });
      const botMessage = { role: "bot", content: res.data.response };

      // 🔹 여기서 AI 응답만 최신화
      setMessages([userMessage,botMessage]);

    } catch (err) {
      console.error(err);
      const errorMessage = { role: "bot", content: "죄송합니다. 서버와 연결할 수 없습니다." };
      setMessages([errorMessage]);
    }
  };

  // 3. 엔터키 전송 기능
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // 4. 새 메시지 시 스크롤 하단 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}
