import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState, useEffect, useCallback } from "react";
import { InputGroup, Form, Row, Col, Image } from "react-bootstrap";
import "./BadgeAcquisition.css";
import GeoAltIcon from "../../assets/geo-alt-icon.svg";
import CertificationButton from "../../components/board/CertificationButton";
import api from "../../config/apiConfig";
import SmileFace from "../../assets/smile-face.svg";
import Menu from "../../components/common/menu/Menu";

// 거리 계산 함수 (Haversine Formula)
// 위경도가 lat1, lon1인 위치A, 위경도가 lat2, lon2인 위치B 사이의 거리를 구할 때 사용
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // 지구 반지름 (m)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 거리(m)
};

const BadgeAcquisition = () => {
  // 지도 좌표 클릭하면 해당 주소 보여주는 useState
  const [mapAddress, setMapAddress] = useState("");
  // 지도 중심 관리(내 위치) 상태 관리
  const [center, setCenter] = useState({ lat: 37.5642135, lng: 127.0016985 });
  // 국가유산청 api 상태 관리
  const [heritageList, setHeritageList] = useState([]);
  // 획득 반경에 있는 문화재 상태 관리
  const [nearest, setNearest] = useState(null);
  // 버튼 활성화 상태 관리
  const [isNear, setIsNear] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  //----------------------------------------------------------------------
  // 1. 내 위치 가져오기 (mount 시 1회 실행)
  // 역지오코딩 함수 : 지도 좌표로 주소 불러오기
  // 디폴트 : 서울시청
  useEffect(() => {
    // 내 위치 가져오기
    if (!navigator.geolocation) {
      setMapAddress("이 브라우저에서는 위치 서비스를 사용할 수 없습니다.");
      return;
    }
    if (navigator.geolocation) {
      // 지도 페이지가 mount 될 때 내가 있는 위치를 기본으로 지도에 표시하며, 지도 중앙에 마커 표시
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(
            center,
            typeof center?.latitude,
            typeof center?.longitude
          );
          setCenter({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);

          let minDistance = Infinity;
          let nearestTarget = null;

          // 모든 문화재와 거리 계산 후 가장 가까운 문화재를 target으로
          heritageList.forEach((item) => {
            const distance = getDistance(
              latitude,
              longitude,
              item.latitude,
              item.longitude
            );
            if (distance < minDistance) {
              minDistance = distance;
              nearestTarget = item;
            }
          });

          // X미터 반경 이내면 그 문화재 세팅하고 버튼 활성화
          if (nearestTarget && minDistance < 1000) {
            setNearest(nearestTarget);
            setIsNear(true);
          } else {
            setNearest(null);
            setIsNear(false);
          }
        },
        (error) => {
          console.log("위치 접근에 실패했습니다.", error);
          setMapAddress("위치 접근에 실패했습니다.");
        },
        {
          enableHighAccuracy: true, // GPS 기반으로 더 정확한 위치 측정
          timeout: 10000, // 10초 이내에 응답 없으면 에러 발생
          maximumAge: 0, // 캐시된 위치 절대 사용 금지 (항상 새로 측정)
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [heritageList]);

  // 2. 좌표 → 주소 변환 (역지오코딩)
  // 지도를 클릭 했을 때 좌표 -> 주소 반환 : 보안을 위해 역지오코딩 하기 위한 좌표를 서버에서 처리 후 반환
  const fetchAddress = useCallback(async (lat, lng) => {
    try {
      const response = await api.get(
        `/api/googlemap/coordinate?lat=${lat}&lng=${lng}`
      );
      if (response.data && response.data.address) {
        setMapAddress(response.data.address);
      }
    } catch (error) {
      console.log("주소를 불러올 수 없습니다.", error);
      setMapAddress("주소를 불러올 수 없습니다.");
    }
  }, []);

  // 3. 지도 클릭 이벤트
  // 지도를 클릭 했을 때 그 위치 정보 처리
  const handleMapClick = useCallback(
    (e) => {
      console.log("🔥 지도 클릭 이벤트 발생");
      if (!e.detail || !e.detail.latLng) return;
      const lat = e.detail.latLng.lat;
      const lng = e.detail.latLng.lng;
      console.log("📍 클릭 좌표:", lat, lng);
      fetchAddress(lat, lng);
      setCenter({ lat, lng }); // 지도 중심 이동
    },
    [fetchAddress]
  );

  //----------------------------------------------------------------------

  // 4. 국가유산청 API 불러오기
  // 국가유산청 api로 지도에 마커 표시
  useEffect(() => {
    const fetchHeritages = async () => {
      try {
        const response = await api.get("/api/heritages/markers");
        if (response.data.data) {
          console.log(response.data.data);
          setHeritageList(response.data.data);
        }
      } catch (error) {
        console.error("유산 api 데이터 불러오기 실패", error);
      }
    };
    fetchHeritages();
  }, []);

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
            {/* 현재 내 위치(내 위치가 안잡히면 default 위치(서울시청)) 표시 */}
            <AdvancedMarker position={center} />
            {/* heritage 좌표에 마커 표시 */}
            {heritageList.map((item, index) => (
              <AdvancedMarker
                key={index}
                position={{
                  lat: Number(item.latitude),
                  lng: Number(item.longitude),
                }}
                title={item.name}
              >
                <img
                  src={item.badgeUrl}
                  width={30}
                  height={30}
                  onError={(e) => {
                    const fallback = encodeURI(
                      "https://cdn.jsdelivr.net/gh/nyanggun/nyanggoon-badges@main/기본.png?flush_cache=true"
                    );
                    e.currentTarget.src = fallback;
                  }}
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: "50%",
                    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  }}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
        {/* ✅ 인증 버튼 (100m 이내일 때만 활성화) */}
        <CertificationButton
          text={
            isNear
              ? `🎯 ${nearest?.name} 인증하기`
              : "문화재 근처에서만 인증 가능"
          }
          disabled={!isNear}
        />
      </Col>
    </Row>
  );
};

export default BadgeAcquisition;
