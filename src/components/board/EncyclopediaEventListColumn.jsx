import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import BookmarkButton from "./BookmarkButton";
import MemberButton from "./MemberButton";
import { Link } from "react-router-dom";
import api from "../../config/apiConfig";

const EncyclopediaEventListColumn = ({ heritage }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (heritage) {
      setIsBookmarked(heritage.bookmarked);
      setCount(heritage.bookmarkCount);
    }
  }, [heritage]);

  const bookMarkClick = async () => {
    if (!heritage) return;
    try {
      if (isBookmarked) {
        // bookmarked가 true일 때 클릭하면 북마크 삭제
        const response = await api.delete(`/heritages/bookmark/${heritage.id}`);
        if (response.data.success) {
          setIsBookmarked(false);
          setCount((prev) => prev - 1);
        }
      } else {
        // bookmarked가 false일 때 클릭하면 북마크 생성
        const response = await api.post(`/heritages/bookmark/${heritage.id}`);
        if (response.data.success) {
          setIsBookmarked(true);
          setCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log("북마크 처리에 실패했습니다.", error);
    }
  };

  return (
    <Row className="g-0 pb-1 h-25 mt-4 justify-content-center">
      <Col>
        <Link
          key={heritage.id}
          to={`/heritages/detail/${heritage.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="m-0 p-0 text-center">
            <Image src={heritage.imageUrl} fluid></Image>
          </div>
          <div className="m-0 p-1">
            <div>
              <div className="mb-3">
                <span className="fs-4">
                  <strong>{heritage.name}</strong>
                </span>
              </div>
              <div className="mb-4">
                <span className="fs-5">
                  {heritage?.content?.length > 0
                    ? heritage.content.slice(0, 70) + "..."
                    : heritage.content}
                </span>
              </div>

              {heritage.period != null && (
                <div className="mb-1">
                  <span className="fs-6">{heritage.period}</span>
                </div>
              )}
              <div>
                <span className="fs-6">{heritage.address}</span>
              </div>
            </div>
            {/* -- 하단 버튼 컨텐츠 -- */}
            {/* 2. 버튼들을 담을 Row에 mt-auto를 적용해 맨 아래로 밀어냅니다. */}
          </div>
        </Link>

        {heritage && (
          <div className="d-flex justify-content-end align-items-center pe-1">
            <BookmarkButton
              count={count}
              isBookmarked={isBookmarked}
              onBookmark={bookMarkClick}
            ></BookmarkButton>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default EncyclopediaEventListColumn;
