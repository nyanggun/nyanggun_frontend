//부메뉴바 입니다.
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SubMenu.css";

const SubMenu = ({
    menuOne,
    menuTwo,
    menuThree,
    menuOneLink,
    menuTwoLink,
    menuThreeLink,
    chooseMenu,
}) => {
    //메뉴 1번의 상태입니다.
    //기본적으로 선택되어 있습니다.
    const [isMenuOneClick, setMenuOneClick] = useState(true);
    //메뉴 2번의 상태입니다.
    const [isMenuTwoClick, setMenuTwoClick] = useState(false);
    //메뉴 3번의 상태입니다.
    const [isMenuThreeClick, setMenuThreeClick] = useState(false);

    return (
        <div>
            <div className="s-menu-col">
                <div>
                    <div className="s-menu-tab">
                        {menuOne && (
                            <NavLink to={menuOneLink} className="s-menu-item">
                                {menuOne}
                            </NavLink>
                        )}
                        {menuTwo && (
                            <NavLink to={menuTwoLink} className="s-menu-item">
                                {menuTwo}
                            </NavLink>
                        )}
                        {menuThree && (
                            <NavLink to={menuThreeLink} className="s-menu-item">
                                {menuThree}
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SubMenu;
