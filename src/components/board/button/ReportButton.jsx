import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";

import "./ReportButton.css";
import ReportImage from "../../../assets/report-icon.svg";

const ReportModal = ({ onClose, reportPost, reportedPostId, reportedMemberId }) => {
	const [reason, setReason] = useState("");

	const onSubmit = () => {
		reportPost(reason, reportedPostId, reportedMemberId);
		onClose();
	};
	return (
		<div className="modal-overlay">
			<div className="modal-content" onClick={(e) => e.stopPropagation}>
				<h2>신고하기</h2>
				<textarea
					rows="5"
					placeholder="신고 사유를 입력해주세요..."
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					style={{ width: "100%", padding: "8px" }}
				/>
				<div className="modal-buttons">
					<button onClick={onClose} className="close-btn">
						취소
					</button>
					<button onClick={onSubmit} className="submit-btn">
						제출
					</button>
				</div>
			</div>
		</div>
	);
};

const ReportButton = ({ reportedPostId, reportedMemberId, reportPost }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			<Button
				variant=""
				className="bookmark-btn btn border rounded-circle d-flex justify-content-center align-itmes-center"
				size="sm"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation;
					openModal();
				}}
			>
				<Image className="report-btn-img fluid" src={ReportImage} style={{ width: "17px", height: "20px" }} />
			</Button>
			{isModalOpen && (
				<ReportModal
					onClose={closeModal}
					reportPost={reportPost}
					reportedPostId={reportedPostId}
					reportedMemberId={reportedMemberId}
				/>
			)}
		</>
	);
};

export default ReportButton;
