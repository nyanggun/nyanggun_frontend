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
	const userData = useContext(AuthContext);
	const [exploration, setExploration] = useState(null); // 단일 게시물 데이터
	const [explorationComments, setExplorationComments] = useState([]);
	const [replyExplorationComments, setReplyExplorationComments] = useState({});
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

	useEffect(() => {
		// 1. 최종적으로 상태에 저장할 새로운 객체를 미리 선언합니다.
		const newReplyComments = {};

		// 2. forEach를 사용해 배열을 순회하며 객체를 가공합니다.
		explorationComments.forEach((comment) => {
			if (comment.id != null && comment.parentCommentId) {
				// 만약 해당 parentCommentId를 키로 가진 배열이 없다면 초기화해줍니다.
				if (!newReplyComments[comment.parentCommentId]) {
					newReplyComments[comment.parentCommentId] = [];
				}
				// 해당 parentCommentId를 키로 가진 배열에 현재 댓글을 추가합니다.
				newReplyComments[comment.parentCommentId].push(comment);
			}
		});

		// 3. 반복문이 모두 끝난 후, 완성된 객체로 상태를 '한 번만' 업데이트합니다.
		setReplyExplorationComments(newReplyComments);
		console.log("newReplyComments:", newReplyComments);
	}, [explorationComments]);

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
		if (confirm("삭제하시겠습니까?")) {
			alert("삭제되었습니다");
		} else {
			return;
		}
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

	//탐방기 댓글을 신고하는 메소드 입니다.
	const reportComment = async (reason, postId, memberId) => {
		console.log(reason, postId, memberId);
		try {
			const response = await api.post("/exploration-comments/reports/comments", {
				reason: reason,
				postId: postId,
				memberId: memberId,
			});
			alert("탐방기 댓글 신고 완료");
		} catch (err) {
			console.error("탐방기 댓글 신고 요청 중 에러 발생", err);
		}
	};

	// 데이터 로딩이 완료되면 ExplorationPost 컴포넌트에 props로 넘겨 렌더링합니다.
	return (
		<div className="p-0 m-0">
			<div className="pb-3">
				{exploration && <ExplorationPost {...exploration} commentCount={explorationComments.length} />}
			</div>
			<Row className="justify-content-center p-0 m-0">
				<Col lg={6} className="col-11 col-sm-10 col-md-8 mb-3">
					<CommentInput onSubmit={onSubmit} />
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col lg={6} className="col-11 col-sm-10 col-md-8">
					{explorationComments
						// 1. 렌더링하기 전에 원댓글(parentCommentId가 없는 댓글)만 필터링합니다.
						//    - `comment &&` 체크를 추가하여 배열에 혹시 있을지 모를 null, undefined 값으로 인한 오류를 방지합니다.
						.filter((comment) => comment && comment.parentCommentId == null)
						.map((explorationComment) => {
							// 2. 현재 댓글에 해당하는 대댓글 배열을 변수에 할당합니다.
							//    - 이렇게 하면 코드가 더 명확해지고, undefined일 경우를 다루기 쉬워집니다.
							const replies = replyExplorationComments[explorationComment.id];

							return (
								<div key={explorationComment.id} className="mb-3">
									{console.log("explorationComment", explorationComment)}
									<Comment
										{...explorationComment}
										id={explorationComment.id}
										talkCommentId={explorationComment.id}
										onUpdateComment={onUpdateComment}
										onDeleteComment={onDeleteComment}
										onCommentSubmit={onSubmit}
										reportComment={reportComment}
										reportedPostId={explorationComment.id}
										reportedMemberId={userData.user?.id}
									/>
									{/* 3. replies 변수가 존재하고, 길이가 0보다 클 때만 대댓글 영역을 렌더링합니다. */}
									{replies && replies.length > 0 && (
										<div className="ms-5 mt-3 border-start ps-3">
											{replies.map((replyComment) => (
												<div key={replyComment.id} className="mb-2">
													<Comment
														{...replyComment}
														id={replyComment.id}
														talkCommentId={replyComment.id}
														onUpdateComment={onUpdateComment}
														onDeleteComment={onDeleteComment}
														onCommentSubmit={onSubmit}
														reportComment={reportComment}
														reportedPostId={replyComment.id}
														reportedMemberId={userData.user?.id}
													/>
												</div>
											))}
										</div>
									)}
								</div>
							);
						})}
				</Col>
			</Row>
		</div>
	);
};

export default ExplorationDetailPage;
