import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";

import BorderButton from "../BorderButton";
import "./ReportCommentButton.css";
import ReportImage from "../../../assets/report-icon.svg";
import WarningRed from "../../../assets/warning-red.svg";
const ReportModal = ({
  onClose,
  reportComment,
  reportedPostId,
  reportedMemberId,
}) => {
  const [reason, setReason] = useState("");
  const onSubmit = () => {
    if (reason.trim() === "") {
      alert("신고 사유를 입력해주세요."); // 사용자에게 알림
      return; // 함수를 종료하여 제출 로직이 실행되지 않도록 함
    }
    reportComment(reason, reportedPostId, reportedMemberId);
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
          <BorderButton
            btnName="취소"
            clickBtn={onClose}
            buttonColor={"black"}
          />
          <BorderButton
            btnName="제출"
            clickBtn={onSubmit}
            buttonColor={"red"}
          />
        </div>
      </div>
    </div>
  );
};

const ReportButton = ({
  reportedCommentId,
  reportedMemberId,
  reportComment,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <Button
          variant=""
          size="sm"
          className="report-comment-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation;
            openModal();
          }}
        >
          <div className="comment-btn-box">
            <img src={WarningRed} width={15}></img>
            <span className="comment-font-red">댓글 신고</span>
          </div>
        </Button>
      </div>
      {isModalOpen && (
        <ReportModal
          onClose={closeModal}
          reportComment={reportComment}
          reportedCommentId={reportedCommentId}
          reportedMemberId={reportedMemberId}
        />
      )}
    </>
  );
};

export default ReportButton;
