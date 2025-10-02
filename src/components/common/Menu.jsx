import React from "react";
import "./Menu.css";
import NavigationBar from "./NavigationBar";
import { Col, Row } from "react-bootstrap";
const Menu = () => {
  return (
    <Row>
      <Col md={6} xs={12} className="menu-col">
        <div>
          <div className="menu-tab">
            <p>문화재 탐방기</p>
            <p>문화재 담소</p>
          </div>
          <div className="lines">
            <hr className="line green"></hr>
            <hr className="line white"></hr>
            <hr className="line red"></hr>
          </div>

          <NavigationBar></NavigationBar>
        </div>
      </Col>
    </Row>
  );
};
export default Menu;
