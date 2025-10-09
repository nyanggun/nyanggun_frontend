//사진함의 사진 리스트를 가져옵니다.
import "./PhotoList.css";
import { Row, Col } from "react-bootstrap";
import Img1 from "../../../assets/images/1.jpg";
import Img2 from "../../../assets/images/2.jpg";
import Img3 from "../../../assets/images/3.jpg";

const PhotoList = () => {
    return (
        <Row className="p-0 justify-content-center m-0">
            <Col xs={12} sm={10} md={6} className=" m-0 p-0">
                <div className="photos-img">
                    <img src="https://picsum.photos/400/300?random=1"></img>
                    <img src={Img1}></img>
                    <img src="https://picsum.photos/400/300?random=2"></img>
                    <img src={Img2}></img>
                    <img src="https://picsum.photos/400/300?random=3"></img>
                    <img src={Img3}></img>
                    <img src="https://picsum.photos/400/300?random=4"></img>
                </div>
            </Col>
        </Row>
    );
};
export default PhotoList;
