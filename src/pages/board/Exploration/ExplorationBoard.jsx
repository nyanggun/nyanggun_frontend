import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Subtitle from "../../../components/board/Subtitle";
import Menu from "../../../components/common/menu/Menu";
import ExplorationPost from "./ExplorationPost";

const ExplorationBoard = () => {
	//axios로 비동기 통신, 글 리스트 가져오기
	// const [loading, setLoading] = useState(false);

	const [explorations, setExplorations] = useState([]);

	const navigate = useNavigate();

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

	const handleNavigateToDetail = (id) => {
		if (event.target.closest('button, a, [role="button"]')) {
			return;
		}
		navigate(`${id}`);
	};

	return (
		<>
			{explorations.map((exploration) => (
				// Link 컴포넌트로 감싸고, to 속성에 동적 URL을 지정합니다.
				// 클릭 시 페이지 새로고침이 일어나지 않도록 a 태그 대신 Link를 사용합니다.
				<Row className="justify-content-center p-0 m-0" key={exploration.id}>
					<Col
						xs={11}
						sm={9}
						md={8}
						lg={6}
						className="p-0 m-0"
						onClick={() => handleNavigateToDetail(exploration.id)}
						style={{ cursor: "pointer" }}
					>
						<div className="">
							<ExplorationPost {...exploration} />
						</div>
					</Col>
				</Row>
			))}
		</>
	);
};

export default ExplorationBoard;
