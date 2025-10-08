import React, { useState } from "react";
import { InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import "./CommentInput.css";

const CommentInput = ({ onSubmit, parentCommentId = null }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => setComment(e.target.value);
  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(comment, parentCommentId);
    setComment("");
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
