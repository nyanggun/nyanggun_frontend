import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import { InputGroup, Form, Row, Col, Image } from "react-bootstrap";
import "./BadgeAcquisition.css";
import GeoAltIcon from "../../assets/geo-alt-icon.svg";
import CertificationButton from "../../components/board/CertificationButton";
import api from "../../config/apiConfig";
import SmileFace from "../../assets/smile-face.svg";
import Menu from "../../components/common/menu/Menu";

const BadgeAcquisition = () => {
  // 지도 좌표 클릭하면 해당 주소 보여주는 useState
  const [mapAddress, setMapAddress] = useState("");
  // 지도 중심 관리(내 위치) 상태 관리
  const [center, setCenter] = useState({ lat: 37.5642135, lng: 127.0016985 });

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // 역지오코딩 함수
  // 디폴트 : 서울시청
  useEffect(() => {
    // 내 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const defaultLat = Number(position.coords.latitude);
        const defaultLng = Number(position.coords.longitude);
        console.log(center, typeof center?.lat, typeof center?.lng);
        setCenter({ lat: defaultLat, lng: defaultLng });
        fetchAddress(defaultLat, defaultLng);
      }),
        (error) => {
          setMapAddress("위치 접근에 실패했습니다.");
        };
    }
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await api.get(
        `/api/badge/coordinate?lat=${lat}&lng=${lng}`
      );

      if (response.data && response.data.address) {
        console.log(response.data.address);
        setMapAddress(response.data.address);
      }
    } catch (error) {
      setMapAddress("주소를 불러올 수 없습니다.");
    }
  };

  const handleMapClick = (e) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    fetchAddress(lat, lng);
  };

  return (
    <Row className="h-100 justify-content-center align-items-center m-0">
      <Col xs={12} sm={10} md={8} lg={6}>
        <div className="justify-content-center d-flex align-items-center">
          <div className="" xs={1}>
            <Image src={SmileFace} />
          </div>
          <div className="">
            <h2 className="">사냥꾼 증표</h2>
          </div>
        </div>
        <Menu className="" />
        <InputGroup className="flex-nowrap my-4 ba-border">
          <InputGroup.Text>
            <Image fluid className="icons" src={GeoAltIcon} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={mapAddress}
            readOnly
            style={{ width: "100%" }}
          />
        </InputGroup>
        <APIProvider
          className="mt-30"
          apiKey={apiKey}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Map
            defaultZoom={13}
            // defaultCenter={{ lat: 37.5642135, lng: 127.0016985 }}
            defaultCenter={center}
            mapId="badge_acquisition_map"
            className="custom-map ba-border"
            onClick={handleMapClick}
            onCameraChanged={(ev) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          >
            <Marker position={center} label="내위치"></Marker>
          </Map>
        </APIProvider>
        <CertificationButton text="인증하기"></CertificationButton>
      </Col>
    </Row>
  );
};

export default BadgeAcquisition;
