import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import ChatbotWindow from "./ChatbotWindow";
import chatbotIcon from "/src/assets/chatbot_click.svg";
import "./ChatbotButton.css";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChatbotClick = () => {
    // if (!user) {
    //   alert("로그인 후 이용 가능합니다.");
    //   return;
    // }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="chatbot-fixed-button" onClick={handleChatbotClick}>
        <img src={chatbotIcon} alt="챗봇 아이콘" className="chatbot-icon" />
      </button>
      {isOpen && <ChatbotWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;
