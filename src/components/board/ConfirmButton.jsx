import React from "react";
import { Button } from "react-bootstrap";

const ConfirmButton = (props) => {
	const handleClick = () => {
		// 모달 창을 닫는 등의 기능
		console.log("comfirm button");
	};
	return (
		<Button className="rounded-5 border-0 px-4" size="lg" onClick={handleClick} style={{ background: "#3D253B" }}>
			{props.text}
		</Button>
	);
};

export default ConfirmButton;
