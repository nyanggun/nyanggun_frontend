import { Card, Container, Row, Col, Image, Carousel } from "react-bootstrap";
import api from "../../../config/apiConfig";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import DOMPurify from "dompurify";

import { AuthContext } from "../../../contexts/AuthContext";
import BookmarkButton from "../../../components/board/BookmarkButton";
import "../../../components/board/TalkDetail.css";

import RelatedHeritageButton from "../../../components/board/button/RelatedHeritageButton";
import CommentButton from "../../../components/board/button/CommentButton";
import ReportButton from "../../../components/board/button/ReportButton";
import BorderButton from "../../../components/board/BorderButton";

const TalkDetail = ({
	id,
	createdAt,
	title,
	imagePathList,
	content,
	member,
	bookmarkCount,
	commentCount,
	relatedHeritage,
}) => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [bookmarkCounts, setBookmarkCounts] = useState(bookmarkCount);

	useEffect(() => {
		const checkBookmarkStatus = async () => {
			if (!user || !id) return; // user나 id가 없으면 실행하지 않음

			try {
				const response = await api.get(`http://localhost:8080/explorations/bookmarks`, {
					params: {
						memberId: user.id,
						explorationId: id,
					},
				});
				// Spring Boot에서 보낸 ApiResponseDto의 data 필드(boolean)를 사용합니다.
				setIsBookmarked(response.data.data);
			} catch (err) {
				console.error("북마크 상태 조회 실패:", err);
				// 에러 발생 시 기본값 false 유지
				setIsBookmarked(false);
			}
		};
		checkBookmarkStatus(); // 정의한 함수를 호출합니다.
	}, [id, user]); // id나 user 정보가 바뀔 때마다 다시 실행됩니다.

	const editExploration = () => {
		// ✨ 데이터를 담아서 페이지를 이동시키는 올바른 코드
		navigate(`/dorandoran/explorations/${id}/edit`, {
			state: {
				originTitle: title,
				originRelatedHeritage: relatedHeritage,
				originContent: content,
				originImagePathList: imagePathList,
				memberId: member.id,
			},
		});
	};
	const deleteExploration = async () => {
		// 사용자에게 진짜 삭제할 것인지 확인
		if (window.confirm("정말로 삭제하시겠습니까?")) {
			try {
				console.log("글쓴이Id:" + member.id);
				// 확인을 누르면 서버에 삭제 요청을 보냄
				await api.delete(`http://localhost:8080/explorations/${id}`);

				// 3. 삭제 성공 시, 사용자에게 알리고 목록 페이지 등으로 이동시킵니다.
				alert("삭제가 완료되었습니다.");
				navigate("/dorandoran/explorations"); // 게시물 목록 페이지 경로로 변경해주세요.
			} catch (error) {
				// 4. 삭제 실패 시, 에러를 처리합니다.
				console.error("게시물 삭제에 실패했습니다:", error);
				alert("삭제에 실패했습니다. 다시 시도해주세요.");
			}
		}
	};

	const onBookmark = async () => {
		try {
			if (!isBookmarked) {
				const response = await api.post(`http://localhost:8080/explorations/bookmarks`, {
					explorationId: id,
					memberId: user.id,
				});
				setBookmarkCounts(bookmarkCounts + 1);
			} else {
				const response = await api.delete(`http://localhost:8080/explorations/bookmarks`, {
					data: {
						explorationId: id,
						memberId: user.id,
					},
				});
				setBookmarkCounts(bookmarkCounts - 1);
			}
			setIsBookmarked(!isBookmarked);
		} catch (err) {
			console.error(err);
		}
	};

	const sanitizedContent = DOMPurify.sanitize(content);

	return (
		<Row className="h-100 justify-content-center align-items-center m-0">
			<Col xs={11} sm={10} md={8} lg={6}>
				<Card className="rounded-0 border-0">
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
								<span>{member.nickname}</span>
							</div>
							<div>
								<span className="small">{createdAt}</span>
							</div>
						</div>
						<Carousel interval={null} className="mt-3 bg-light rounded">
							{/* 1. imagePathList 배열을 .map() 함수로 순회합니다. */}
							{imagePathList.map((imagePath, index) => (
								// 2. 각 이미지마다 Carousel.Item을 생성합니다.
								//    React가 각 항목을 식별할 수 있도록 고유한 'key'를 꼭 넣어주어야 합니다.
								<Carousel.Item key={index} className="bg-dark">
									{console.log(`http://localhost:8080${imagePath}`)}
									<img
										className="w-100"
										// 3. src에 현재 순회 중인 이미지 주소(imagePath)를 넣어줍니다.
										src={`http://localhost:8080${imagePath}`}
										alt={`Slide ${index + 1}`}
										style={{
											maxHeight: "450px",
											objectFit: "contain", // 이미지가 잘리지 않게 비율 유지
											margin: "0 auto",
										}}
									/>
								</Carousel.Item>
							))}
						</Carousel>
						<Card.Text as="div" className="">
							<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
						</Card.Text>
						<div className="row d-flex justify-content-between">
							<div className="col-xs-12 col-sm-8 d-flex justify-content-start align-items-center gap-2 py-1">
								<div>
									<BookmarkButton
										count={bookmarkCounts}
										onBookmark={onBookmark}
										isBookmarked={isBookmarked}
									></BookmarkButton>
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
							<div className="col-xs-12 col-sm-4 d-flex justify-content-end align-items-center gap-2 py-1">
								<div className="">
									<BorderButton btnName="수정" buttonColor="black" clickBtn={editExploration} />
								</div>
								<div className="">
									<BorderButton btnName="삭제" buttonColor="red" clickBtn={deleteExploration} />
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default TalkDetail;
