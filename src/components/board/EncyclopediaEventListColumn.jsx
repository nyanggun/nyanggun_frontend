import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import BookmarkButton from "./BookmarkButton";
import MemberButton from "./MemberButton";

const EncyclopediaEventListColumn = ({ heritage }) => {
  return (
    <Row className="g-0 pb-1 h-25 mt-4 justify-content-center">
      <Col className="m-0 p-0" xs={12} sm={10} md={8} lg={6}>
        <Image src={heritage.imageUrl} fluid></Image>
      </Col>
      <Col className="m-0 p-1" xs={12} sm={10} md={8} lg={6}>
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
        <Row className="mt-auto">
          <Col className="d-flex justify-content-end align-items-center pe-1">
            {heritage.bookmark && <BookmarkButton count={heritage.bookmark} />}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default EncyclopediaEventListColumn;
