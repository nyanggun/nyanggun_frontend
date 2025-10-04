import React from "react";
import { Button, Image } from "react-bootstrap";

import WritingButtonImage from "../../assets/writing-button-image.svg";

const WritePostButton = (props) => {
	const handleClick = () => {
		window.location.href = props.location;
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
