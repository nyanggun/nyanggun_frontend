import { Button } from "react-bootstrap";
import React from "react";

const CompleteButton = ({ btnName, clickBtn, type = "button" }) => {
  return (
    <Button className="complete-btn" onClick={clickBtn} type={type}>
      {btnName}
    </Button>
  );
};

export default CompleteButton;
