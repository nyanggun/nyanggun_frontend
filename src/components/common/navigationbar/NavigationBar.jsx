import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
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
  const [hover, setHover] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <>
      <Navbar fixed="bottom">
        <Nav className="navBar">
          {/* 홈 */}
          <div
            className={`navBtn ${currentPath === "/" ? "active" : ""}`}
            onMouseEnter={() => setHover("home")}
            onMouseLeave={() => setHover("")}
            onClick={() => navigate("/")}
          >
            {hover === "home" || currentPath === "/" ? (
              <HouseFill width={40} height={40} />
            ) : (
              <House width={40} height={40} />
            )}
            <div>홈</div>
          </div>

          {/* 문화재 도감 */}
          <div
            className={`navBtn ${
              currentPath.startsWith("/encyclopedia") ? "active" : ""
            }`}
            onMouseEnter={() => setHover("encyclopedia")}
            onMouseLeave={() => setHover("")}
            onClick={() => navigate("/encyclopedia")}
          >
            {hover === "encyclopedia" ||
            currentPath.startsWith("/encyclopedia") ? (
              <BookFill width={40} height={40} />
            ) : (
              <Book width={40} height={40} />
            )}
            <div>문화재 도감</div>
          </div>

          {/* 사냥꾼 증표 */}
          <div
            className={`navBtn ${
              currentPath.startsWith("/badges") ? "active" : ""
            }`}
            onMouseEnter={() => setHover("badge")}
            onMouseLeave={() => setHover("")}
            onClick={() => navigate("/badges")}
          >
            <YinYang width={40} height={40} />
            <div>사냥꾼 증표</div>
          </div>

          {/* 사진함 */}
          <div
            className={`navBtn ${
              currentPath.startsWith("/photobox") ? "active" : ""
            }`}
            onMouseEnter={() => setHover("picture")}
            onMouseLeave={() => setHover("")}
            onClick={() => navigate("/photobox")}
          >
            {hover === "picture" || currentPath.startsWith("/photobox") ? (
              <InboxesFill width={40} height={40} />
            ) : (
              <Inboxes width={40} height={40} />
            )}
            <div>사진함</div>
          </div>

          {/* 도란도란 */}
          <div
            className={`navBtn ${
              currentPath.startsWith("/dorandoran") ? "active" : ""
            }`}
            onMouseEnter={() => setHover("talk")}
            onMouseLeave={() => setHover("")}
            onClick={() => navigate("/dorandoran")}
          >
            {hover === "talk" || currentPath.startsWith("/dorandoran") ? (
              <MoonStarsFill width={40} height={40} />
            ) : (
              <MoonStars width={40} height={40} />
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
