import React from "react";
import main from "../../assets/images/1.png";
import photo from "../../assets/images/2.png";
import bj from "../../assets/images/3.jpg";

import "./Home.css";
import HomeHeritage from "../../components/board/HomeHeritage";

const Home = () => {
  return (
    <div className="home-main">
      <div className="home-event">
        <div className="home-event-box">
          <div className="home-img-box">
            <img src={main} className="home-img"></img>
          </div>

          <div className="home-event-title">
            <h1>경복궁 동물 사냥 이벤트</h1>
            <h4>
              5종의 동물을 모두 찾아<br></br>
              경복궁 동물 증표를 모아보세요!
            </h4>
            <h6>2025. 09. 23 ~ 2025. 10. 24</h6>
          </div>
        </div>

        <div className="home-heritage">
          <HomeHeritage></HomeHeritage>
          <div className="home-heritage-margin">
            <HomeHeritage></HomeHeritage>
          </div>

          <HomeHeritage></HomeHeritage>
          <div className="home-heritage-margin">
            <HomeHeritage></HomeHeritage>
          </div>
        </div>
      </div>

      <div className="home-event-next">
        <div className="home-heritage item1">
          <HomeHeritage></HomeHeritage>
          <div className="home-heritage-margin">
            <HomeHeritage></HomeHeritage>
          </div>

          <HomeHeritage></HomeHeritage>
          <div className="home-heritage-margin">
            <HomeHeritage></HomeHeritage>
          </div>
        </div>
        <div className="item2">
          <div className="home-event-box">
            <div className="home-img-box">
              <img src={photo} className="home-img"></img>
            </div>
            <div className="home-event-title">
              <h1>금동미륵보살반가사유상</h1>
              <h4>#국보 #반가사유상 #미륵불</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
