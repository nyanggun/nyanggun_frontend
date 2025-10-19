import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";

import BorderButton from "../BorderButton";
import "./ReportButton.css";
import ReportImage from "../../../assets/report-icon.svg";

const ReportModal = ({ onClose, reportPost, reportedPostId, reportedMemberId }) => {
	const [reason, setReason] = useState("");

	const onSubmit = () => {
		if (reason.trim() === "") {
			alert("신고 사유를 입력해주세요."); // 사용자에게 알림
			return; // 함수를 종료하여 제출 로직이 실행되지 않도록 함
		}
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
				<div className="modal-buttons d-flex justify-content-end pt-2 gap-1">
					<BorderButton btnName="취소" clickBtn={onClose} buttonColor={"black"} />
					<BorderButton btnName="제출" clickBtn={onSubmit} buttonColor={"red"} />
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
