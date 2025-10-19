import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo_color from "/src/assets/logo_color.svg"; // 로고 이미지 경로
import "./Header.css";
import { useState } from "react";
import HamburgerMenu from "../../pages/hamburger/HamburgerMenu";
import { motion } from "framer-motion";
import { List } from "react-bootstrap-icons";

// React Bootstrap 컴포넌트를 사용
const Header = ({ onClickMenu }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {isSidebarOpen ? (
        <HamburgerMenu
          animate={{ x: isSidebarOpen ? 0 : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          onButtonClick={() => setIsSidebarOpen(false)}
        ></HamburgerMenu>
      ) : (
        <div></div>
      )}
      <div sticky="top" data-bs-theme="light" className="header-custom">
        {/* 로고 영역 */}
        <Navbar.Brand href="/">
          <img
            src={logo_color}
            alt="한국문화사냥꾼 로고"
            className="header-logo"
          />
        </Navbar.Brand>
        <div className="header-hamburger">
          <List
            width={30}
            height={30}
            onClick={() => setIsSidebarOpen(true)}
          ></List>
        </div>
      </div>
    </div>
  );
};

export default Header;
