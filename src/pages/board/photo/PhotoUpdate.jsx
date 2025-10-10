//사진함을 수정할 수 있는 페이지 입니다.
import { useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../config/apiConfig";
import WritePostInputBox from "../../../components/board/WritePostInputBox";
import WritingEditor from "../../../components/board/WritingEditor";
import BorderButton from "../../../components/board/BorderButton";
import "./PhotoNew.css";
import { X } from "react-bootstrap-icons";

const PhotoUpdate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        title: initialTitle,
        relatedHeritage: initialRelatedHeritage,
        nickname: initialNickname,
        tags: initialTags,
    } = location.state || {};
    const [title, setTitle] = useState(initialTitle || "");
    const [relatedHeritage, setRelatedHeritage] = useState(
        initialRelatedHeritage || ""
    );
    const [uploadImg, setUploadImg] = useState(null);
    const [tags, setTags] = useState(initialTags || []);

    const fileInputRef = useRef(null);
    const [input, setInput] = useState("");

    // 파일 선택 시 이미지 미리보기
    const onchangeImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadImg(URL.createObjectURL(file));
        }
    };
    const handleImgUpload = () => {
        fileInputRef.current.click();
    };

    const handleKeyDown = (e) => {
        const value = e.target.value;

        // 스페이스나 엔터 입력 시
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault(); // 기본 스페이스 동작 방지
            const trimmed = value.trim();

            // #로 시작하는지 확인
            if (trimmed.startsWith("#") && trimmed.length > 1) {
                if (!tags.includes(trimmed)) {
                    setTags([...tags, trimmed]);
                    setInput(""); // 입력창 초기화
                }
            }

            setInput(""); // 입력창 초기화
        } else {
            return;
        }
    };

    const handleDeleteTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <Row className="row p-4 justify-content-center m-0 ">
            <Col xs={12} sm={10} md={6} className=" m-0 p-0">
                <div className="photo-new-container">
                    <div className="photo-button-container">
                        <WritePostInputBox
                            placeholder={"제목"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></WritePostInputBox>
                        <WritePostInputBox
                            placeholder={"연관 문화재"}
                            value={relatedHeritage}
                            onChange={(e) => setRelatedHeritage(e.target.value)}
                        ></WritePostInputBox>

                        <Button
                            type="button"
                            className="photo-button"
                            onClick={handleImgUpload}
                        >
                            이미지 업로드
                        </Button>
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={onchangeImageUpload}
                                style={{ display: "none" }}
                            />
                            {uploadImg && (
                                <img
                                    className="photo-imgsize"
                                    src={uploadImg}
                                    alt="업로드된 이미지"
                                />
                            )}
                        </div>
                    </div>
                    <div className="photo-tag">
                        <input
                            className="photo-input"
                            type="text"
                            placeholder="태그를 입력하세요 (# 포함)"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="photo-tag-box">
                        {tags.map((tag, i) => (
                            <div
                                key={i}
                                className="photo-tag-item"
                                onClick={() => handleDeleteTag(tag)}
                            >
                                {tag}
                            </div>
                        ))}
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

export default PhotoUpdate;
