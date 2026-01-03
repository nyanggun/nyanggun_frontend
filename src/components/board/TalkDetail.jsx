import BookmarkButton from "./BookmarkButton";
import "./TalkDetail.css";
import GeoAltIcon from "../../assets/geo-alt-icon.svg";
import ReportIcon from "../../assets/report-icon.svg";
import TextIcon from "../../assets/text-icon.svg";
import { Card, Container, Row, Col, Image, Carousel } from "react-bootstrap";
import BorderButton from "./BorderButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ReportButton from "./button/ReportButton";
import api from "../../config/apiConfig";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import CommentButtonImage from "../../assets/comment.svg";

const TalkDetail = ({
  talk,
  onClick,
  onDeleteTalk,
  onUpdateTalk,
  onBookmark,
}) => {
  const userData = useContext(AuthContext);
  const navigate = useNavigate();
  //시간 데이터(LocalDateTime)을 변환하여 1분 전 <-과 같은 형식으로 만들기
  //서버에서는 2025-10-02T15:32:00 로 받아올 때 사용 가능하다.
  const [timeAgo, setTimeAgo] = useState("");
  const currentPath = location.pathname;
  const formatTimeAgo = (time) => {
    const past = new Date(time);
    const pastKST = new Date(past.getTime() + 9 * 60 * 60 * 1000);

    const now = new Date();
    const diff = Math.floor((now - pastKST) / 1000);

    if (diff < 60) return "방금 전";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  useEffect(() => {
    // 처음 렌더링 시 계산
    setTimeAgo(formatTimeAgo(talk.createdAt));

    // 초 단위로 업데이트
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(talk.createdAt));
    }, 1000); // 1초마다 갱신

    return () => clearInterval(interval);
  }, [talk.createdAt]);

  const reportPost = async (reason, postId, memberId) => {
    console.log(reason, postId, memberId);
    try {
      if (talk.content) {
        const response = await api.post("/talks/reports", {
          reason: reason,
          postId: postId,
          memberId: memberId,
        });
        alert("담소 신고 완료");
      } else {
        const response = await api.post("/photobox/reports", {
          reason: reason,
          postId: postId,
          memberId: memberId,
        });
        alert("사진함 신고 완료");
      }
    } catch (err) {
      console.error("신고 요청 중 에러 발생", err);
    }
  };

  return (
    <Row
      onClick={onClick}
      className="h-100 justify-content-center align-items-center m-0"
    >
      <Col xs={12} sm={10} md={8} lg={6}>
        <Card className="border-0">
          <Card.Body className="pt-0 pb-0 px-2">
            <Card.Title>{talk.title}</Card.Title>

            <div className="talk-name">
              <div
                className="talk-name"
                onClick={() => navigate(`/mypage/${talk.memberId}`)}
              >
                {talk.profile ? (
                  <div>프로필 사진이 있는 경우 이 부분을 고치세요.</div>
                ) : (
                  <div className="talk-profile">
                    <Image
                      src={`https://picsum.photos/400/300?random=${talk.memberId}`}
                      roundedCircle
                      fluid
                      className="talk-profile-pic border border-0"
                    />
                  </div>
                )}
                <div>
                  <span className="p-2">{talk.nickname}</span>
                </div>
                <div>
                  <span className="small">{timeAgo}</span>
                </div>
              </div>
              <div>
                {/* 현재 페이지가 상세 페이지일때만 버튼 노출 */}
                {currentPath.startsWith("/dorandoran/talks/detail") ||
                currentPath.startsWith("/photobox/detail") ? (
                  talk.memberId === userData.user?.id ||
                  userData.user?.role === "ROLE_ADMIN" ? (
                    <div className="comment-btn-delete">
                      <BorderButton
                        btnName="수정"
                        buttonColor="black"
                        clickBtn={onUpdateTalk}
                      />
                      <span> </span>
                      <BorderButton
                        btnName="삭제"
                        buttonColor="red"
                        clickBtn={onDeleteTalk}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            {talk.photoBoxPicturePath ? (
              <div>
                <img
                  className="talk-photo-imgsize-photobox"
                  src={`${talk.photoBoxPicturePath}`}
                ></img>
              </div>
            ) : (
              <div></div>
            )}

            {talk.talkPictureList && talk.talkPictureList.length > 0 ? (
              <Carousel
                interval={null}
                className="mt-3"
                // onClick={(e) => e.stopPropagation()} // 상위 클릭 이벤트 막기
              >
                {talk.talkPictureList.map((picture, index) => (
                  <Carousel.Item
                    key={index}
                    style={{
                      width: "100%",
                      height: "270px",
                      overflow: "hidden",
                      backgroundColor: "black",
                    }}
                  >
                    <div className="talk-photo-imgsize">
                      <img
                        style={{
                          maxHeight: "450px",
                          objectFit: "contain", // 이미지가 잘리지 않게 비율 유지
                          margin: "0 auto",
                        }}
                        className="talk-photo-imgsize"
                        src={`${picture.path}`}
                      ></img>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div></div>
            )}
            {talk.tags && talk.tags.length > 0 ? (
              <div className="tags">
                {talk.tags.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() =>
                      navigate(
                        `/photobox/search?keyword=${tag.replace("#", "")}`
                      )
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div></div>
            )}

            <Card.Text
              className={`mt-3 ${
                currentPath.startsWith("/dorandoran/talks/detail") ||
                currentPath.startsWith("/photobox/detail")
                  ? ""
                  : "multi-line-ellipsis"
              }`}
            >
              {talk.content}
            </Card.Text>
            <div className="card-setting align-items-center gap-1">
              <div className="card-box">
                <div className="me-1">
                  <BookmarkButton
                    count={talk.bookmarkCount}
                    onBookmark={onBookmark}
                    isBookmarked={talk.bookmarked}
                  ></BookmarkButton>
                </div>
                {/* 사진함은 댓글이 없으므로 해당 아이콘을 보이지 않게 합니다. */}
                {talk.commentCount > -1 ? (
                  <div className="icon-border d-flex align-items-center gap-1 pt-1 ps-2 pe-2 pb-1 me-1">
                    <Image
                      fluid
                      className="icons"
                      src={CommentButtonImage}
                      width="15"
                    />
                    <span className="small">{talk.commentCount}</span>
                  </div>
                ) : (
                  <span></span>
                )}
                {/* 담소는 연관 문화재가 없으므로 해당 아이콘을 안보이게 합니다. */}
                {talk.relatedHeritage ? (
                  <div
                    className="icon-border d-flex align-items-center gap-1 p-0 m-0 me-1 pe-1"
                    onClick={() =>
                      navigate(
                        `/heritages/search?keyword=${talk.relatedHeritage}`
                      )
                    }
                  >
                    <Search
                      width={12}
                      height={12}
                      className="talk-search-icon"
                    />
                    <span className="small related-heritage">
                      {talk.relatedHeritage}
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}

                <ReportButton
                  reportedPostId={talk.content ? talk.talkId : talk.id}
                  reportedMemberId={userData.user?.id}
                  reportPost={reportPost}
                ></ReportButton>
              </div>
              {/* 게시글 작성 아이디 = 유저 번호 */}
            </div>

            <hr className="border-1 p-0"></hr>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TalkDetail;
