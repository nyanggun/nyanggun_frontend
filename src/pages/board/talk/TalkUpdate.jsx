import React, { useState } from "react";
import WritePostInputBox from "../../../components/board/WritePostInputBox";
import WritingEditor from "../../../components/board/WritingEditor";
import api from "../../../config/apiConfig";
import "./TalkNew.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BorderButton from "../../../components/board/BorderButton";

//담소 게시글을 수정할 수 있는 페이지 입니다.
const TalkUpdate = () => {
  const location = useLocation();
  const {
    talkId,
    title: initialTitle,
    content: initialContent,
  } = location.state || {};
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialTitle || "");
  const [contentOrigin, setContentOrigin] = useState(initialContent || "");
  const content = contentOrigin.replace(/<[^>]+>/g, "");

  //담소 게시글을 수정하는 메소드 입니다.
  //서버로 요청을 보냅니다.
  //현재 회원은 id가 1로 고정되어 있습니다. 로그인 구현 후 변경해야 합니다.
  const memberId = 1;
  const handleTalkUpdate = async (title, content) => {
    // 유효성 검사
    if (!title.trim() || !content.trim()) {
      alert("모든 내용을 입력해주세요");
      return;
    }
    try {
      await api.put(`/talks/${talkId}`, {
        memberId,
        title,
        content,
      });
      console.log("담소 게시글을 수정했습니다.");
      //서버에서 응답으로 해당 게시글의 id를 전달해줍니다.
      //해당 id를 이용하여 상세 페이지로 이동합니다.
      alert("게시글 수정이 완료되었습니다.");
      navigate(`/dorandoran/talks/detail/${talkId}`);
    } catch (error) {
      console.log(
        "담소 게시글을 수정하는 데 문제가 생겼습니다.",
        error.message
      );
    }
  };

  return (
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
            clickBtn={() => handleTalkUpdate(title, content)}
          ></BorderButton>
        </div>
      </div>
    </div>
  );
};

export default TalkUpdate;
