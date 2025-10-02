import React from "react";
import MemberIcon from "../../assets/user-icon.svg";
import { Button } from "react-bootstrap";
import "./MemberButton.css";

const MemberButton = (props) => {
	// bookmark 관련 로직
	const handleClick = () => {};

	return (
		<Button
			variant=""
			className="member-btn border-0 btn rounded-4 d-flex justify-content-center align-itmes-center"
			size="sm"
			onClick={handleClick}
		>
			<img className="member-button-img" src={MemberIcon}></img>
			{/* props.count로 북마크 수를 가져와 출력 */}
			<span>&nbsp;{props.count}</span>
		</Button>
	);
};

export default MemberButton;
