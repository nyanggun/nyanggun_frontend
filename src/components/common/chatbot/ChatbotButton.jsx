import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import ChatbotWindow from "./ChatbotWindow";
import chatbotIcon from "../../../assets/images/toad.png";
import "./ChatbotButton.css";

const ChatbotButton = () => {
  const { user, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // 챗봇 버튼 클릭
  const handleChatbotClick = () => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    setIsOpen((prev) => !prev);
  };

  // 로딩 중이면 버튼 숨기기
  if (loading) return null;

  return (
    <>
      {/* 챗봇 버튼 */}
      <button
        className="chatbot-fixed-button"
        onClick={handleChatbotClick}
        title={user ? "챗봇 열기" : "로그인 필요"}
      >
        <img src={chatbotIcon} alt="챗봇 아이콘" className="chatbot-icon" />
      </button>

      {/* 챗봇 창 */}
      {isOpen && <ChatbotWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;
