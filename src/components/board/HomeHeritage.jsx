import React from "react";
import main from "../../assets/images/1.png";
import bj from "../../assets/images/3.jpg";
import "./HomeHeritage.css";

//홈에 보이는 문화재 도감 입니다.
const HomeHeritage = () => {
  return (
    <div className="home-heritage-container">
      <div className="home-heritage-img-box">
        <img src={bj} className="home-heritage-img"></img>
      </div>

      <div className="home-heritage-text">
        <h4>문화재 이름</h4>
        <h6 className="home-heritage-text h6">
          문화재 설명을 적습니다.문화재 설명을 적습니다.문화재 설명을
          적습니다.문화재 설명을 적습니다.문화재 설명을 적습니다.문화재 설명을
          적습니다.문화재 설명을 적습니다.문화재 설명을 적습니다.문화재 설명을
          적습니다.문화재 설명을 적습니다.문화재 설명을 적습니다.문화재 설명을
          적습니다.
        </h6>
        <h6>연도 입니다.</h6>
        <h6>위치 정보 입니다.</h6>
      </div>
    </div>
  );
};

export default HomeHeritage;
