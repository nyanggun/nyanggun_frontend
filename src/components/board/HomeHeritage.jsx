import React from "react";
import main from "../../assets/images/1.png";
import bj from "../../assets/images/3.jpg";
import "./HomeHeritage.css";

//홈에 보이는 문화재 도감 입니다.
const HomeHeritage = ({ heritage, onClick }) => {
  return (
    <div className="home-heritage-container">
      <div className="home-heritage-img-box" onClick={onClick}>
        <img src={heritage.imageUrl} className="home-heritage-img"></img>
      </div>

      <div className="home-heritage-text">
        <h4>{heritage.name}</h4>
        <h6 className="home-heritage-text h6">{heritage.content}</h6>
        <h6>{heritage.period}</h6>
        <h6>{heritage.address}</h6>
      </div>
    </div>
  );
};

export default HomeHeritage;
