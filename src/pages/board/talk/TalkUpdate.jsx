import React, { useContext, useEffect, useRef, useState } from "react";
import WritePostInputBox from "../../../components/board/WritePostInputBox";
import WritingEditor from "../../../components/board/WritingEditor";
import api from "../../../config/apiConfig";
import "./TalkNew.css";
import { useLocation, useNavigate } from "react-router-dom";
import BorderButton from "../../../components/board/BorderButton";
import { AuthContext } from "../../../contexts/AuthContext";
import { Row, Col, Button } from "react-bootstrap";

const TalkUpdate = () => {
  const location = useLocation();
  const userData = useContext(AuthContext);
  const {
    talkId,
    title: initialTitle,
    content: initialContent,
    talkPictureList: initialTalkPictureList,
  } = location.state || {};
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialTitle || "");
  const [contentOrigin, setContentOrigin] = useState(initialContent || "");
  const content = contentOrigin.replace(/<[^>]+>/g, "");

  const [existingImages, setExistingImages] = useState([]); // 서버 이미지 DTO
  const [newFiles, setNewFiles] = useState([]); // 새로 업로드한 File
  const [previewImgs, setPreviewImgs] = useState([]); // 미리보기 URL

  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  // 초기 이미지 세팅
  useEffect(() => {
    if (initialTalkPictureList && initialTalkPictureList.length > 0) {
      const existingUrls = initialTalkPictureList.map(
        (pic) => `http://localhost:8080${pic.path}`
      );
      setExistingImages(initialTalkPictureList);
      setPreviewImgs(existingUrls);
    }
  }, [initialTalkPictureList]);

  // 파일 선택 시
  const onchangeImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newUrls = [];

    for (let file of files) {
      if (file.size > MAX_FILE_SIZE) {
        alert("50MB 이하 파일만 업로드 가능합니다.");
        continue;
      }
      newUrls.push(URL.createObjectURL(file));
    }

    // 4개 제한
    if (previewImgs.length + newUrls.length > 4) {
      alert("사진은 최대 4개까지 첨부 가능합니다.");
      e.target.value = "";
      return;
    }

    setNewFiles((prev) => [...prev, ...files]);
    setPreviewImgs((prev) => [...prev, ...newUrls]);
    e.target.value = "";
  };

  const handleImgUpload = () => {
    fileInputRef.current.click();
  };

  // 이미지 삭제
  const handleRemoveImage = (index) => {
    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewFiles((prev) => prev.filter((_, i) => i !== newIndex));
    }
    setPreviewImgs((prev) => prev.filter((_, i) => i !== index));
  };

  // 게시글 수정
  const handleTalkUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    const talkData = {
      title,
      content,
      remainingImages: existingImages.map((img) => img.talkPictureId), // 서버에 남길 이미지 ID
    };

    const formData = new FormData();
    formData.append(
      "talkData",
      new Blob([JSON.stringify(talkData)], { type: "application/json" })
    );

    newFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await api.put(`/talks/${talkId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("게시글이 수정되었습니다.");
      navigate(`/dorandoran/talks/detail/${talkId}`);
    } catch (error) {
      console.error("게시글 수정 실패", error);
    }
  };

  return (
    <Row className="row p-4 justify-content-center m-0">
      <Col xs={12} sm={10} md={6} className="m-0 p-0">
        <div className="talk-new-container">
          <WritePostInputBox
            type="text"
            placeholder="제목"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <WritingEditor value={contentOrigin} onChange={setContentOrigin} />

          <div className="mt-2">
            <Button
              type="button"
              className="photo-button"
              onClick={handleImgUpload}
            >
              이미지 업로드
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onchangeImageUpload}
            style={{ display: "none" }}
          />

          <div className="talk-new-photo-img-container mt-2">
            {previewImgs.map((url, index) => (
              <img
                key={index}
                className="talk-new-photo-imgsize"
                src={url}
                alt="업로드된 이미지"
                onClick={() => handleRemoveImage(index)}
              />
            ))}
          </div>

          <div className="talk-new-button">
            <div className="talk-new-button-gap">
              <BorderButton
                btnName="취소"
                buttonColor="red"
                clickBtn={() => navigate("/dorandoran/talks")}
              />
            </div>
            <div className="talk-new-button-gap">
              <BorderButton
                btnName="완료"
                buttonColor="black"
                clickBtn={handleTalkUpdate}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TalkUpdate;
