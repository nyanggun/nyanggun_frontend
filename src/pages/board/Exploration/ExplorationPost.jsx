import { Card, Container, Row, Col, Image } from "react-bootstrap";
import DOMPurify from "dompurify";

import BookmarkButton from "../../../components/board/BookmarkButton";
import "../../../components/board/TalkDetail.css";

import RelatedHeritageButton from "../../../components/board/button/RelatedHeritageButton";
import CommentButton from "../../../components/board/button/CommentButton";
import ReportButton from "../../../components/board/button/ReportButton";

const TalkDetail = ({
	memberNickname,
	createdAt,
	title,
	img,
	content,
	bookmarkCount,
	commentCount,
	relatedHeritage,
}) => {
	const load = () => {};

	const sanitizedContent = DOMPurify.sanitize(content);

	return (
		<Row className="h-100 justify-content-center align-items-center m-0">
			<Col xs={12} sm={10} md={8} lg={6}>
				<Card className="rounded-0 border-0 border-bottom">
					<Card.Body>
						<Card.Title className="mt-3">{title}</Card.Title>
						<div className="d-flex align-items-center gap-2">
							<div className="talk-profile">
								<Image
									src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
									roundedCircle
									fluid
									className="talk-profile-pic border border-1"
								/>
							</div>
							<div>
								<span>{memberNickname}</span>
							</div>
							<div>
								<span className="small">{createdAt}</span>
							</div>
						</div>
						<Card.Img src={img} className="mt-2" />
						<Card.Text as="div" className="">
							<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
						</Card.Text>
						<div className="d-flex align-items-center gap-2">
							<div>
								<BookmarkButton count={bookmarkCount}></BookmarkButton>
							</div>
							<div>
								<RelatedHeritageButton relatedHeritage={relatedHeritage} />
							</div>
							<div>
								<CommentButton count={commentCount} />
							</div>
							<div>
								<ReportButton />
							</div>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default TalkDetail;
