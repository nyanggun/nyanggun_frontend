import React, { useState, useEffect } from "react"; // 1. useEffect를 import 합니다.
import { Button } from "react-bootstrap";
import "./BookmarkButton.css";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

const BookmarkButton = ({ count, isBookmarked, onBookmark }) => {
	// 내부 state를 그대로 사용합니다.
	const [isActive, setIsActive] = useState(isBookmarked);

	// ✨ 이 부분이 핵심입니다.
	// useEffect의 두 번째 인자인 배열 [isBookmarked]는
	// "isBookmarked prop이 바뀔 때마다 이 안의 코드를 실행해주세요" 라는 의미입니다.
	useEffect(() => {
		// 부모에게서 받은 isBookmarked prop의 최신 값으로
		// 내부 isActive state를 업데이트(동기화)합니다.
		setIsActive(isBookmarked);
	}, [isBookmarked]); // 2. isBookmarked를 감시 대상으로 지정합니다.

	return (
		<Button
			variant=""
			className="bookmark-btn border btn rounded-4 d-flex justify-content-center align-itmes-center"
			size="sm"
			onClick={onBookmark}
		>
			<div className="icons d-flex align-items-center gap-1">
				{/* 3. 이제 내부 state인 isActive를 사용해도 부모의 상태를 잘 따라옵니다. */}
				{isActive ? <BookmarkFill color="#f2cc21" /> : <Bookmark />}
				<span>&nbsp;{count}</span>
			</div>
		</Button>
	);
};

export default BookmarkButton;
