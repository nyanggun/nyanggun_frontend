import React from "react";
import CommentProfile from "../../assets/comment-profile.svg";
import CommentIcon from "../../assets/comment.svg";
import WarningRed from "../../assets/warning-red.svg";
import { Row, Col, Button } from "react-bootstrap";
import "./Comment.css";

const Comment = () => {
  return (
    <Row>
      <Col>
        <Col className="comment-profile">
          <img src={CommentProfile} />
          <div className="comment-nickname">지존헌터</div>
          <div className="comment-time">1분 전</div>
        </Col>
        <Col>
          <div className="comment-content">좋은 정보 감사합니다.</div>
        </Col>

        <Col className="comment-profile btn">
          <Button className="comment-btn">
            <img src={CommentIcon}></img>
            <span className="comment-font">답글 달기</span>
          </Button>
          <Button className="comment-btn">
            <img src={WarningRed}></img>
            <span className="comment-font red">댓글 신고</span>
          </Button>
        </Col>
      </Col>
    </Row>
  );
};

export default Comment;
