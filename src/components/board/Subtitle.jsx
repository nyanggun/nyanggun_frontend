import React, { useState } from "react";
import { Row, Col, Form, Image } from "react-bootstrap";
import SmileFace from "../../assets/smile-face.svg";
import FindImage from "../../assets/find.svg";
import "./Subtitle.css";
const Subtitle = ({ text, onSearchBoard }) => {
    const [keyword, setKeyword] = useState("");
    const handleClick = () => {
        console.log("Subtitle 클릭됨");
        if (keyword.trim() && onSearchBoard) {
            onSearchBoard(keyword.trim());
        }
    };

    return (
        <div>
            <div className="justify-content-center d-flex align-items-center">
                <div className="" xs={1}>
                    <Image src={SmileFace} />
                </div>
                <div className="">
                    <h2 className="">{text}</h2>
                </div>
            </div>
            <Row className="justify-content-center p-0 m-0">
                <Col
                    className="d-flex justify-content-center align-items-center m-0 rounded-5 border border-dark"
                    xs={9}
                >
                    <Form.Control
                        className="form-input-container"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // 기본 submit 방지
                                handleClick();
                            }
                        }}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Image as="Button" src={FindImage} onClick={handleClick} />
                </Col>
            </Row>
        </div>
    );
};

export default Subtitle;
