import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState, useEffect, useCallback } from "react";
import { InputGroup, Form, Row, Col, Image, Modal } from "react-bootstrap";
import "./BadgeBoard";
import GeoAltIcon from "../../assets/geo-alt-icon.svg";
import CertificationButton from "../../components/board/CertificationButton";
import api from "../../config/apiConfig";

// 거리 계산 함수 (Haversine Formula)
// 위경도가 lat1, lon1인 위치A, 위경도가 lat2, lon2인 위치B 사이의 거리를 구할 때 사용
const ACTIVE_RADIUS = 5000; // 획득 가능한 문화재 반경 세팅
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
  const [center, setCenter] = useState(null);
  // 국가유산청 api 상태 관리
  const [heritageList, setHeritageList] = useState([]);
  // 획득 반경에 있는 문화재 상태 관리
  const [nearest, setNearest] = useState(null);
  // 버튼 활성화 상태 관리
  const [isNear, setIsNear] = useState(false);
  // 내 위치 관리
  const [myLocation, setMyLocation] = useState(null);
  // 모달 관련 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [acquiredBadge, setAcquiredBadge] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  //----------------------------------------------------------------------
  // 1. 내 위치 가져오기 (mount 시 1회 실행)
  // 역지오코딩 함수 : 지도 좌표로 주소 불러오기
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
          setMyLocation({ lat: latitude, lng: longitude });
          if (!center) {
            setCenter({ lat: latitude, lng: longitude });
            fetchAddress(latitude, longitude);
          }

          // 모든 문화재와 거리 계산 후 가장 가까운 문화재를 target으로 + 획득하지 않은 문화재만
          const nearTargets = heritageList
            .map((item) => ({
              ...item,
              distance: getDistance(
                latitude,
                longitude,
                item.latitude,
                item.longitude
              ),
              // );
              // if (distance < minDistance) {
              //   minDistance = distance;
              //   nearestTarget = item;
              // }
            }))
            .filter((item) => item.distance <= ACTIVE_RADIUS && !item.acquired)
            .sort((a, b) => a.distance - b.distance);

          const nearestTarget = nearTargets[0] || null;

          // X미터 반경 이내면 그 문화재 증표 세팅하고 버튼 활성화
          if (nearestTarget) {
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
        `/googlemap/coordinate?lat=${lat}&lng=${lng}`
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
      console.log("지도 클릭 이벤트 발생");
      if (!e.detail || !e.detail.latLng) return;
      const lat = e.detail.latLng.lat;
      const lng = e.detail.latLng.lng;
      fetchAddress(lat, lng);
      setCenter({ lat, lng }); // 지도 중심 이동
    },
    [fetchAddress]
  );

  //----------------------------------------------------------------------

  // 4. 증표 표시해줄 문화재 불러와 지도에 마커 표시, 획득한 배지 id 불러오기
  const acquired = false;
  useEffect(() => {
    const fetchHeritages = async () => {
      try {
        const [heritageMarkers, acquiredBadgeIds] = await Promise.all([
          api.get("/badges/markers"),
          api.get("/badges/acquired"),
        ]);
        // const response = await api.get("/badges/markers");

        const allMarkers = heritageMarkers.data.data;
        const badgeIds = new Set(acquiredBadgeIds.data.data);

        // 화면에 표시할 마커들
        const merged = allMarkers
          .map((markers) => ({
            ...markers,
            acquired: badgeIds.has(markers.badgeId), // 즉시 렌더링해서 지도에 표시해주기 위해 acquired 추가
          }))
          // .filter((h) => center <= ACTIVE_RADIUS && !h.acquired) // 미획득 + 일정 거리 이내
          .sort((a, b) => (a.distance = b.distance)); // 가까운 순 정렬

        // 획득한 마커만 다르게 표시하기 위한 처리
        setHeritageList(merged);

        // if (response.data.data) {
        //   console.log(response.data.data);

        //   // 6. 획득한 증표 표시
        //   // 처음 세팅할 때, acquired 값을 넣어줘야 리액트에서 list 값 변화 감지 가능
        //   const data = response.data.data.map((badgeList) => ({
        //     ...badgeList,
        //     acquired: false,
        //   }));
        //   setHeritageList(data);
        //   // setHeritageList(response.data.data);
        // }
      } catch (error) {
        console.error("유산 api 데이터 불러오기 실패", error);
      }
    };
    fetchHeritages();
  }, []);

  // 상태 변화 확인용
  useEffect(() => {
    console.log("heritageList 변경됨:", heritageList);
  }, [heritageList]);

  //----------------------------------------------------------------------

  // 지도 위의 배지 클릭 시 발생 이벤트 : input 박스에 증표 주소 표시
  const handleMarkerClick = useCallback(
    (item) => {
      console.log("증표 클릭 이벤트 발생");
      const lat = item.latitude;
      const lng = item.longitude;

      fetchAddress(lat, lng);
      setCenter({ lat, lng }); // 지도 중심 이동
    },
    [fetchAddress]
  );

  // 5. 인증하기 버튼 클릭했을 때 발생하는 이벤트
  // 인증하기 버튼 누르면 저장
  const handleAquire = async () => {
    if (!nearest) return; // 가까운 문화재 없으면 return
    try {
      const response = await api.post(
        `/badges/acquire/${Number(nearest.badgeId)}`
      ); // 가장 가까운 문화재 id 서버로 전달
      if (response.data.success) {
        const heritageId = response.data.data.hunterBadge.id;
        alert(`${nearest.name} 배지 획득`);

        //6. 획득한 증표 표시(acquired 상태 변경)
        setHeritageList((prev) => {
          const updated = prev.map((badge) =>
            badge.badgeId === heritageId ? { ...badge, acquired: true } : badge
          );
          // 지도 부분 리렌더링도 강제 유도(center 약간 바꿔주는 트릭)
          setCenter((prev) => ({ ...prev }));
          return [...updated]; // 강제 렌더링
        });

        console.log(nearest);

        setAcquiredBadge({
          name: nearest.name,
          imgUrl: nearest.imgUrl,
        });
        setShowModal(true);
      }
    } catch (error) {
      alert("서버 오류 발생! 배지를 획득할 수 없습니다:", error);
    }
  };

  return (
    <>
      <Row className="h-100 justify-content-center align-items-center m-0">
        <Col xs={12} sm={10} md={8} lg={5}>
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
              center={center}
              mapId="badge_acquisition_map"
              className="custom-map ba-border"
              onClick={handleMapClick}
              onCameraChanged={(e) => {
                const newCenter = e.detail.center;
                setCenter(newCenter);
              }}
            >
              {/* 현재 내 위치(내 위치가 안잡히면 default 위치(서울시청)) 표시 */}
              {myLocation && <AdvancedMarker position={myLocation} />}
              {/* heritage 좌표에 마커 표시 */}
              {heritageList.map((item, index) => (
                <AdvancedMarker
                  key={index}
                  position={{
                    lat: Number(item.latitude),
                    lng: Number(item.longitude),
                  }}
                  onClick={() => handleMarkerClick(item)}
                >
                  <img
                    src={encodeURI(item.imgUrl)}
                    alt={item.name}
                    title={item.name}
                    className={`badge-image ${
                      item.acquired ? "unlocked" : "locked"
                    }`}
                    onError={(e) => {
                      const defaultImg = encodeURI(
                        "https://cdn.jsdelivr.net/gh/nyanggun/nyanggoon-badges@main/기본.png?flush_cache=true"
                      );
                      e.currentTarget.src = defaultImg;
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
                ? nearest.acquired
                  ? `획득완료(${nearest?.name})`
                  : `${nearest?.name} 획득하기`
                : "현위치에서 획득 가능 증표 없음"
            }
            onClick={handleAquire}
            disabled={!isNear || nearest.acquired}
          />
        </Col>
      </Row>
      {/* 증표 획득시 띄워주는 모달 */}
      {acquiredBadge && (
        <Modal
          className="text-center"
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span>
                <strong>{acquiredBadge.name}</strong> 증표 획득!
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {acquiredBadge && (
              <div>
                <img
                  className="modal-badge-img mb-3"
                  src={acquiredBadge.imgUrl}
                  alt={acquiredBadge.namge}
                />
                <h5>
                  <strong>{acquiredBadge.name}</strong>
                </h5>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <CertificationButton
              text={"확인"}
              onClick={() => setShowModal(false)}
            />
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default BadgeAcquisition;
