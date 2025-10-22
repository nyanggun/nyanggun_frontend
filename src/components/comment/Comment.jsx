import React, { useContext, useEffect, useState } from "react";
import CommentProfile from "../../assets/comment-profile.svg";
import CommentIcon from "../../assets/comment.svg";
import CommentInput from "./CommentInput";
import WarningRed from "../../assets/warning-red.svg";
import { Row, Col, Button, Image, Form } from "react-bootstrap";
import "./Comment.css";
import BorderButton from "../board/BorderButton";
import { AuthContext } from "../../contexts/AuthContext";
import ReportCommentButton from "../../components/board/button/ReportCommentButton";

const Comment = ({
  nickname,
  createdAt,
  content,
  profile,
  memberId,
  talkCommentId,
  parentCommentId,
  onCommentSubmit,
  onUpdateComment,
  onDeleteComment,
  reportComment,
  reportedPostId,
  reportedMemberId,
}) => {
  const userData = useContext(AuthContext);
  const [isCommentAdd, setCommentAdd] = useState(false);
  //댓글 수정 모드로 변환
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateContent, setUpdateContent] = useState(content);

  //시간 데이터(LocalDateTime)을 변환하여 1분 전 <-과 같은 형식으로 만들기
  //서버에서는 2025-10-02T15:32:00 로 받아올 때 사용 가능하다.
  const [timeAgo, setTimeAgo] = useState("");
  const formatTimeAgo = (time) => {
    const now = new Date();
    const past = new Date(time); // 서버에서 받은 LocalDateTime 문자열
    const diff = Math.floor((now - past) / 1000); // 초 단위 차이

    if (diff < 60) return "방금 전";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };
  useEffect(() => {
    // 처음 렌더링 시 계산
    setTimeAgo(formatTimeAgo(createdAt));

    // 초 단위로 업데이트
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(createdAt));
    }, 1000); // 1초마다 갱신

    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <div>
      <div>
        <div className="comment-profile">
          {/* 프로필이 없을 경우 기본 프로필 출력 */}
          {profile == null ? (
            <Image
              src={`https://picsum.photos/400/300?random=${memberId}`}
              roundedCircle
              className="comment-profile-pic border border-1"
            />
          ) : (
            <div>이미지를 불러오면 된다.</div>
          )}

          <div className="comment-nickname">{nickname}</div>
          <div className="comment-time">{timeAgo}</div>
        </div>
        <div>
          {/* 수정 버튼을 누르면 수정 모드로 전환합니다. */}
          {isUpdateMode ? (
            <div className="form-update-box">
              <Form.Control
                className="form-control-update"
                value={updateContent} //기존 내용
                //입력값이 나타나는 onChange
                onChange={(e) => setUpdateContent(e.target.value)}
              ></Form.Control>
              <div>
                <BorderButton
                  btnName={"완료"}
                  buttonColor={"black"}
                  clickBtn={() => {
                    onUpdateComment(talkCommentId, updateContent); // 부모로 최신 내용 전달
                    setIsUpdateMode(false); // 수정 모드 종료
                  }}
                ></BorderButton>
              </div>
            </div>
          ) : (
            <div className="comment-content">{content}</div>
          )}
        </div>

        <div className="comment-profile-btn">
          <div className="comment-btn-box">
            <div className="comment-btn">
              <img src={CommentIcon} width={15}></img>
              <span
                className="comment-font"
                onClick={() => {
                  setCommentAdd(!isCommentAdd);
                }}
              >
                {isCommentAdd ? "입력창 닫기" : "답글 달기"}
              </span>
            </div>
            <div className="comment-btn">
              <ReportCommentButton
                reportComment={reportComment}
                reportedPostId={reportedPostId}
                reportedMemberId={reportedMemberId}
              ></ReportCommentButton>
            </div>
          </div>
          {memberId === userData.user?.id ||
          userData.user?.role === "ROLE_ADMIN" ? (
            <div className="comment-btn-delete">
              <BorderButton
                btnName={"수정"}
                buttonColor={"black"}
                clickBtn={() => {
                  setIsUpdateMode(true);
                }}
              ></BorderButton>
              <span> </span>
              <BorderButton
                btnName={"삭제"}
                buttonColor={"red"}
                clickBtn={() => onDeleteComment(talkCommentId)}
              ></BorderButton>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {isCommentAdd ? (
          <div className="comment-add">
            <CommentInput
              parentCommentId={talkCommentId} // 부모 댓글 ID
              onSubmit={(content) => {
                if (parentCommentId && parentCommentId != null) {
                  onCommentSubmit(content, parentCommentId);
                }
                onCommentSubmit(content, talkCommentId);
                setCommentAdd(false);
              }} // 부모 함수 호출
            ></CommentInput>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Comment;
