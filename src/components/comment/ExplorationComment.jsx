import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { Form } from "react-bootstrap";
import "./Comment.css";
import BorderButton from "../board/BorderButton";

const Comment = ({ comment, onCommentSubmit, onUpdateComment, onDeleteComment }) => {
	const { id, nickname, createdAt, content, profile, children } = comment;

	const [isCommentAdd, setCommentAdd] = useState(false);
	const [isUpdateMode, setIsUpdateMode] = useState(false);
	const [updateContent, setUpdateContent] = useState(content);
	const [timeAgo, setTimeAgo] = useState("");

	useEffect(() => {
		const formatTimeAgo = (time) => {
			const now = new Date();
			const past = new Date(time);
			const diff = Math.floor((now - past) / 1000);

			if (diff < 60) return "방금 전";
			if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
			if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
			return `${Math.floor(diff / 86400)}일 전`;
		};

		setTimeAgo(formatTimeAgo(createdAt));
		const interval = setInterval(() => {
			setTimeAgo(formatTimeAgo(createdAt));
		}, 1000);

		return () => clearInterval(interval);
	}, [createdAt]);

	return (
		<div className="comment-container">
			<div className="comment-profile">
				{profile == null ? (
					<img
						src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
						alt="profile"
						className="comment-profile-pic border border-1"
						style={{ width: "32px", height: "32px", borderRadius: "50%" }}
					/>
				) : (
					<div>이미지를 불러오면 된다.</div>
				)}
				<div className="comment-nickname">{nickname}</div>
				<div className="comment-time">{timeAgo}</div>
			</div>

			<div>
				{isUpdateMode ? (
					<div className="form-update-box">
						<Form.Control
							className="form-control-update"
							value={updateContent}
							onChange={(e) => setUpdateContent(e.target.value)}
						/>
						<div>
							<BorderButton
								btnName={"완료"}
								buttonColor={"black"}
								clickBtn={() => {
									onUpdateComment(id, updateContent);
									setIsUpdateMode(false);
								}}
							/>
						</div>
					</div>
				) : (
					<div className="comment-content">{content}</div>
				)}
			</div>

			<div className="comment-profile-btn">
				<div>
					<span className="comment-font" onClick={() => setCommentAdd(!isCommentAdd)}>
						{isCommentAdd ? "입력창 닫기" : "답글 달기"}
					</span>
					<span className="comment-font red" style={{ marginLeft: "10px" }}>
						댓글 신고
					</span>
				</div>
				<div className="comment-btn-delete">
					<BorderButton btnName={"수정"} buttonColor={"black"} clickBtn={() => setIsUpdateMode(true)} />
					<span> </span>
					<BorderButton btnName={"삭제"} buttonColor={"red"} clickBtn={() => onDeleteComment(id)} />
				</div>
			</div>

			{isCommentAdd && (
				<div className="comment-add">
					<CommentInput
						onSubmit={(newContent) => {
							onCommentSubmit(newContent, id);
							setCommentAdd(false);
						}}
					/>
				</div>
			)}

			{/* 재귀 렌더링 부분 */}
			{children && children.length > 0 && (
				<div className="comment-replies">
					{children.map((childComment) => (
						<Comment
							key={childComment.id}
							comment={childComment}
							onCommentSubmit={onCommentSubmit}
							onUpdateComment={onUpdateComment}
							onDeleteComment={onDeleteComment}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Comment;
