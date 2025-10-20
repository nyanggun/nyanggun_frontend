import { useState, useEffect } from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import "./BadgeBoard.css";
import api from "../../config/apiConfig";
import { useNavigate } from "react-router-dom";

const BadgeAcquisition = () => {
  const navigate = useNavigate();
  const [badgeList, setBadgesList] = useState([]);
  const fetchBadges = async () => {
    try {
      const response = await api.get("/badges/badgebox");
      console.log(response);
      if (response.data.success) {
        setBadgesList(response.data.data);
      }
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
                    className="badgebox-image"
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
