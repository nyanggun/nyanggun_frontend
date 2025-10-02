//컴포넌트 테스트 페이지 입니다.
//추후 삭제합니다.
import React, { useState } from "react";

//import NavigationBar from "../components/common/navigationbar/NavigationBar";
import CommentInput from "../components/comment/CommentInput";
import Comment from "../components/Comment/Comment";
import Menu from "../components/common/menu/Menu";
import Pagenations from "../components/common/pagination/Paginations";
import BookmarkButton from "../components/board/BookmarkButton";
import { Row, Col, Container } from "react-bootstrap";
import NavigationBar from "../components/common/navigationbar/NavigationBar";
import TalkDetail from "../components/board/TalkDetail";

const TestPage = () => {
  //페이지네이션 사용 예시
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  // 페이지 변경 시 실행되는 함수
  const handlePageChange = (page) => {
    setCurrentPage(page); // 상태 업데이트
    console.log("현재 페이지:", page);
  };
  return (
    <>
      <CommentInput></CommentInput>
      <Comment
        nickname={"래퍼순형"}
        content={"좋은 정보 감사합니다."}
        createdAt={"2025-10-02T15:32:00"}
      ></Comment>
      <Menu menuOne={"문화재 탐방기"} menuTwo={"문화재 담소"}></Menu>
      <Pagenations
        currentPage={currentPage}
        totalPage={12}
        onPageChange={handlePageChange}
      ></Pagenations>
      <NavigationBar></NavigationBar>
    </>
  );
};

export default TestPage;
