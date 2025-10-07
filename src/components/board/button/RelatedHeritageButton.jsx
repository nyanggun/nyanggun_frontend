import React from "react";
import GeoAltIcon from "../../../assets/geo-alt-icon.svg";
import { Button, Image } from "react-bootstrap";
import "../BookmarkButton.css";

const PostEtcButton = ({ relatedHeritage }) => {
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
				<Image fluid className="post-etc-btn-img" src={GeoAltIcon} />
				{/* props.count로 북마크 수를 가져와 출력 */}
				<span>&nbsp;{relatedHeritage}</span>
			</div>
		</Button>
	);
};

export default PostEtcButton;
