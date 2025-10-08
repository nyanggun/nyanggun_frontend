import BookmarkButton from "./BookmarkButton";
import "./TalkDetail.css";
import GeoAltIcon from "../../assets/geo-alt-icon.svg";
import ReportIcon from "../../assets/report-icon.svg";
import TextIcon from "../../assets/text-icon.svg";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import BorderButton from "./BorderButton";
import { useEffect, useState } from "react";

const TalkDetail = ({ talk, onClick, onDeleteTalk, onUpdateTalk }) => {
  //시간 데이터(LocalDateTime)을 변환하여 1분 전 <-과 같은 형식으로 만들기
  //서버에서는 2025-10-02T15:32:00 로 받아올 때 사용 가능하다.
  const [timeAgo, setTimeAgo] = useState("");
  const formatTimeAgo = (time) => {
    const now = new Date();
    const past = new Date(time); // 서버에서 받은 LocalDateTime 문자열
    const diff = Math.floor((now - past) / 1000); // 초 단위 차이

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

  const handleUpdateTalk = () => {};
  return (
    <Row
      onClick={onClick}
      className="h-100 justify-content-center align-items-center m-0"
    >
      <Col xs={12} sm={10} md={8} lg={6}>
        <Card className="border-0">
          <Card.Body className="pt-0 pb-0 px-3">
            <Card.Title>{talk.title}</Card.Title>
            <div className="d-flex align-items-center gap-2">
              {talk.profile ? (
                <div>프로필 사진이 있는 경우 이 부분을 고치세요.</div>
              ) : (
                <div className="talk-profile">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                    roundedCircle
                    fluid
                    className="talk-profile-pic border border-1"
                  />
                </div>
              )}
              <div>
                <span>{talk.nickname}</span>
              </div>
              <div>
                <span className="small">{timeAgo}</span>
              </div>
            </div>
            <Card.Img
              src="https://media.istockphoto.com/id/1676101015/ko/%EC%82%AC%EC%A7%84/%EA%B2%BD%EB%B3%B5%EA%B6%81%EC%9D%80-%EC%84%9D%EC%96%91%EC%9D%B4-%EC%95%84%EB%A6%84%EB%8B%B5%EA%B3%A0-%EC%84%9C%EC%9A%B8-%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD.jpg?s=612x612&w=0&k=20&c=gKZvvJAShxWls229xvzBJlCHJMJF9rOJn-yOYn1ACeA="
              className="mt-2"
            />
            <Card.Text className="mt-3">{talk.content}</Card.Text>
            <div className="card-setting align-items-center gap-2">
              <div className="card-box">
                <div>
                  <BookmarkButton></BookmarkButton>
                </div>
                <div className="icon-border d-flex align-items-center gap-1 p-1">
                  <Image fluid className="icons" src={TextIcon} />
                  <span className="small">11</span>
                </div>
                {/* 담소는 연관 문화재가 없으므로 해당 아이콘을 안보이게 합니다. */}
                {talk.relatedHeritage ? (
                  <div className="icon-border d-flex align-items-center gap-1 p-1">
                    <Image fluid className="icons" src={GeoAltIcon} />
                    <span className="small">{talk.relatedHeritage}</span>
                  </div>
                ) : (
                  <div></div>
                )}

                <div>
                  <Image
                    fluid
                    className="icons d-flex align-items-center"
                    src={ReportIcon}
                  />
                </div>
              </div>

              <div className="comment-btn-delete">
                <BorderButton
                  btnName={"수정"}
                  buttonColor={"black"}
                  clickBtn={() => {
                    onUpdateTalk();
                  }}
                ></BorderButton>
                <span> </span>
                <BorderButton
                  btnName={"삭제"}
                  buttonColor={"red"}
                  clickBtn={() => {
                    onDeleteTalk();
                  }}
                ></BorderButton>
              </div>
            </div>
            <hr className="border-1 p-0"></hr>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TalkDetail;
