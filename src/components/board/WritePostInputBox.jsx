import React from "react";
import { InputGroup, Form } from "react-bootstrap";

// 가로로 긴 input 입력창
// 버튼 사용 방법 props로 아래와 같이 보내면 된다.
//   type="text" -> input 박스 타입 지정
//   value="제목"
//   onChange={(e) => setTitle(e.target.value)}
//   placeholder="제목을 입력하세요"
const WritePostInputBox = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <InputGroup>
      {label && <InputGroup.Text id={`${id}-label`}>{label}</InputGroup.Text>}
      <Form.Control
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-describedby={`${id}-label`}
      />
    </InputGroup>
  );
};

export default WritePostInputBox;
