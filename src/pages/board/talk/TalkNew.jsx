import React, { useContext, useRef, useState } from "react";
import WritePostInputBox from "../../../components/board/WritePostInputBox";
import WritingEditor from "../../../components/board/WritingEditor";
import api from "../../../config/apiConfig";
import "./TalkNew.css";
import { useNavigate } from "react-router-dom";
import BorderButton from "../../../components/board/BorderButton";
import { Button, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";

//새로운 담소 게시글을 작성할 수 있는 페이지 입니다.
const TalkNew = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contentOrigin, setContentOrigin] = useState("");
  const content = contentOrigin.replace(/<[^>]+>/g, "");
  const [uploadImg, setUploadImg] = useState([]); // 배열로 관리

  const fileInputRef = useRef(null);
  const [uploadFiles, setUploadFiles] = useState(null);
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  const userData = useContext(AuthContext);

  const talkData = {
    title,
    content,
  };

  //담소 게시글을 작성하는 메소드 입니다.
  //서버로 요청을 보냅니다.
  const handleTalkNew = async (title, content) => {
    // 유효성 검사
    if (!title.trim() || !content.trim()) {
      alert("모든 내용을 입력해주세요");
      return;
    }
    // FormData 생성
    const formData = new FormData();
    formData.append(
      "talkData",
      new Blob([JSON.stringify(talkData)], { type: "application/json" })
    );
    // 파일 여러 개 추가
    if (uploadFiles && uploadFiles.length > 0) {
      uploadFiles.forEach((file) => formData.append("files", file));
      // 서버에서 "files"를 배열로 받도록 해야 함
    }
    try {
      const response = await api.post("/talks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("게시글을 작성했습니다.");
      console.log("담소 게시글을 작성했습니다.", response.data);
      navigate(`/dorandoran/talks/detail/${response.data.data}`);
    } catch (error) {
      console.error("담소 게시글을 작성하는 데 문제 발생", error.message);
    }
  };

  // 파일 선택 시 이미지 미리보기
  const onchangeImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // 이미 업로드된 이미지 + 새로 선택한 이미지 수가 4개 초과면 경고
    if (uploadImg.length + files.length > 4) {
      alert("사진은 4개까지 첨부가 가능합니다.");
      e.target.value = "";
      return;
    }
    const newImage = [];

    for (let file of files) {
      // 파일 크기 확인
      if (file.size > MAX_FILE_SIZE) {
        alert(
          "파일 크기가 너무 큽니다. 50MB 이하의 파일만 업로드할 수 있습니다."
        );
        e.target.value = ""; // 파일 input 초기화
        continue;
      }
      newImage.push(URL.createObjectURL(file));
    }
    //하나라도 파일이 들어가면
    if (newImage.length > 0) {
      setUploadImg((prev) => [...prev, ...newImage].slice(0, 4));
      setUploadFiles((prev) => [...(prev || []), ...files].slice(0, 4));
      console.log("파일 하나 들어감");
    }

    e.target.value = "";
  };

  const handleImgUpload = () => {
    fileInputRef.current.click();
  };

  //업로드한 사진 삭제
  const handleRemoveImage = (index) => {
    setUploadImg((prev) => prev.filter((_, i) => i !== index));
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Row className="row p-4 justify-content-center m-0  ">
      <Col xs={12} sm={10} md={6} className=" m-0 p-0">
        <div className="talk-new-container">
          <WritePostInputBox
            type={"text"}
            placeholder={"제목"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></WritePostInputBox>

          <WritingEditor
            value={contentOrigin}
            onChange={setContentOrigin}
          ></WritingEditor>
          <div className="mt-2">
            <Button
              type="button"
              className="photo-button"
              onClick={handleImgUpload}
            >
              이미지 업로드
            </Button>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onchangeImageUpload}
              style={{ display: "none" }}
            />
            <div className="talk-new-photo-img-container mt-2">
              {uploadImg &&
                uploadImg.map((uploadImg, index) => (
                  <img
                    className="talk-new-photo-imgsize"
                    key={index}
                    src={uploadImg}
                    alt="업로드된 이미지"
                    onClick={() => handleRemoveImage(index)}
                  />
                ))}
            </div>
          </div>
          <div className="talk-new-button">
            <div className="talk-new-button-gap">
              <BorderButton
                btnName={"취소"}
                buttonColor={"red"}
                clickBtn={() => {
                  navigate(`/dorandoran/talks`);
                }}
              ></BorderButton>
            </div>
            <div className="talk-new-button-gap">
              <BorderButton
                btnName={"완료"}
                buttonColor={"black"}
                clickBtn={() => handleTalkNew(title, content)}
              ></BorderButton>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TalkNew;
