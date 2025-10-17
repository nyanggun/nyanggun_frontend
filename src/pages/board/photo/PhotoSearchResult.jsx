// PhotoMasonry.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./PhotoList.css";
import { Row, Col } from "react-bootstrap";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import api from "../../../config/apiConfig";
import { AuthContext } from "../../../contexts/AuthContext";

const PhotoSearchResult = () => {
  const navigate = useNavigate();
  const [photoBoard, setPhotoBoard] = useState([]);
  const userData = useContext(AuthContext);
  const [searchKeyword] = useSearchParams();
  const keyword = searchKeyword.get("keyword");

  const cursor = useRef(null);
  const hasNext = useRef(true);

  const onRequestAppend = async () => {
    if (hasNext.current === false) return;
    try {
      // console.log("커서 요청 2:");
      const response2 = await api.get("/photobox/search", {
        params: { keyword: keyword, cursor: cursor.current },
      });

      cursor.current = response2.data.data.nextCursor;
      hasNext.current = response2.data.data.hasNext;
      // console.log("tempCursor2: ", cursor);
      // console.log("tempHasNext2: ", hasNext);
      // console.log("서버의 cursor 값 2:", response2.data.data.nextCursor);

      const { contents, nextCursor, hasNext: newHasNext } = response2.data.data;

      setPhotoBoard((prev) => [
        ...prev,
        ...contents.filter(
          (item) => !prev.some((p) => p.photoBoxId === item.photoBoxId)
        ),
      ]);

      //setPhotoBoard(sortedData);
      console.log("사진함 사진 목록을 불러왔습니다.", photoBoard);
    } catch (error) {
      console.log(
        "사진 목록을 불러오는 중 오류가 발생했습니다.",
        error.message
      );
    }
  };

  //사진 목록을 불러오는 메소드 입니다.
  const handlePhotoBoxSearchList = async () => {
    console.log("tempCursor: ", cursor);
    console.log("tempHasNext: ", hasNext);
    try {
      // console.log("커서 요청 1:", cursor);
      const response1 = await api.get("/photobox/search", {
        params: { keyword: keyword },
      });

      cursor.current = response1.data.data.nextCursor;
      hasNext.current = response1.data.data.hasNext;
      // console.log("tempCursor: ", cursor);
      // console.log("tempHasNext: ", hasNext);
      // console.log("서버의 cursor 값 1:", response1.data.data.nextCursor);
      const { contents, nextCursor, hasNext: newHasNext } = response1.data.data;

      setPhotoBoard((prev) => [
        ...prev,
        ...contents.filter(
          (item) => !prev.some((p) => p.photoBoxId === item.photoBoxId)
        ),
      ]);

      //setPhotoBoard(sortedData);
      console.log("사진함 사진 목록을 불러왔습니다.", photoBoard);
    } catch (error) {
      console.log(
        "사진 목록을 불러오는 중 오류가 발생했습니다.",
        error.message
      );
    }
  };
  //검색어가 바뀌면 리렌더링 해준다.
  useEffect(() => {
    //검색어가 바뀌면 모든 상태 초기화
    setPhotoBoard([]); // 기존 결과 제거
    cursor.current = null; // 커서 초기화
    hasNext.current = true; // 다음 페이지 가능 여부 초기화

    handlePhotoBoxSearchList();
  }, [keyword]);

  return (
    <div className="photos-container">
      <Row className="p-0 m-0 justify-content-center">
        <Col xs={12} sm={11} md={6} className="p-0 m-0 mb-5">
          {photoBoard.length > 0 ? (
            <MasonryInfiniteGrid
              gap={10}
              onRequestAppend={onRequestAppend} //사용자가 스크롤 끝에 도달했을 때 데이터를
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
              <h3>검색 결과가 없습니다.</h3>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PhotoSearchResult;
