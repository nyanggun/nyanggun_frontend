import React from "react";
import { Button } from "react-bootstrap";

const CertificationButton = (props) => {
  const handleClick = () => {
    console.log("Certification Button");
  };
  return (
    <Button
      className="my-4 rounded-3 px-5 border-0 w-100"
      size="lg"
      style={{ background: "#3D253B" }}
      onClick={handleClick}
    >
      <span className="px-5">{props.text}</span>
    </Button>
  );
};

export default CertificationButton;
