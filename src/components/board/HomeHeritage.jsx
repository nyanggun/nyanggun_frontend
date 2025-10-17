import React from "react";
import main from "../../assets/images/1.png";
import "./HomeHeritage.css";

//홈에 보이는 문화재 도감 입니다.
const HomeHeritage = () => {
    return (
        <div className="home-heritage-container">
            <img src={main} className="home-heritage-img"></img>
            <div>
                <h4>문화재 이름</h4>
                <h6>
                    문화재 설명을 적습니다.문화재 설명을 적습니다.문화재 설명을
                    적습니다.문화재 설명을 적습니다.문화재 설명을
                    적습니다.문화재 설명을 적습니다.
                </h6>
            </div>
        </div>
    );
};

export default HomeHeritage;
