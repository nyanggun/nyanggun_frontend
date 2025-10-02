import React from "react";
import { InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import "./CommentInput.css";

const CommentInput = () => {
  return (
    <Row>
      <Col>
        <div className="comment-input-group">
          <Form.Control
            placeholder="댓글을 입력하세요"
            className="comment-input form-control no-focus"
          ></Form.Control>
          <Button className="comment-input-btn">댓글쓰기</Button>
        </div>
      </Col>
    </Row>
  );
};

export default CommentInput;
