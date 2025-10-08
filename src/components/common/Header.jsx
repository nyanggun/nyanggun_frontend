import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo_color from "/src/assets/logo_color.svg"; // 로고 이미지 경로
import "./Header.css";

// React Bootstrap 컴포넌트를 사용
const Header = () => {
	return (
		// sticky="top"으로 스크롤 고정만 유지
		<Navbar sticky="top" data-bs-theme="light" className="header-custom">
			<Container className="header-content">
				{/* 로고 영역 */}
				<Navbar.Brand href="/">
					<img src={logo_color} alt="한국문화사냥꾼 로고" className="header-logo" />
				</Navbar.Brand>

				{/* 햄버거 메뉴 버튼 (Toggle) - 데스크톱에서도 상시 표시 */}
				<Navbar.Toggle aria-controls="basic-navbar-nav" className="menu-icon" />
			</Container>
		</Navbar>
	);
};

export default Header;
