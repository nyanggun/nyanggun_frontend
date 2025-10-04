import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { InputGroup, Form, Row, Col, Image } from "react-bootstrap";
import "./BadgeAcquisition.css";
import GeoAltIcon from "../../assets/geo-alt-icon.svg";
import CertificationButton from "../../components/board/CertificationButton";
import SmileFace from "../../assets/smile-face.svg";
import Menu from "../../components/common/menu/Menu";

const BadgeAcquisition = () => {
  const [mapAddress, setMapAddress] = useState("");
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  // 역지오코딩 함수
  const fetchAddress = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ko`;

    const res = await fetch(url);
    const data = await res.json();

    console.log("📌 Geocode API 응답:", data); // ✅ 디버깅

    if (data.status === "OK") {
      setMapAddress(data.results[0].formatted_address); // 제일 적절한 주소
    } else {
      setMapAddress("주소를 불러올 수 없습니다.");
    }
  };

  const handleClick = (e) => {
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
            defaultCenter={{ lat: 37.5642135, lng: 127.0016985 }}
            mapId="badge_acquisition_map"
            className="custom-map ba-border"
            onClick={handleClick}
            onCameraChanged={(ev) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          />
        </APIProvider>
        <CertificationButton text="인증하기"></CertificationButton>
      </Col>
    </Row>
  );
};

export default BadgeAcquisition;
