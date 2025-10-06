import React, { useState } from "react";
import "./ChatbotButton.css";
import ChatbotWindow from "./ChatbotWindow";
import chatbotIcon from "/src/assets/chatbot_click.svg";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChatbotClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="chatbot-fixed-button" onClick={handleChatbotClick}>
        <img src={chatbotIcon} alt="챗봇 아이콘" className="chatbot-icon" />
      </button>
      {/* isOpen이 true일 때만 ChatbotWindow 렌더링 */}
      {isOpen && <ChatbotWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;
