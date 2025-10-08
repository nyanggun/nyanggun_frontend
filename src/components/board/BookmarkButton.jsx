import React from "react";
import BookmarkImage from "../../assets/bookmark.svg";
import { Button, Image } from "react-bootstrap";
import "./BookmarkButton.css";

const BookmarkButton = ({ count }) => {
  // bookmark 관련 로직
  const handleClick = () => {};

  return (
    <Button
      variant=""
      className="bookmark-btn border btn rounded-4 d-flex justify-content-center align-itmes-center"
      size="sm"
      onClick={handleClick}
    >
      <div className="icons d-flex align-items-center gap-1">
        <Image fluid className="bookmark-btn-img" src={BookmarkImage} />
        {/* props.count로 북마크 수를 가져와 출력 */}
        <span>&nbsp;{count}</span>
      </div>
    </Button>
  );
};

export default BookmarkButton;
