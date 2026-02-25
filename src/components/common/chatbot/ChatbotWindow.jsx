import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { AuthContext } from "../../../contexts/AuthContext";
import rehypeRaw from "rehype-raw";
import "./ChatbotWindow.css";

const markdownComponents = {
  a: ({ href, ...props }) => {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        {...props}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        style={{ color: "#007bff", textDecoration: "underline" }}
      />
    );
  },
  table: ({ children }) => (
    <div
      style={{
        overflowX: "auto",
        maxWidth: "100%",
        marginBottom: "10px",
      }}
    >
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </table>
    </div>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: "20px", margin: "5px 0" }}>{children}</ol>
  ),
};

export default function ChatbotWindow({ onClose }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { role: "bot", content: "안녕하세요! 🐸 꺼비 챗봇이에요." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const API_BASE_URL = "https://khgeung.store/api/chat";

  const routeMap = {
    도감: {
      path: "/heritages/name",
      desc: "문화재 정보를 볼 수 있어요.",
    },
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

  const sendMessage = async (message = input) => {
    const trimmed = message.trim();
    if (!trimmed) return;
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);

    const matchedKey = Object.keys(routeMap).find((key) =>
      trimmed.includes(key),
    );
    if (matchedKey) {
      const routeInfo = routeMap[matchedKey];
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `${matchedKey} 기능으로 이동할까요?\n설명: ${routeInfo.desc}`,
          options: [{ label: matchedKey }],
        },
      ]);
      return;
    }

    const loadingMsg = "꺼비가 생각 중이에요... ⏳";
    setMessages((prev) => [...prev, { role: "bot", content: loadingMsg }]);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/messages`,
        { message: trimmed },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const botMsg = res.data;
      let displayContent = botMsg.response || "";

      if (botMsg.heritageId) {
        displayContent += `\n\n[자세한 정보 보기](/heritages/detail/${botMsg.heritageId})`;
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.content === loadingMsg
            ? {
                role: "bot",
                content: displayContent,
                options: botMsg.options || [],
              }
            : msg,
        ),
      );
    } catch (err) {
      console.error("Chat API Error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.content === loadingMsg
            ? {
                role: "bot",
                content:
                  err.response?.status === 401
                    ? "로그인이 필요하거나 세션이 만료되었습니다."
                    : "서버 연결 오류가 발생했습니다.",
              }
            : msg,
        ),
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };
  const handleNavigate = (label) => {
    const routeInfo = routeMap[label];
    if (routeInfo) {
      navigate(routeInfo.path);
      onClose();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <span>🐸 꺼비 챗봇</span>
        <button onClick={onClose}>×</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message-bubble ${msg.role === "bot" ? "bot" : "user"}`}
          >
            <ReactMarkdown
              components={markdownComponents}
              rehypePlugins={[rehypeRaw]}
            >
              {msg.content}
            </ReactMarkdown>
            {msg.options?.length > 0 && (
              <div className="chatbot-options">
                {msg.options.map((opt, j) => (
                  <button
                    key={j}
                    className="chatbot-option-btn"
                    onClick={() => {
                      routeMap[opt.label]
                        ? handleNavigate(opt.label)
                        : sendMessage(opt.label);
                    }}
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
          placeholder={user ? "메시지를 입력하세요." : "로그인 후 이용하세요."}
          disabled={!user}
        />
        <button onClick={() => sendMessage(input)} disabled={!user}>
          전송
        </button>
      </div>
    </div>
  );
}
