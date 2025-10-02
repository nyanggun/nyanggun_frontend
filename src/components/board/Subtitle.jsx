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
			<Row className="justify-content-center">
				<Col className="d-flex justify-content-center p-0" xs={1}>
					<Image src={SmileFace} />
				</Col>
				<Col className="d-flex justify-content-center align-items-center p-0 m-0" xs={3}>
					<h2 className="">{props.text}</h2>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col className="d-flex justify-content-center align-items-center m-0" xs={9}>
					<Form.Control className="rounded-5 border-dark" />
				</Col>
				<Col className="d-flex justify-content-center align-items-center m-0" xs={1}>
					<Image as="Button" src={FindImage} onClick={handleClick} />
				</Col>
			</Row>
		</div>
	);
};

export default Subtitle;
