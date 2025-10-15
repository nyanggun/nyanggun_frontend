import React from "react";

const HamburgerMenu = ({ onButtonClick }) => {
  return (
    <div style={{ width: "300px", height: "100%", zIndex: "100000" }}>
      메뉴입니다~.
      <button onClick={onButtonClick}>x</button>
    </div>
  );
};

export default HamburgerMenu;
