//네비게이션 바 입니다.
import React, { useState } from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import {
  House,
  BookFill,
  HouseFill,
  InboxesFill,
  MoonStarsFill,
  YinYang,
  Book,
  Inboxes,
  MoonStars,
} from "react-bootstrap-icons";
import "./NavigationBar.css";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  //네비게이션 버튼들의 상태 입니다.
  //hover, Click 상태를 전부 각각 관리합니다.
  //추후 라우팅으로 페이지 연결 시 해당 Nav.Link 에 href ="/해당링크" 로 연결하면 됩니다.
  const [isHomeHover, setHomeHover] = useState(false);
  const [isBookHover, setBookHover] = useState(false);
  const [isBadgeHover, setBadgeHover] = useState(false);
  const [isPictureHover, setPictureHover] = useState(false);
  const [isTalkHover, setTalkHover] = useState(false);
  const [isClickHomeButton, setClickHomeButton] = useState(false);
  const [isClickBookButton, setClickBookButton] = useState(false);
  const [isClickBadgeButton, setClickBadgeButton] = useState(false);
  const [isClickPictureButton, setClickPictureButton] = useState(false);
  const [isClickTalkButton, setClickTalkButton] = useState(false);

  //현재 경로를 가져옵니다.
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <>
      <Navbar fixed="bottom">
        <Nav className="navBar">
          <div
            className={`navBtn ${isClickHomeButton ? "active" : ""}`}
            onMouseEnter={() => setHomeHover(true)}
            onMouseLeave={() => setHomeHover(false)}
            onClick={() => {
              setClickHomeButton(true);
              setClickBookButton(false);
              setClickBadgeButton(false);
              setClickPictureButton(false);
              setClickTalkButton(false);
            }}
          >
            {isHomeHover || isClickHomeButton ? (
              <HouseFill width={40} height={40}></HouseFill>
            ) : (
              <House width={40} height={40}></House>
            )}
            <div>홈</div>
          </div>
          <div
            className={`navBtn ${isClickBookButton ? "active" : ""}`}
            onMouseEnter={() => setBookHover(true)}
            onMouseLeave={() => setBookHover(false)}
            onClick={() => {
              setClickHomeButton(false);
              setClickBookButton(true);
              setClickBadgeButton(false);
              setClickPictureButton(false);
              setClickTalkButton(false);
            }}
          >
            {isBookHover || isClickBookButton ? (
              <BookFill width={40} height={40}></BookFill>
            ) : (
              <Book width={40} height={40}></Book>
            )}
            <div>문화재 도감</div>
          </div>
          <div
            className={`navBtn ${
              isClickBadgeButton || currentPath.startsWith("/badges")
                ? "active"
                : ""
            }`}
            onMouseEnter={() => setBadgeHover(true)}
            onMouseLeave={() => setBadgeHover(false)}
            onClick={() => {
              setClickHomeButton(false);
              setClickBookButton(false);
              setClickBadgeButton(true);
              setClickPictureButton(false);
              setClickTalkButton(false);
              navigate("/badges");
            }}
          >
            {isBadgeHover ||
            isClickBadgeButton ||
            currentPath.startsWith("/badges") ? (
              <YinYang width={40} height={40}></YinYang>
            ) : (
              <YinYang width={40} height={40}></YinYang>
            )}
            <div>사냥꾼 증표</div>
          </div>
          <div
            className={`navBtn ${
              isClickPictureButton || currentPath.startsWith("/photos")
                ? "active"
                : ""
            }`}
            onMouseEnter={() => setPictureHover(true)}
            onMouseLeave={() => setPictureHover(false)}
            onClick={() => {
              setClickHomeButton(false);
              setClickBookButton(false);
              setClickBadgeButton(false);
              setClickPictureButton(true);
              setClickTalkButton(false);
              navigate("/photos");
            }}
          >
            {isPictureHover ||
            isClickPictureButton ||
            currentPath.startsWith("/photos") ? (
              <InboxesFill width={40} height={40}></InboxesFill>
            ) : (
              <Inboxes width={40} height={40}></Inboxes>
            )}
            <div>사진함</div>
          </div>
          <div
            className={`navBtn ${
              isClickTalkButton || currentPath.startsWith("/dorandoran")
                ? "active"
                : ""
            }`}
            onMouseEnter={() => setTalkHover(true)}
            onMouseLeave={() => setTalkHover(false)}
            onClick={() => {
              setClickHomeButton(false);
              setClickBookButton(false);
              setClickBadgeButton(false);
              setClickPictureButton(false);
              setClickTalkButton(true);
              navigate("/dorandoran");
            }}
          >
            {isTalkHover ||
            isClickTalkButton ||
            currentPath.startsWith("/dorandoran") ? (
              <MoonStarsFill width={40} height={40}></MoonStarsFill>
            ) : (
              <MoonStars width={40} height={40}></MoonStars>
            )}
            <div>도란도란</div>
          </div>
        </Nav>
      </Navbar>
      {/* 동적으로 계산된 높이만큼 Spacer */}
      <div style={{ height: "70px" }} />
    </>
  );
};

export default NavigationBar;
