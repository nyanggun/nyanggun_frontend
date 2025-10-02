//컴포넌트 테스트 페이지 입니다.
//추후 삭제합니다.
import React from "react";

//import NavigationBar from "../components/common/navigationbar/NavigationBar";
import CommentInput from "../components/comment/CommentInput";
import Comment from "../components/Comment/Comment";
import Menu from "../components/common/menu/Menu";
import Pagenations from "../components/common/pagination/Paginations";
import BookmarkButton from "../components/board/BookmarkButton";
import { Row, Col } from "react-bootstrap";
import NavigationBar from "../components/common/navigationbar/NavigationBar";

const TestPage = () => {
  return (
    <div>
      <CommentInput></CommentInput>
      <Comment></Comment>
      <Menu></Menu>
      <NavigationBar></NavigationBar>
    </div>
  );
};

export default TestPage;
