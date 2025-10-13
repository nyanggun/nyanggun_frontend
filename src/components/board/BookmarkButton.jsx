import React, { useContext, useState } from "react";
import BookmarkImage from "../../assets/bookmark.svg";
import { Button, Image } from "react-bootstrap";
import "./BookmarkButton.css";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
import { AuthContext } from "../../contexts/AuthContext";

const BookmarkButton = ({ count, isBookmarked, onBookmark }) => {
  const [bookmark, setBookmark] = useState(isBookmarked);
  const userData = useContext(AuthContext);
  // bookmark 관련 로직
  const handleClick = () => {
    if (userData.user?.id) {
      setBookmark((prev) => !prev);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <Button
      variant=""
      className="bookmark-btn border btn rounded-4 d-flex justify-content-center align-itmes-center"
      size="sm"
      onClick={() => {
        handleClick();
        onBookmark();
      }}
    >
      <div className="icons d-flex align-items-center gap-1">
        {bookmark ? (
          <BookmarkFill color="#f2cc21"></BookmarkFill>
        ) : (
          <Bookmark></Bookmark>
        )}

        {/* props.count로 북마크 수를 가져와 출력 */}
        <span>&nbsp;{count}</span>
      </div>
    </Button>
  );
};

export default BookmarkButton;
