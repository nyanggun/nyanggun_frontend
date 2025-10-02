import React from "react";
import BookmarkImage from "../../assets/bookmark.svg";
import { Button } from "react-bootstrap";
import "./BookmarkButton.css";

const BookmarkButton = (props) => {
	const handleClick = () => {
		// bookmark 관련 로직
	};

	return (
		<Button
			variant=""
			className="bookmark-btn border btn rounded-4 d-flex justify-content-center align-itmes-center"
			size="md"
			onClick={handleClick}
		>
			<img src={BookmarkImage}></img>
			{/* props.count로 북마크 수를 가져와 출력 */}
			<span>&nbsp;{props.count}</span>
		</Button>
	);
};

export default BookmarkButton;
