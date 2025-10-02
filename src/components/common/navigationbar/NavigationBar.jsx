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
  return (
    <Navbar fixed="bottom">
      <Nav className="navBar">
        <Nav.Link
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
        </Nav.Link>
        <Nav.Link
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
        </Nav.Link>
        <Nav.Link
          className={`navBtn ${isClickBadgeButton ? "active" : ""}`}
          onMouseEnter={() => setBadgeHover(true)}
          onMouseLeave={() => setBadgeHover(false)}
          onClick={() => {
            setClickHomeButton(false);
            setClickBookButton(false);
            setClickBadgeButton(true);
            setClickPictureButton(false);
            setClickTalkButton(false);
          }}
        >
          <YinYang width={40} height={40}></YinYang>
          <div>사냥꾼 증표</div>
        </Nav.Link>
        <Nav.Link
          className={`navBtn ${isClickPictureButton ? "active" : ""}`}
          onMouseEnter={() => setPictureHover(true)}
          onMouseLeave={() => setPictureHover(false)}
          onClick={() => {
            setClickHomeButton(false);
            setClickBookButton(false);
            setClickBadgeButton(false);
            setClickPictureButton(true);
            setClickTalkButton(false);
          }}
        >
          {isPictureHover || isClickPictureButton ? (
            <InboxesFill width={40} height={40}></InboxesFill>
          ) : (
            <Inboxes width={40} height={40}></Inboxes>
          )}
          <div>사진함</div>
        </Nav.Link>
        <Nav.Link
          className={`navBtn ${isClickTalkButton ? "active" : ""}`}
          onMouseEnter={() => setTalkHover(true)}
          onMouseLeave={() => setTalkHover(false)}
          onClick={() => {
            setClickHomeButton(false);
            setClickBookButton(false);
            setClickBadgeButton(false);
            setClickPictureButton(false);
            setClickTalkButton(true);
          }}
        >
          {isTalkHover || isClickTalkButton ? (
            <MoonStarsFill width={40} height={40}></MoonStarsFill>
          ) : (
            <MoonStars width={40} height={40}></MoonStars>
          )}
          <div>도란도란</div>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
