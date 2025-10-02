import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import BookmarkButton from "./BookmarkButton";
import "./EncyclopediaEventListColumn.css";
import MemberButton from "./MemberButton";

const EncyclopediaEventListColumn = (props) => {
	return (
		<Row className="column align-items-center m-0 py-1 h-25">
			<Col className="d-flex justify-content-center align-items-center m-0 p-0 h-100 bg-dark" xs={6}>
				<Image src={props.image} fluid></Image>
			</Col>
			<Col className="bg-white h-100 d-flex flex-column p-1" xs={6}>
				<Row className="my-1">
					<Col>
						<span className="fs-5">{props.title}</span>
					</Col>
				</Row>
				{/*  */}
				<Row className="my-1">
					<Col>
						<span className="fs-6">
							{props.description.length > 20 ? props.description.slice(0, 26) + "..." : props.description}
						</span>
					</Col>
				</Row>
				{props.age != null && (
					<Row className="my-1">
						<Col>
							<span className="fs-6">{props.age}</span>
						</Col>
					</Row>
				)}
				{props.date != null && (
					<Row className="my-1">
						<Col>
							<span className="fs-6">{props.date}</span>
						</Col>
					</Row>
				)}
				<Row className="my-1">
					<Col>
						<span className="fs-6">{props.location}</span>
					</Col>
				</Row>
				{/* -- 하단 버튼 컨텐츠 -- */}
				{/* 2. 버튼들을 담을 Row에 mt-auto를 적용해 맨 아래로 밀어냅니다. */}
				<Row className="mt-auto">
					<Col className="d-flex justify-content-end align-items-center pe-1">
						{/* 두 버튼이 함께 있도록 같은 Col 안에 배치합니다. */}
						{props.bookmark != null && <BookmarkButton count={props.bookmark} />}
						{props.member != null && <MemberButton count={props.member} />}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default EncyclopediaEventListColumn;
