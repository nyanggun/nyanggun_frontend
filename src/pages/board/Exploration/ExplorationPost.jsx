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
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const TalkDetail = ({
  id,
  createdAt,
  title,
  imageNameList,
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
    setTimeAgo(formatTimeAgo(createdAt));

    // 초 단위로 업데이트
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(createdAt));
    }, 1000); // 1초마다 갱신

    return () => clearInterval(interval);
  }, [createdAt]);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user || !id) return; // user나 id가 없으면 실행하지 않음

      try {
        const response = await api.get(`/explorations/bookmarks`, {
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
        originImageNameList: imageNameList,
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
        await api.delete(`/explorations/${id}`);

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
        const response = await api.post(`/explorations/bookmarks`, {
          explorationId: id,
          memberId: user.id,
        });
        setBookmarkCounts(bookmarkCounts + 1);
      } else {
        const response = await api.delete(`/explorations/bookmarks`, {
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

  const reportPost = async (reason, postId, memberId) => {
    try {
      const response = await api.post("/explorations/reports", {
        reason: reason,
        postId: postId,
        memberId: memberId,
      });
      alert("신고 완료");
    } catch (err) {
      console.error("문화재 탐방기 신고 요청 중 에러 발생", err);
    }
  };

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Row className="h-100 justify-content-center align-items-center p-0 m-0 mb-2">
      <Col xs={11} sm={10} md={8} lg={6} className="p-0 pb-3 border-bottom">
        <Card className="rounded-0 border-0">
          <Card.Body className="m-0 p-0">
            <Card.Title className="p-0 m-0 pb-1">{title}</Card.Title>
            <Row>
              <Col
                xs={7}
                sm={7}
                className="d-flex justify-content-start align-items-center gap-2"
              >
                <div className="talk-profile p-0">
                  <Image
                    src={`https://picsum.photos/400/300?random=${member.id}`}
                    roundedCircle
                    fluid
                    className="talk-profile-pic border border-1 p-0"
                  />
                </div>
                <div>
                  <span>{member.nickname}</span>
                </div>
                <div>
                  <span className="small">{timeAgo}</span>
                </div>
              </Col>
              {location.pathname.startsWith("/dorandoran/explorations/") && (
                <Col
                  xs={5}
                  sm={5}
                  className="d-flex justify-content-end align-items-center gap-1 py-1"
                >
                  <div className="">
                    {user && user.id == member.id && (
                      <BorderButton
                        btnName="수정"
                        buttonColor="black"
                        clickBtn={editExploration}
                      />
                    )}
                  </div>
                  <div className="">
                    {user && user.id == member.id && (
                      <BorderButton
                        btnName="삭제"
                        buttonColor="red"
                        clickBtn={deleteExploration}
                      />
                    )}
                  </div>
                </Col>
              )}
            </Row>
            <Carousel interval={null} className="my-3 bg-light rounded p-0 m-0">
              {/* 1. imagePathList 배열을 .map() 함수로 순회합니다. */}
              {imageNameList.map((imageName, index) => (
                // 2. 각 이미지마다 Carousel.Item을 생성합니다.
                //    React가 각 항목을 식별할 수 있도록 고유한 'key'를 꼭 넣어주어야 합니다.
                <Carousel.Item key={index} className="bg-dark">
                  {console.log(
                    `http://localhost:8080/explorations/images/${imageName}`
                  )}
                  <img
                    className="w-100"
                    // 3. src에 현재 순회 중인 이미지 주소(imagePath)를 넣어줍니다.
                    src={`http://localhost:8080/explorations/images/${imageName}`}
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
            {location.pathname.startsWith("/dorandoran/explorations/") && (
              <div className="pb-3 pt-3">
                <AutoSearchMap keyword={relatedHeritage} />
              </div>
            )}
            <div className="row d-flex justify-content-between m-0">
              <div className="col-xs-12 col-sm-8 d-flex justify-content-start align-items-center gap-2 p-0 m-0 mt-3">
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
                  <ReportButton
                    reportedPostId={id}
                    reportedMemberId={member.id}
                    reportPost={reportPost}
                  />
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

// AutoSearchMap.jsx

const AutoSearchMap = ({ keyword }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [center, setCenter] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // 1. 유효한 검색어(searchQuery)를 보장합니다.
    //    keyword prop이 null, undefined, ""인 경우 "서울"을 기본값으로 사용합니다.
    const searchQuery = keyword || "서울";

    // 2. 맵 라이브러리가 로드되지 않았거나,
    //    Google Places API가 준비되지 않았으면 검색을 실행하지 않습니다.
    if (
      !mapLoaded ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    ) {
      console.log("맵 준비 안됨:", {
        mapLoaded,
        hasGoogle: !!window.google,
        hasPlaces: !!window.google?.maps?.places,
        keyword,
      });
      setCenter(null); // 조건 미충족 시 마커 제거
      return;
    }

    // 3. searchQuery는 항상 유효한 값이므로 !keyword 체크가 필요 없습니다.
    console.log("장소 검색 시도:", searchQuery);
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      query: searchQuery, // 4. 보장된 searchQuery 변수를 사용합니다.
      fields: ["name", "geometry", "formatted_address"],
    };

    // 키워드로 장소 검색 실행
    service.findPlaceFromQuery(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results[0]
      ) {
        const place = results[0];
        const location = place.geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
        console.log("📍 검색 결과:", place.name, place.formatted_address);
      } else {
        console.error("❌ 검색 실패:", status, " (검색어: ", searchQuery, ")");
        setCenter(null); // 검색 실패 시 마커 제거
      }
    });
  }, [mapLoaded, keyword]);

  if (!apiKey) {
    console.error(
      "Google Maps API 키가 없습니다. apiKey 변수에 키를 입력하세요."
    );
    return <div>API 키가 설정되지 않았습니다.</div>;
  }

  return (
    <APIProvider
      apiKey={apiKey}
      libraries={["places"]}
      onLoad={() => {
        console.log("Google Maps API Provider 로드됨");
        setMapLoaded(true);
      }}
    >
      <Map
        style={{ width: "100%", height: "400px" }} // 높이는 필요에 맞게 조절
        defaultZoom={14}
        // center가 null이면 서울, 아니면 검색된 위치로 중심 이동
        center={center || { lat: 37.5665, lng: 126.978 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {/* 검색 결과(center)가 있을 때만 마커 표시 */}
        {center && <Marker position={center} />}
      </Map>
    </APIProvider>
  );
};
