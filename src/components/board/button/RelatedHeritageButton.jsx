import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import "../BookmarkButton.css";
import GeoAltIcon from "../../../assets/geo-alt-icon.svg";

const PostEtcButton = ({ relatedHeritage }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/heritages/search?keyword=${relatedHeritage}`);
	};

	return (
		<Button
			variant=""
			className="bookmark-btn btn rounded-4 d-flex justify-content-center align-itmes-center"
			size="sm"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation;
				handleClick();
			}}
		>
			<div className="icons d-flex align-items-center gap-1">
				<Image fluid className="post-etc-btn-img" src={GeoAltIcon} style={{ width: "17px", height: "17px" }} />

				<span className="text-content">{relatedHeritage}</span>
			</div>
		</Button>
	);
};

export default PostEtcButton;
