import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import api from "../../../config/apiConfig";

import ExplorationPost from "./ExplorationPost";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const ExplorationBoard = () => {
	const navigate = useNavigate();

	// 1. 무한 스크롤을 위한 state 추가
	const [explorations, setExplorations] = useState([]);
	const [page, setPage] = useState(0); // 현재 페이지 번호
	const [loading, setLoading] = useState(false); // 로딩 중인지 여부
	const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부

	// 2. Intersection Observer를 위한 ref 생성
	const observer = useRef();
	const lastExplorationElementRef = useCallback(
		(node) => {
			if (loading) return; // 로딩 중일 때는 아무것도 하지 않음
			if (observer.current) observer.current.disconnect(); // 이전 observer 연결 해제
			observer.current = new IntersectionObserver((entries) => {
				// node가 화면에 보이고, 더 불러올 데이터가 있을 때
				if (entries[0].isIntersecting && hasMore) {
					// 다음 페이지를 불러오기 위해 page state를 업데이트
					setPage((prevPage) => prevPage + 1);
				}
			});
			if (node) observer.current.observe(node); // 새로운 node(마지막 요소)를 관찰
		},
		[loading, hasMore]
	);

	// 3. 페이지 번호가 바뀔 때마다 데이터를 불러오는 useEffect
	useEffect(() => {
		if (!hasMore) return; // 더 이상 불러올 데이터가 없으면 요청하지 않음

		const fetchExplorations = async () => {
			setLoading(true);
			try {
				// API에 페이지 번호와 사이즈를 함께 요청
				const response = await api.get(`/explorations`, {
					params: { page: page, size: 2 }, // 백엔드 페이징 API에 맞게 파라미터 전달
				});

				// 테스트를 위해 의도적으로 3초간 지연시킵니다.
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// 기존 데이터에 새로운 데이터 추가
				setExplorations((prev) => [...prev, ...response.data.data.content]);
				console.log(response.data.data.content);
				// 백엔드에서 받은 마지막 페이지 여부로 hasMore 상태 업데이트
				setHasMore(!response.data.data.last);
			} catch (error) {
				console.error("탐방기 로드 실패:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchExplorations();
	}, [page]); // page state가 변경될 때마다 이 effect가 실행됨

	const handleNavigateToDetail = (event, id) => {
		if (event.target.closest('button, a, [role="button"]')) {
			return;
		}
		navigate(`${id}`);
	};

	return (
		<>
			{explorations.map((exploration, index) => {
				// ▼▼▼▼▼ 변경점 1 ▼▼▼▼▼
				// 마지막 요소를 확인하던 로직이 더 이상 필요 없어져서 삭제했습니다.
				// const isLastElement = explorations.length === index + 1;
				return (
					// ▼▼▼▼▼ 변경점 2 ▼▼▼▼▼
					// Row에 있던 ref를 제거했습니다.
					<Row key={`${exploration.id}-${index}`} className="justify-content-center p-0 m-0">
						<Col xs={12} sm={12} md={10} lg={12} className="p-0 m-0">
							<div
								onClick={(event) => handleNavigateToDetail(event, exploration.id)}
								style={{ cursor: "pointer" }}
							>
								<ExplorationPost {...exploration} />
							</div>
						</Col>
					</Row>
				);
			})}
			{/* ▼▼▼▼▼ 변경점 3 ▼▼▼▼▼ */}
			{/* 로딩 상태를 보여주는 맨 아래 div에 ref를 추가했습니다. */}
			<div ref={lastExplorationElementRef} className="text-center my-4">
				{loading && <LoadingSpinner />}
				{!loading && !hasMore && <p>모든 게시물을 불러왔습니다.</p>}
			</div>
		</>
	);
};

export default ExplorationBoard;
