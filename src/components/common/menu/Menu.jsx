//부메뉴바 입니다.
import React from "react";
import "./Menu.css";
import NavigationBar from "../navigationbar/NavigationBar";
import { Col, Row } from "react-bootstrap";
const Menu = () => {
  return (
    <div>
      <div className="menu-col">
        <div>
          <div className="menu-tab">
            <p>문화재 탐방기</p>
            <p>문화재 담소</p>
          </div>
          <div className="menu-lines">
            <hr className="line green"></hr>
            <hr className="line white"></hr>
            <hr className="line red"></hr>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
