// PhotoMasonry.jsx
import React, { useContext, useEffect, useState } from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./PhotoList.css";
import { Row, Col } from "react-bootstrap";

// 예시 이미지
import Img1 from "../../../assets/images/1.jpg";
import Img2 from "../../../assets/images/2.jpg";
import Img3 from "../../../assets/images/3.jpg";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../../../config/apiConfig";
import { AuthContext } from "../../../contexts/AuthContext";

const PhotoList = () => {
  const navigate = useNavigate();
  const [photoBoard, setPhotoBoard] = useState([]);
  const userData = useContext(AuthContext);

  // 아이템이 끝에 도달했을 때 호출되는 콜백
  // const onRequestAppend = () => {
  //     const nextId = items.length + 1;
  //     const newItems = [
  //         { id: nextId, src: Img1 },
  //         { id: nextId + 1, src: Img2 },
  //         { id: nextId + 2, src: Img3 },
  //     ];
  //     setItems([...items, ...newItems]);
  // };

  //사진 목록을 불러오는 메소드 입니다.
  const handlePhotoBoxList = async () => {
    try {
      const response = await api.get("/photobox");
      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPhotoBoard(sortedData);
      console.log("사진함 사진 목록을 불러왔습니다.", sortedData);
    } catch (error) {
      console.log(
        "사진 목록을 불러오는 중 오류가 발생했습니다.",
        error.message
      );
    }
  };

  useEffect(() => {
    handlePhotoBoxList();
  }, []);

  return (
    <div className="photos-container">
      <Row className="p-0 m-0 justify-content-center">
        <Col xs={12} sm={11} md={6} className="p-0 m-0 mb-5">
          {photoBoard.length > 0 ? (
            <MasonryInfiniteGrid
              gap={10}
              // onRequestAppend={onRequestAppend} //사용자가 스크롤 끝에 도달했을 때 데이터를 추가할 콜백 함수
              // useRecycle={true} // 스크롤 시 화면에 보이지 않는 요소를 재활용하여 성능 최적화
            >
              {photoBoard.map((item) => (
                <div
                  onClick={() => {
                    navigate(`/photobox/detail/${item.photoBoxId}`);
                  }}
                  key={item.photoBoxId}
                  className="masonry-item"
                >
                  <img
                    src={`http://localhost:8080${item.path}`}
                    alt={`${item.photoBoxId}`}
                  />
                </div>
              ))}
            </MasonryInfiniteGrid>
          ) : (
            <div className="talk-list-none">
              <h3>사진함 게시물이 없습니다.</h3>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PhotoList;
