import React, { useContext } from "react";
import "./HamburgerMenu.css";
import { motion } from "framer-motion";
import { X } from "react-bootstrap-icons";
import logo from "../../assets/logo_color.svg";
import { Row, Col, Image } from "react-bootstrap";
import Menu from "../../components/common/menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import BorderButton from "../../components/board/BorderButton";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = ({ onButtonClick }) => {
  const userData = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
  };
  return (
    <motion.div
      className="hamburger-container"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="hamburger-header">
        {/* <img src={logo}></img> */}
        <X width={50} height={50} onClick={onButtonClick}></X>
      </div>
      <Row className="p-0 m-0">
        <Col className="p-0 m-0">
          <div className="hamburger-profile-box">
            {userData?.user ? (
              <div className="hamburger-user-container">
                <div
                  className="hamburger-user"
                  onClick={() => {
                    onButtonClick();
                    navigate("/mypage");
                  }}
                >
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                    roundedCircle
                    fluid
                    className="hamburger-talk-profile-pic border border-1"
                  />
                  <div className="hamburger-user-box">
                    <div className="hamburger-user-login">
                      <div className="hamburger-login-text">
                        {userData.user.nickname}
                      </div>
                      <div className="hamburger-login-text">
                        {userData.user.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <BorderButton
                    btnName={"로그아웃"}
                    buttonColor={"black"}
                    clickBtn={() => {
                      onButtonClick();
                      handleLogout();
                      navigate("/login");
                    }}
                  ></BorderButton>
                </div>
              </div>
            ) : (
              <div className="hamburger-profile-button">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                  roundedCircle
                  fluid
                  className="hamburger-talk-profile-pic border border-1"
                />
                <div>
                  <div className="hamburger-login">
                    <BorderButton
                      btnName={"로그인"}
                      clickBtn={() => {
                        onButtonClick();
                        navigate("/login");
                      }}
                    ></BorderButton>
                    <div className="me-2"></div>
                    <BorderButton
                      btnName={"회원가입"}
                      clickBtn={() => {
                        onButtonClick();
                        navigate("/register");
                      }}
                    ></BorderButton>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hamburger-menu-lines">
            <hr className="hamburger-line green"></hr>
            <hr className="hamburger-line white"></hr>
            <hr className="hamburger-line red"></hr>
          </div>

          <div className="hamburger-menu">
            <div
              className="hamburger-menu-text"
              onClick={() => {
                onButtonClick();
                navigate("/");
              }}
            >
              홈
            </div>

            <div
              className="hamburger-menu-text"
              onClick={() => {
                onButtonClick();
                navigate("/heritages");
              }}
            >
              문화재 도감
            </div>

            <div
              className="hamburger-menu-text"
              onClick={() => {
                onButtonClick();
                navigate("/dorandoran");
              }}
            >
              도란도란
            </div>

            <div
              className="hamburger-menu-text"
              onClick={() => {
                onButtonClick();
                navigate("/photobox");
              }}    
            >
              사진함
            </div>

            <div className="hamburger-menu-text"   onClick={() => {
                onButtonClick();
                navigate("/badges/badgebox");
              }}>문화재 증표함</div>

            <div className="hamburger-menu-text">사냥꾼 이벤트</div>

            <div className="hamburger-menu-text">사냥꾼 상점</div>

            <div className="hamburger-menu-lines">
              <hr className="hamburger-line semi-white"></hr>
            </div>
            {userData.user?.role == "ROLE_ADMIN" ? (
              <div
                className="hamburger-menu-text"
                onClick={() => {
                  onButtonClick();
                  navigate("/admin");
                }}
              >
                관리자 기능
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default HamburgerMenu;
