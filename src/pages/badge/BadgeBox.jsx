import { useState, useEffect } from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import "./BadgeAcquisition.css";
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(5rem, 1fr))", // 한 줄에 5개
              gap: "0.5rem",
              transform: "scale(0.8)",
              placeContent: "center",
              width: "90%", // 그리드 자체 크기
              margin: "0 auto", // 가운데 정렬
            }}
          >
            {badgeList.map((badge, index) => (
              <div
                onClick={() =>
                  navigate(`/heritages/detail/${badge.heritageEncyclopediaId}`)
                }
                key={index}
                style={{
                  dispaly: "flex",
                  transform: "scale(0.9)", // 좁은 화면에서 축소
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%", // 부모(grid cell)에 맞춤
                    aspectRatio: "1 / 1", // 정사각형 유지
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    fluid
                    src={badge.badgeImg}
                    alt={badge.badgeName}
                    style={{
                      maxWidth: "90%",
                      height: "90%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      marginTop: "0.1rem",
                      fontSize: "1.2rem",
                      textAlign: "center",
                      wordBreak: "keep-all",
                    }}
                  >
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
