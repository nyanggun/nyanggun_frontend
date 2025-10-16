import React from "react";
import { Button, Image } from "react-bootstrap";

import ReportImage from "../../../assets/report-icon.svg";

const ReportButton = () => {
	const handleClick = () => {};
	return (
		<Button
			variant=""
			className="bookmark-btn border-0 m-0 p-0 btn rounded-4 d-flex justify-content-center align-itmes-center z-3"
			size="sm"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation;
				handleClick();
			}}
		>
			<Image className="report-btn-img" src={ReportImage} />
		</Button>
	);
};

export default ReportButton;
