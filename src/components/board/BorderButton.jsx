import { Button } from "react-bootstrap";
import React from "react";
import "./border-button.css";

// 테두리가 있고 비어 있는 작은 버튼
// 버튼 사용 방법 : props로 아래와 같이 보내면 된다.
// btnName : 버튼 이름(등록, 취소 등), clickBtn : 버튼 작동관련 함수, type : 버튼 타입, buttonColor : 버튼 색 지정(red, black 가능)
// <CompleteButton btnName="등록" type="submit" />
// <CompleteButton btnName="취소" clickBtn={handleCancel} />
const BorderButton = ({ btnName, clickBtn, type = "button", buttonColor }) => {
  return (
    <Button
      size="lm"
      className={`border-btn px-4 ${buttonColor}`}
      onClick={clickBtn}
      type={type}
    >
      <strong>{btnName}버 튼</strong>
    </Button>
  );
};

export default BorderButton;
