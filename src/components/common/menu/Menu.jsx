//부메뉴바 입니다.
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import NavigationBar from "../navigationbar/NavigationBar";
import { Col, Row } from "react-bootstrap";

const Menu = ({ menuOne, menuTwo, menuThree, menuOneLink, menuTwoLink, menuThreeLink, chooseMenu }) => {
	//메뉴 1번의 상태입니다.
	//기본적으로 선택되어 있습니다.
	const [isMenuOneClick, setMenuOneClick] = useState(true);
	//메뉴 2번의 상태입니다.
	const [isMenuTwoClick, setMenuTwoClick] = useState(false);
	//메뉴 3번의 상태입니다.
	const [isMenuThreeClick, setMenuThreeClick] = useState(false);

	return (
		<div>
			<div className="menu-col">
				<div>
					<div className="menu-tab">
						{menuOne && (
							<NavLink to={menuOneLink} className="menu-item">
								{menuOne}
							</NavLink>
						)}
						{menuTwo && (
							<NavLink to={menuTwoLink} className="menu-item">
								{menuTwo}
							</NavLink>
						)}
						{menuThree && (
							<NavLink to={menuThreeLink} className="menu-item">
								{menuThree}
							</NavLink>
						)}
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
