import "./talk-detail.css";
import { Card, Container, Row, Col, Image } from "react-bootstrap";

const TalkDetail = ({ talk }) => {
  return (
    <Row className="h-100 justify-content-center align-items-center m-0">
      <Col xs={12} sm={10} md={8} lg={6}>
        <Card>
          <Card.Body>
            <Card.Title className="mt-3">궁궐 갔다온 후기 전함</Card.Title>
            <div className="d-flex align-items-center gap-2">
              <div className="talk-profile">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                  roundedCircle
                  fluid
                  className="talk-profile-pic border border-1"
                />
              </div>
              <div>
                <span>김대감</span>
              </div>
              <div>
                <span className="small">10시간전</span>
              </div>
            </div>
            <Card.Img
              src="https://media.istockphoto.com/id/1676101015/ko/%EC%82%AC%EC%A7%84/%EA%B2%BD%EB%B3%B5%EA%B6%81%EC%9D%80-%EC%84%9D%EC%96%91%EC%9D%B4-%EC%95%84%EB%A6%84%EB%8B%B5%EA%B3%A0-%EC%84%9C%EC%9A%B8-%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD.jpg?s=612x612&w=0&k=20&c=gKZvvJAShxWls229xvzBJlCHJMJF9rOJn-yOYn1ACeA="
              className="mt-2"
            />
            <Card.Text className="mt-3">
              나 김대감, 궁궐에 다녀왔다. 주상전하 계신 곳에 가다니 무한한 영광.
              이 영광 나의 후손들에게 전해지리성은이 망극한 주상전하의
              은총영원히 기억하고 후세에 전하리라 ...
            </Card.Text>
            <div className="d-flex align-items-center gap-2">
              <div className="border border-1">
                <img />
                <span className="small">119</span>
              </div>
              <div className="border border-1">
                <img />
                <span className="small">11</span>
              </div>
              <div className="border border-1">
                <img />
                <span className="small">경복궁</span>
              </div>
              <div className="border border-1">
                <img />!
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TalkDetail;
