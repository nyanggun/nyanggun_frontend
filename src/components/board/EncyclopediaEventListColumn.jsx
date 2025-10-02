import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import BookmarkButton from "./BookmarkButton";
import "./EncyclopediaEventListColumn.css";

const EncyclopediaEventListColumn = (props) => {
	return (
		<Row className="align-items-center">
			<Col className="img-div d-flex justify-content-center align-items-center m-0 p-0" xs={6}>
				<Image src={props.image} fluid></Image>
			</Col>
			<Col className="" xs={6}>
				<Row>
					<Col>
						<span className="fs-3">{props.title}</span>
					</Col>
				</Row>
				<Row>
					<span className="fs-5">{props.subtitle}</span>
				</Row>
				<Row>
					<span className="fs-6">{props.age}</span>
				</Row>
				<Row>
					<span className="fs-6">{props.location}</span>
				</Row>
				<Row>
					<Col className="d-flex justify-content-end">
						{props.bookmark != null && <BookmarkButton count={props.bookmark} />}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default EncyclopediaEventListColumn;
