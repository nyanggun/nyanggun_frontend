import React from "react";
import { Row, Col, Form, Image } from "react-bootstrap";
import SmileFace from "../../assets/smile-face.svg";
import FindImage from "../../assets/find.svg";

const Subtitle = (props) => {
	const handleClick = () => {
		console.log("검색");
	};

	return (
		<div className="">
			<div className="justify-content-center d-flex align-items-center border">
				<div className="" xs={1}>
					<Image src={SmileFace} />
				</div>
				<div className="">
					<h2 className="">{props.text}</h2>
				</div>
			</div>
			<Row className="justify-content-center">
				<Col
					className="d-flex justify-content-center align-items-center m-0 rounded-5 border border-dark"
					xs={9}
				>
					<Form.Control className="border-0" />
					<Image as="Button" src={FindImage} onClick={handleClick} />
				</Col>
			</Row>
		</div>
	);
};

export default Subtitle;
