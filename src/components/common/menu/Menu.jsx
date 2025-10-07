//부메뉴바 입니다.
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import NavigationBar from "../navigationbar/NavigationBar";
import { Col, Row } from "react-bootstrap";

const Menu = ({ menuOne, menuTwo, chooseMenu }) => {
	//메뉴 1번의 상태입니다.
	//기본적으로 선택되어 있습니다.
	const [isMenuOneClick, setMenuOneClick] = useState(true);
	//메뉴 2번의 상태입니다.
	const [isMenuTwoClick, setMenuTwoClick] = useState(false);

	return (
		<div>
			<div className="menu-col">
				<div>
					<div className="menu-tab">
						{/* <p
							className={`menu-btn ${isMenuOneClick ? "active" : ""}`}
							onClick={() => {
								setMenuOneClick(true);
								setMenuTwoClick(false);
								if (chooseMenu) chooseMenu({ isMenuOneClick: true, isMenuTwoClick: false });
							}}
						>
							{menuOne}
						</p> */}
						<NavLink to="/dorandoran/exploration" className="menu-item">
							{menuOne}
						</NavLink>
						{/* <p
							className={`menu-btn ${isMenuTwoClick ? "active" : ""}`}
							onClick={() => {
								setMenuOneClick(false);
								setMenuTwoClick(true);
								if (chooseMenu) chooseMenu({ isMenuOneClick: false, isMenuTwoClick: true });
							}}
						>
							{menuTwo}
						</p> */}
						<NavLink to="/dorandoran/talk" className="menu-item">
							{menuTwo}
						</NavLink>
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
