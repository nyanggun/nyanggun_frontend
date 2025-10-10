//사진함에서 새로운 사진 업로드를 하는 페이지 입니다.

import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../config/apiConfig";
import WritePostInputBox from "../../../components/board/WritePostInputBox";
import WritingEditor from "../../../components/board/WritingEditor";
import BorderButton from "../../../components/board/BorderButton";
import "./PhotoNew.css";

const PhotoNew = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contentOrigin, setContentOrigin] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  //담소 게시글을 작성하는 메소드 입니다.
  //서버로 요청을 보냅니다.
  //현재 회원은 id가 1로 고정되어 있습니다. 로그인 구현 후 변경해야 합니다.
  const memberId = 1;

  const InputTag = (e) => {
    const value = e.target.value;
    // 스페이스 입력 시
    if (value.endsWith(" ")) {
      const newTag = value.trim();
      if (newTag.startsWith("#") && newTag.length > 1) {
        setTags([...tags, newTag]); // 태그 배열에 추가
      }
      setInputValue(""); // 입력창 초기화
    } else {
      setInputValue(value);
    }
  };

  return (
    <Row className="row p-4 justify-content-center m-0 ">
      <Col xs={12} sm={10} md={6} className=" m-0 p-0">
        <div className="photo-new-container">
          <div className="photo-button-container">
            <WritePostInputBox placeholder={"제목"}></WritePostInputBox>
            <WritePostInputBox placeholder={"연관 문화재"}></WritePostInputBox>
            <Button type="button" className="photo-button">
              이미지 업로드
            </Button>
            <WritePostInputBox
              placeholder={"태그를 입력하세요"}
              onChange={InputTag}
            ></WritePostInputBox>
          </div>

          <div className="photo-new-button">
            <div className="photo-new-button-gap">
              <BorderButton
                btnName={"취소"}
                buttonColor={"red"}
                clickBtn={() => {
                  navigate(`/photobox/list`);
                }}
              ></BorderButton>
            </div>
            <div className="photo-new-button-gap">
              <BorderButton
                btnName={"완료"}
                buttonColor={"black"}
              ></BorderButton>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PhotoNew;
