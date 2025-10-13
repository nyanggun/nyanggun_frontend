import React, { useState } from "react";
import BookmarkImage from "../../assets/bookmark.svg";
import { Button, Image } from "react-bootstrap";
import "./BookmarkButton.css";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

const BookmarkButton = ({ count, isBookmarked, onBookmark }) => {
    const [bookmark, setBookmark] = useState(isBookmarked);
    // bookmark 관련 로직
    const handleClick = () => {
        setBookmark((prev) => !prev);
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
