import React from "react";
import { InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import "./CommentInput.css";

const CommentInput = () => {
  return (
    <Row>
      <Col>
        <InputGroup className="comment-input-group">
          <Form.Control
            placeholder="댓글을 입력하세요"
            className="comment-input"
          ></Form.Control>
          <Button className="comment-input-btn">댓글쓰기</Button>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default CommentInput;
