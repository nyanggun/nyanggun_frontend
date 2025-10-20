import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const CertificationButton = ({ onClick, disabled, text }) => {
	return (
		<Button
			className="my-4 rounded-3 px-5 border-0 w-100"
			size="lg"
			style={{ background: "#3D253B" }}
			onClick={onClick}
			disabled={disabled}
		>
			<div class="d-flex justify-content-center">
				<span className="">{text}</span>
			</div>
		</Button>
	);
};

export default CertificationButton;
