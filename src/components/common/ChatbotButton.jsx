import React from "react";
import "./ChatbotButton.css";
import chatbotIcon from "/src/assets/chatbot_click.svg";

const ChatbotButton = () => {
  const handleChatbotClick = () => {
    alert("챗봇 열기 기능 구현 예정");
  };

  return (
    <button className="chatbot-fixed-button" onClick={handleChatbotClick}>
      <img src={chatbotIcon} alt="챗봇 아이콘" className="chatbot-icon" />
    </button>
  );
};

export default ChatbotButton;
