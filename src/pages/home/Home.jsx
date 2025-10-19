import React, { useContext, useEffect, useState } from "react";
import main from "../../assets/images/1.png";
import photo from "../../assets/images/2.png";
import bj from "../../assets/images/3.jpg";

import "./Home.css";
import HomeHeritage from "../../components/board/HomeHeritage";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../config/apiConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userData = useContext(AuthContext);
  const [heritageList, setHeritageList] = useState([]);
  const [photoBox, setPhotoBox] = useState([]);
  const navigate = useNavigate();

  //홈에서 문화재 도감을 가져오는 메소드 입니다.
  //북마크 순으로 4개의 도감을 가져옵니다.
  //만약 북마크가 없을 시 랜덤한 도감 4개를 가져옵니다.
  //만약 로그인을 했을 경우 해당 유저가 북마크한 정보를 바탕으로 문화재를 추천합니다.
  //현재는 로그인을 해도 북마크 순으로 문화재 정보를 띄워줍니다.
  const handleHeritage = async () => {
    try {
      const response = await api.get("/home/heritage");
      setHeritageList(response.data.data);

      console.log("문화재 정보를 북마크 순으로 가져왔습니다.", response.data);
    } catch (error) {
      console.log("문화재 정보를 가져오는 데 오류 발생");
    }
  };

  const goToHeritage = (heritage) => {
    navigate(`/heritages/detail/${heritage.id}`);
  };

  const handlePhotoBox = async () => {
    try {
      const response = await api.get("/home/photobox");
      setPhotoBox(response.data.data);
      console.log("사진함 정보를 가져왔습니다.", response.data.data);
    } catch (error) {
      console.log("사진함 정보를 가져오는 데 실패했습니다.", error);
    }
  };

  const goToPhotoBox = (photoBox) => {
    navigate(`/photobox/detail/${photoBox.id}`);
  };

  useEffect(() => {
    handleHeritage();
    handlePhotoBox();
  }, []);

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
          {heritageList && heritageList.length > 0 ? (
            heritageList.map((heritage, index) => (
              <HomeHeritage
                key={index}
                heritage={heritage}
                onClick={() => goToHeritage(heritage)}
              ></HomeHeritage>
            ))
          ) : (
            <div>북마크가 되어있는 도감이 없습니다.</div>
          )}
        </div>
      </div>

      <div className="home-event-next">
        <div className="home-heritage item1"></div>
        <div className="item2">
          <div
            className="home-event-box"
            onClick={() => goToPhotoBox(photoBox)}
          >
            {photoBox ? (
              <div>
                <div className="home-img-box">
                  <img
                    src={`http://localhost:8080${photoBox.photoBoxPicturePath}`}
                    className="home-img"
                  ></img>
                </div>
                <div className="home-event-title">
                  <div>
                    <h1>{photoBox.title}</h1>
                    {photoBox.tags && photoBox.tags.length > 0 ? (
                      photoBox.tags.map((tag, index) => (
                        <h4 key={index}>{tag}</h4>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>북마크된 사진함이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
