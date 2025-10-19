import React from "react";
import { Button } from "react-bootstrap";

const CertificationButton = (props) => {
  return (
    <Button
      className="my-4 rounded-3 px-5 border-0 w-100"
      size="lg"
      style={{ background: "#3D253B" }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className="d-flex justify-content-center">
        <span className="">{props.text}</span>
      </div>
    </Button>
  );
};

export default CertificationButton;
