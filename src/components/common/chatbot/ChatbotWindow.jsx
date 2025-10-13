import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import "./ChatbotWindow.css";

export default function ChatbotWindow({ onClose }) {
  const { user } = useContext(AuthContext); // 로그인 사용자 정보
  const [messages, setMessages] = useState([]); // 대화 기록
  const [input, setInput] = useState(""); // 입력값
  const [loading, setLoading] = useState(false); // 로딩 상태
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // 버튼/키워드 → 경로 매핑
  const routeMap = {
    도란도란: "/dorandoran/explorations",
    탐방기: "/dorandoran/explorations",
    "문화재 탐방": "/dorandoran/explorations",
    담소: "/dorandoran/talks",
    "문화재 담소": "/dorandoran/talks",
    증표: "/badges",
    증표함: "/badges",
    사진함: "/photobox/list",
    "사진함 보기": "/photobox/list",
  };

  // 초기 안내 메시지
  useEffect(() => {
    const initialMessages = [
      {
        role: "bot",
        content: "안녕하세요! 🐸 꺼비 챗봇이에요. 문화재 정보, 뱃지, 사진함 등을 안내해드릴게요.",
      },
    ];
    setMessages(initialMessages);
  }, []);

  // 버튼 클릭 시 경로 이동
  const handleNavigate = (label) => {
    const path = routeMap[label];
    if (path) {
      navigate(path);
      handleClose();
    } else {
      console.warn("정의되지 않은 경로입니다:", label);
    }
  };

  // 챗봇 닫기 + 대화 초기화
  const handleClose = () => {
    setMessages([]);
    onClose();
  };

  // 메시지 전송
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setInput("");

    // 내가 입력한 메시지를 즉시 반영
    setMessages((prev) => [...prev, userMessage]);

    // 입력값 기반 경로 확인
    const matchedKey = Object.keys(routeMap).find((key) => input.includes(key));
    if (matchedKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `${matchedKey} 기능으로 이동할게요!`,
          options: [{ label: matchedKey }],
        },
      ]);
      return;
    }

    try {
      // 로딩 메시지 표시
      setLoading(true);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "꺼비가 생각 중이에요..." },
      ]);

      const postData = {
        message: input,

        // 로그인해야 이용 (활성화하려면 아래 주석 해제)
        // memberId: user?.id || null,

        // 로그인 없이도 이용 (현재 활성화)
        memberId: null,
      };

      const res = await axios.post("http://localhost:8080/api/chat", postData);

      // 로딩 메시지 제거 후 응답 표시
      setMessages((prev) =>
        prev.map((msg) =>
          msg.content.includes("꺼비가 생각 중이에요") ? { role: "bot", content: res.data.response } : msg
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.content.includes("꺼비가 생각 중이에요")
            ? { role: "bot", content: "죄송합니다. 서버와 연결할 수 없습니다." }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // 엔터키 전송
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // 새 메시지 → 스크롤 하단 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <span>꺼비</span>
        <button onClick={handleClose}>X</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "bot" ? "bot" : "user"}>
            <p>{msg.content}</p>
            {msg.options && (
              <div className="chatbot-options">
                {msg.options.map((opt, j) => (
                  <button
                    key={j}
                    className="chatbot-option-btn"
                    onClick={() => handleNavigate(opt.label)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* 로딩 상태일 때 애니메이션 표시 (선택사항) */}
        {loading && (
          <div className="bot loading">
            <p>꺼비가 생각 중이에요 💭</p>
          </div>
        )}
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
