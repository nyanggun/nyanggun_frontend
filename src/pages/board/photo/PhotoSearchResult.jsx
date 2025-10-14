// PhotoMasonry.jsx
import React, { useContext, useEffect, useState } from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./PhotoList.css";
import { Row, Col } from "react-bootstrap";

// 예시 이미지
import Img1 from "../../../assets/images/1.jpg";
import Img2 from "../../../assets/images/2.jpg";
import Img3 from "../../../assets/images/3.jpg";
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

    //사진 검색 결과 목록을 불러오는 메소드 입니다.
    const handlePhotoBoxSearchList = async () => {
        try {
            const response = await api.get("/photobox/search", {
                params: { keyword: keyword },
            });
            const sortedData = response.data.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setPhotoBoard(sortedData);
            console.log(
                "사진함 사진 검색 결과 목록을 불러왔습니다.",
                sortedData
            );
        } catch (error) {
            console.log(
                "사진 검색 결과 목록을 불러오는 중 오류가 발생했습니다.",
                error.message
            );
        }
    };

    //검색어가 바뀌면 리렌더링 해준다.
    useEffect(() => {
        handlePhotoBoxSearchList();
    }, [keyword]);

    return (
        <div className="photos-container">
            <Row className="p-0 m-0 justify-content-center">
                <Col xs={12} sm={11} md={6} className="p-0 m-0 mb-5">
                    {photoBoard.length > 0 ? (
                        <MasonryInfiniteGrid gap={10}>
                            {photoBoard.map((item) => (
                                <div
                                    onClick={() => {
                                        navigate(
                                            `/photobox/detail/${item.photoBoxId}`
                                        );
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
