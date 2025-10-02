import React from "react";
import Button from "react-bootstrap/Button";

import "./write-post-button.css";
import PlusImage from "../../assets/plus.svg";

const WritePostButton = (props) => {
	const handleClick = () => {
		window.location.href = props.location;
	};

	return (
		<Button variant="primary" className="btn add-post border-0 rounded-circle" onClick={handleClick}>
			<img src={PlusImage}></img>
		</Button>
	);
};

export default WritePostButton;
