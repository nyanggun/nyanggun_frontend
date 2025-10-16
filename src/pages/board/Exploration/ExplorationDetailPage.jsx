import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams 훅 import
import api from "../../../config/apiConfig";
import { AuthContext } from "../../../contexts/AuthContext";

import ExplorationPost from "./ExplorationPost";
import Comment from "../../../components/comment/Comment";
import CommentInput from "../../../components/comment/CommentInput";
import { Col, Row } from "react-bootstrap";
import { useContext } from "react";

const ExplorationDetailPage = () => {
	const { user } = useContext(AuthContext);
	// useParams를 사용해 URL의 id 파라미터 값을 가져옵니다.
	const { id } = useParams();

	const [exploration, setExploration] = useState(null); // 단일 게시물 데이터
	const [explorationComments, setExplorationComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// 데이터를 불러오는 하나의 비동기 함수로 통합합니다.
		const loadData = async () => {
			try {
				// 요청 시작 시 로딩 상태를 true로 설정합니다.
				setLoading(true);

				// Promise.all을 사용해 두 API 요청을 동시에 보냅니다.
				const [explorationResponse, commentResponse] = await Promise.all([
					api.get(`/explorations/${id}`),
					api.get(`/exploration-comments`, {
						params: { explorationId: id },
					}),
				]);

				// 두 요청이 모두 성공하면, 한 번에 상태를 업데이트합니다.
				setExploration(explorationResponse.data);
				setExplorationComments(commentResponse.data.data);
			} catch (err) {
				setError(err);
				console.error("데이터 로드 실패:", err);
			} finally {
				// 모든 과정이 끝나면 로딩 상태를 false로 설정합니다.
				setLoading(false);
			}
		};

		loadData();
	}, [id]); // id 값이 변경될 때마다 데이터를 다시 불러옵니다.

	const onSubmit = async (comment, parentCommentId) => {
		try {
			const response = await api.post(`http://localhost:8080/exploration-comments`, {
				content: comment,
				memberId: user.id,
				explorationId: id,
				parentExplorationCommentId: parentCommentId,
			});
			console.log(response.data.data);
			const newComment = response.data.data;
			setExplorationComments((prevComments) => [newComment, ...prevComments]);
		} catch (err) {
			setError(err);
			console.error("문화재 탐방기 댓글 작성 실패");
		} finally {
			setLoading(false);
		}
	};
	const onUpdateComment = async (commentId, updatedContent) => {
		try {
			// 1. URL 수정: http:// 추가 및 댓글 ID 사용
			// 2. 요청 본문 추가: 수정할 내용을 객체로 전달
			const response = await api.patch(`http://localhost:8080/exploration-comments/${commentId}`, {
				id: commentId,
				content: updatedContent,
			});
			// 3. 수정 성공 시, 화면(state) 바로 업데이트
			setExplorationComments((prevComments) =>
				prevComments.map(
					(comment) =>
						// 업데이트할 댓글의 ID를 찾아서
						comment.id === response.data.data.id
							? response.data.data // 맞으면 새로 받은 댓글 객체로 교체
							: comment // 아니면 기존 댓글을 그대로 유지
				)
			);
		} catch (err) {
			console.error("댓글 수정 실패:", err);
			alert("댓글 수정에 실패했습니다.");
		} finally {
			setLoading(false);
		}
	};

	const onDeleteComment = async (commentId) => {
		try {
			const response = await api.delete(`http://localhost:8080/exploration-comments/${commentId}`);
			setExplorationComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
		} catch (err) {
			console.error("댓글 삭제 실패:", err);
			alert("댓글 삭제에 실패했습니다.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div>로딩 중...</div>;
	if (error) return <div>오류가 발생했습니다.</div>;

	// 데이터 로딩이 완료되면 ExplorationPost 컴포넌트에 props로 넘겨 렌더링합니다.
	return (
		<div>
			<div>{exploration && <ExplorationPost {...exploration} />}</div>
			<Row className="justify-content-center">
				<Col className="col-11 col-sm-10 col-md-6 mb-3">
					<CommentInput onSubmit={onSubmit} />
				</Col>
			</Row>
			{explorationComments.map((explorationComment) => (
				<Row key={explorationComment.id} className="justify-content-center">
					<Col className="col-11 col-sm-10 col-md-6">
						<Comment
							{...explorationComment}
							talkCommentId={explorationComment.id}
							onUpdateComment={onUpdateComment}
							onDeleteComment={onDeleteComment}
							onCommentSubmit={onSubmit}
						/>
					</Col>
				</Row>
			))}
		</div>
	);
};

export default ExplorationDetailPage;
