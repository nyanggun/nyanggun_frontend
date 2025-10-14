import React, { useContext, useState } from "react";
import { InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import "./CommentInput.css";
import { AuthContext } from "../../contexts/AuthContext";

const CommentInput = ({ onSubmit, parentCommentId = null }) => {
  const [comment, setComment] = useState("");
  const userData = useContext(AuthContext);

  const handleChange = (e) => setComment(e.target.value);
  const handleSubmit = () => {
    if (!comment.trim()) return;

    if (userData.user?.id) {
      onSubmit(comment, parentCommentId);
      setComment("");
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSubmit();
    }
  };
  return (
    <div>
      <div>
        <div className="comment-input-group">
          <Form.Control
            placeholder="댓글을 입력하세요"
            className="comment-input form-control no-focus"
            value={comment}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          ></Form.Control>
          <Button className="comment-input-btn" onClick={handleSubmit}>
            댓글쓰기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
