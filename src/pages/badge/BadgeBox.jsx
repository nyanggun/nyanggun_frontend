import { useState, useEffect } from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import "./BadgeBoard.css";
import api from "../../config/apiConfig";
import { useNavigate } from "react-router-dom";
//import { _getSelectionAffectedTableWidget } from "ckeditor5";

const BadgeAcquisition = () => {
  const navigate = useNavigate();
  const [acquiredBadge, setAcquiredBadge] = useState(null);
  const [badgeList, setBadgesList] = useState([]);

  const fetchBadges = async () => {
    try {
      const [allBadges, acquiredBadges] = await Promise.all([
        api.get("/badges/markers"),
        api.get("/badges/badgebox"),
      ]);

      // 획득하지 않은 배지(회색) + 획득한 배지(칼라)
      const allBadgesResponse = allBadges.data.data;
      const acquiredBadgesResponse = new Set(acquiredBadges.data.data);

      // 획득 여부 알려 주기 위해 acquired : false 속성 추가
      const attachAcquiredToAllBadges = allBadgesResponse.map((badge) => ({
        ...allBadges,
        acquired: acquiredBadgesResponse.has(badge.badgeId),
      }));

      // 획득 증표 는 acquired 속성 true로 변경
      setBadgesList(attachAcquiredToAllBadges);

      // 획득한 배지만 표시
      // console.log(acquiredBadges);
      // if (acquiredBadges.data.success) {
      //   setBadgesList(acquiredBadges.data.data);
      // }
    } catch (error) {
      console.log("증표를 가져오기 실패 ", error);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  return (
    <Container
      fluid
      className="h-100 d-flex justify-content-center align-items-center m-0 p-0"
    >
      <Row className="justify-content-center align-items-center w-100 m-0">
        <Col xs={12} sm={10} md={8} lg={8} className="text-center">
          {/* 배지 그리드 */}
          <div className="badgebox-grid">
            {badgeList.map((badge, index) => (
              <div
                className="badgebox-map-parent"
                onClick={() =>
                  navigate(`/heritages/detail/${badge.heritageEncyclopediaId}`)
                }
                key={index}
              >
                <div className="badgebox-map-child">
                  <Image
                    fluid
                    className={`badgebox-image ${
                      badge.acquired ? "unlocked" : "locked"
                    }`}
                    src={badge.badgeImg}
                    alt={badge.badgeName}
                  />
                </div>
                <div>
                  <p className="badgebox-text">
                    <strong>{badge.badgeName}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BadgeAcquisition;
