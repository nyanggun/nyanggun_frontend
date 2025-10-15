import React, { useEffect, useState } from "react";
import Subtitle from "../../../components/board/Subtitle";
import { Col, Row, Image } from "react-bootstrap";
import api from "../../../config/apiConfig";
import { useParams } from "react-router-dom";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import BookmarkButton from "../../../components/board/BookmarkButton";

const HeritageEncyclopediaDetail = () => {
  const [heritage, setHeritage] = useState(null);
  const { HeritageEncyclopediaId } = useParams();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [count, setCount] = useState(0);

  const fetchHeritageDetail = async () => {
    try {
      const response = await api.get(
        `/heritages/detail/${HeritageEncyclopediaId}`
      );

      console.log("??", response.data.data);
      console.log(response.data.success);

      if (response.data.success) {
        setHeritage(response.data.data);
      }
    } catch (error) {
      console.log("해당하는 문화재가 없습니다 ", error);
    }
  };

  useEffect(() => {
    fetchHeritageDetail();
    if (heritage) {
      setIsBookmarked(heritage.bookmarked);
      setCount(heritage.bookmarkCount);
    }
  }, [heritage]);

  const bookMarkClick = async () => {
    if (!heritage) return;
    console.log("heritage.bookmarked", heritage.bookmarked);
    console.log("isBookmarked", isBookmarked);
    try {
      if (isBookmarked) {
        const response = await api.delete(`/heritages/bookmark/${heritage.id}`);
        if (response.data.success) {
          setIsBookmarked(false);
          setCount((prev) => prev - 1);
        }
      } else {
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
    <Row className="h-100 justify-content-center align-items-center m-0">
      <Col xs={12} sm={10} md={8} lg={6}>
        <div className="">
          <div className="mb-3">
            <Subtitle text={"문화재 도감"}></Subtitle>
          </div>
          <div className="menu-lines center">
            <hr className="line green"></hr>
            <hr className="line white"></hr>
            <hr className="line red"></hr>
          </div>
        </div>
        {heritage && (
          <div className="mb-20">
            <div className="text-center mt-4">
              <Image src={heritage.imageUrl} fluid></Image>
            </div>
            <div className="mb-3 text-center">
              <span className="fs-3">
                <strong>
                  {heritage.name}({heritage.chineseName})
                </strong>
              </span>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <BookmarkButton
                count={count}
                isBookmarked={isBookmarked}
                onBookmark={bookMarkClick}
              ></BookmarkButton>
            </div>
            <div className="mb-4">
              <p className="mb-0 fs-6">소재지 : {heritage.address}</p>
              <p className="mb-0 fs-6">시대 : {heritage.period}</p>
            </div>

            <div className="mb-4">
              <span className="fs-6">{heritage.content}</span>
            </div>
          </div>
        )}
        <div className="pb-20">
          {heritage && heritage.latitude !== 0 && heritage.longitude !== 0 && (
            <APIProvider
              apiKey={apiKey}
              onLoad={() => console.log("Maps API has loaded.")}
            >
              <Map
                defaultZoom={13}
                // defaultCenter={{ lat: 37.5642135, lng: 127.0016985 }}
                defaultCenter={{
                  lat: heritage.latitude,
                  lng: heritage.longitude,
                }}
                mapId="heritage_encyclopedia_map"
                className="custom-map ba-border mb-5"
              >
                <AdvancedMarker
                  position={{
                    lat: Number(heritage.latitude),
                    lng: Number(heritage.longitude),
                  }}
                  title={heritage.name}
                ></AdvancedMarker>
              </Map>
            </APIProvider>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default HeritageEncyclopediaDetail;
