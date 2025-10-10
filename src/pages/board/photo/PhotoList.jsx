// PhotoMasonry.jsx
import React, { useState } from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./PhotoList.css";
import { Row, Col } from "react-bootstrap";

// 예시 이미지
import Img1 from "../../../assets/images/1.jpg";
import Img2 from "../../../assets/images/2.jpg";
import Img3 from "../../../assets/images/3.jpg";
import { Outlet, useNavigate } from "react-router-dom";

const PhotoList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, src: Img1 },
    { id: 2, src: Img2 },
    { id: 3, src: Img3 },
  ]);

  // 아이템이 끝에 도달했을 때 호출되는 콜백
  const onRequestAppend = () => {
    const nextId = items.length + 1;
    const newItems = [
      { id: nextId, src: Img1 },
      { id: nextId + 1, src: Img2 },
      { id: nextId + 2, src: Img3 },
    ];
    setItems([...items, ...newItems]);
  };

  return (
    <div className="photos-container">
      <Row className="p-0 m-0 justify-content-center">
        <Col xs={12} sm={11} md={6} className="p-0 m-0">
          <MasonryInfiniteGrid
            gap={10}
            onRequestAppend={onRequestAppend} //사용자가 스크롤 끝에 도달했을 때 데이터를 추가할 콜백 함수
            useRecycle={true} // 스크롤 시 화면에 보이지 않는 요소를 재활용하여 성능 최적화
          >
            {items.map((item) => (
              <div
                onClick={() => {
                  navigate(`/photobox/detail/${item.id}`);
                }}
                key={item.id}
                className="masonry-item"
              >
                <img src={item.src} alt={`img-${item.id}`} />
              </div>
            ))}
          </MasonryInfiniteGrid>
        </Col>
      </Row>
    </div>
  );
};

export default PhotoList;
