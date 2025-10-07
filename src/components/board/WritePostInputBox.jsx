import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import "./WritePostInputBox.css";

// 가로로 긴 input 입력창
// 버튼 사용 방법 props로 아래와 같이 보내면 된다.
//   type="text" -> input 박스 타입 지정
//   value="제목"
//   onChange={(e) => setTitle(e.target.value)}
//   placeholder="제목을 입력하세요"
const WritePostInputBox = ({ id, label, type, value, onChange, placeholder }) => {
	return (
		<InputGroup className="my-1 border-solid">
			{label && (
				<InputGroup.Text id={`${id}-label`}>
					<p>{label}</p>
				</InputGroup.Text>
			)}
			<Form.Control
				className="custom-form-control rounded-0"
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
