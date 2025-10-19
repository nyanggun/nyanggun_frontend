import { useState, useEffect } from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import "./BadgeAcquisition.css";
import api from "../../config/apiConfig";

const BadgeAcquisition = () => {
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
          {/* 🟡 배지 그리드 시작 */}
          <div
            className="mt-3 mb-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(120px, 1fr))", // 한 줄에 5개
              placeContent: "center",
              width: "80%", // 그리드 자체 크기
              margin: "0 auto", // 가운데 정렬
            }}
          >
            {badgeList.map((badge, index) => (
              <div
                key={index}
                style={{
                  width: "5rem",
                  height: "5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                }}
              >
                <Image
                  src={badge.badgeImg}
                  alt={badge.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <div>
                  <span>{badge.name}</span>
                </div>
              </div>
            ))}
          </div>
          {/* 🟡 배지 그리드 끝 */}
        </Col>
      </Row>
    </Container>
  );
};

export default BadgeAcquisition;
