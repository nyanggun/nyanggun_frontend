import React, { useContext } from "react";
import { Button, Image } from "react-bootstrap";

import WritingButtonImage from "../../assets/writing-button-image.svg";
import "./WritePostButton.css";
import { AuthContext } from "../../contexts/AuthContext";

const WritePostButton = ({ location }) => {
  const userData = useContext(AuthContext);
  const handleClick = () => {
    if (userData.user?.id) {
      window.location.href = location + "/new";
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <Image
      variant="primary"
      className="btn add-post border-1 rounded-circle border-light p-0"
      onClick={handleClick}
      src={WritingButtonImage}
    ></Image>
  );
};

export default WritePostButton;
