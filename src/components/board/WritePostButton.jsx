import React from "react";
import { Button, Image } from "react-bootstrap";

import WritingButtonImage from "../../assets/writing-button-image.svg";
import "./WritePostButton.css";

const WritePostButton = ({ location }) => {
	const handleClick = () => {
		window.location.href = location + "/new";
	};

	return (
		<Image
			variant="primary"
			className="btn add-post border-1 rounded-circle border-light p-0"
			onClick={handleClick}
			src={WritingButtonImage}
		></Image>
	);
};

export default WritePostButton;
