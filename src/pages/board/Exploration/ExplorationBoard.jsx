import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
			const response = await axios.get("http://localhost:8080/api/exploration");
			setExplorations(response.data);
		} catch (error) {
			console.error("탐방기 로드 실패:", error);
		}
	};
	return (
		<div>
			{explorations.map((exploration) => (
				// Link 컴포넌트로 감싸고, to 속성에 동적 URL을 지정합니다.
				// 클릭 시 페이지 새로고침이 일어나지 않도록 a 태그 대신 Link를 사용합니다.
				<Link
					key={exploration.id}
					to={`${exploration.id}`}
					style={{ textDecoration: "none", color: "inherit" }} // Link 기본 스타일 제거
				>
					<ExplorationPost {...exploration} />
				</Link>
			))}
		</div>
	);
};

export default ExplorationBoard;
