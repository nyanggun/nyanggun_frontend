import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Subtitle from "../../../components/board/Subtitle";
import Menu from "../../../components/common/menu/Menu";
import ExplorationPost from "./ExplorationPost";

const ExplorationBoard = () => {
	//axios로 비동기 통신, 글 리스트 가져오기
	// const [loading, setLoading] = useState(false);

	const [explorations, setExplorations] = useState([]);

	useEffect(() => {
		loadExplorations(); // 초기 데이터 즉 API Server에서 상품 리스트를 가져오도록 한다
	}, []);

	useEffect(() => {
		console.log(explorations);
	}, [explorations]);

	const loadExplorations = async () => {
		try {
			const response = await axios.get("http://localhost:8080/explorations");
			setExplorations(response.data);
			console.log(response.data.data);
		} catch (error) {
			console.error("탐방기 로드 실패:", error);
		}
	};
	return (
		<>
			{explorations.map((exploration) => (
				// Link 컴포넌트로 감싸고, to 속성에 동적 URL을 지정합니다.
				// 클릭 시 페이지 새로고침이 일어나지 않도록 a 태그 대신 Link를 사용합니다.
				<Row className="justify-content-center p-0 m-0">
					<Col xs={12} sm={12} md={10} lg={12} className="">
						<Link
							key={exploration.id}
							to={`${exploration.id}`}
							style={{ textDecoration: "none", color: "inherit" }} // Link 기본 스타일 제거
						>
							<div className="">
								<ExplorationPost {...exploration} />
							</div>
						</Link>
					</Col>
				</Row>
			))}
		</>
	);
};

export default ExplorationBoard;
