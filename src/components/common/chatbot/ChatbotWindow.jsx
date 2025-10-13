import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { AuthContext } from "../../../contexts/AuthContext";
import "./ChatbotWindow.css";

export default function ChatbotWindow({ onClose }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // 버튼/키워드 → 경로 및 설명 매핑
  const routeMap = {
    도란도란: {
      path: "/dorandoran/explorations",
      desc: "문화재 탐방 기록, 담소를 볼 수 있어요.",
    },
    탐방기: {
      path: "/dorandoran/explorations",
      desc: "문화재 탐방 기록을 볼 수 있어요.",
    },
    담소: {
      path: "/dorandoran/talks",
      desc: "문화재 관련 담소를 나눌 수 있어요.",
    },
    증표: {
      path: "/badges",
      desc: "문화재 방문 시 획득 가능한 증표를 확인할 수 있어요.",
    },
    사진함: {
      path: "/photobox/list",
      desc: "사진을 업로드하고 모아볼 수 있어요.",
    },
  };

  // 초기 안내 메시지
  useEffect(() => {
    const initialMessages = [
      {
        role: "bot",
        content:
          "안녕하세요! 🐸 꺼비 챗봇이에요. 문화재 정보, 뱃지, 사진함 등을 안내해드릴게요.",
      },
    ];
    setMessages(initialMessages);
  }, []);

  // 버튼 클릭 시 경로 이동
  const handleNavigate = (label) => {
    const routeInfo = routeMap[label];
    if (routeInfo) {
      navigate(routeInfo.path); // 여기서만 path 사용
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
    setMessages((prev) => [...prev, userMessage]);

    // 입력값 기반 경로 확인
    const matchedKey = Object.keys(routeMap).find((key) => input.includes(key));
    if (matchedKey) {
      const routeInfo = routeMap[matchedKey];
      const desc = routeInfo.desc; // path는 사용하지 않음
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `${matchedKey} 기능으로 이동할게요!\n\n설명: ${desc}`,
          options: [{ label: matchedKey }],
        },
      ]);
      return;
    }

    try {
      // 로딩 메시지 추가
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "꺼비가 생각 중이에요..." },
      ]);

      const postData = {
        message: input,
        memberId: user?.id || null,
      };

      const res = await axios.post("http://localhost:8080/api/chat", postData);

      // 로딩 메시지 교체
      setMessages((prev) =>
        prev.map((msg) =>
          msg.content === "꺼비가 생각 중이에요..."
            ? { role: "bot", content: res.data.response }
            : msg
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.content === "꺼비가 생각 중이에요..."
            ? { role: "bot", content: "죄송합니다. 서버와 연결할 수 없습니다." }
            : msg
        )
      );
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
            <ReactMarkdown>{msg.content}</ReactMarkdown>

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
