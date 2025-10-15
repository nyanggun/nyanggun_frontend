import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo_color from "/src/assets/logo_color.svg"; // 로고 이미지 경로
import "./Header.css";
import { useState } from "react";
import HamburgerMenu from "../../pages/hamburger/HamburgerMenu";
import { motion } from "framer-motion";

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
            <Navbar
                sticky="top"
                data-bs-theme="light"
                className="header-custom"
            >
                <Container className="header-content">
                    {/* 로고 영역 */}
                    <Navbar.Brand href="/">
                        <img
                            src={logo_color}
                            alt="한국문화사냥꾼 로고"
                            className="header-logo"
                        />
                    </Navbar.Brand>

                    {/* 햄버거 메뉴 버튼 (Toggle) - 데스크톱에서도 상시 표시 */}
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="menu-icon"
                        onClick={() => setIsSidebarOpen(true)}
                    />
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
