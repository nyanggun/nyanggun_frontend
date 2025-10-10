import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams 훅 import
import api from "../../../config/apiConfig";

import ExplorationPost from "./ExplorationPost";

const ExplorationDetailPage = () => {
	// useParams를 사용해 URL의 id 파라미터 값을 가져옵니다.
	const { id } = useParams();

	const [exploration, setExploration] = useState(null); // 단일 게시물 데이터
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadExplorationDetail = async () => {
			try {
				// id를 이용해 서버에 특정 게시물의 데이터를 요청합니다.
				const response = await api.get(`http://localhost:8080/explorations/${id}`);
				setExploration(response.data);
				console.log(response.data);
			} catch (err) {
				setError(err);
				console.error("상세 데이터 로드 실패:", err);
			} finally {
				setLoading(false);
			}
		};
		loadExplorationDetail();
	}, [id]); // id 값이 변경될 때마다 데이터를 다시 불러옵니다.

	if (loading) return <div>로딩 중...</div>;
	if (error) return <div>오류가 발생했습니다.</div>;

	// 데이터 로딩이 완료되면 ExplorationPost 컴포넌트에 props로 넘겨 렌더링합니다.
	return <div>{exploration && <ExplorationPost {...exploration} />}</div>;
};

export default ExplorationDetailPage;
