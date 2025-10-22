import React, { useEffect, useState } from "react";
import "./HomeExploration.css";
import { Image } from "react-bootstrap";
import sampleImg from "../../assets/images/1.png";

//홈에 보이는 문화재 도감 입니다.
const HomeExploration = ({ exploration, onClick }) => {
  const [contentOrigin, setContentOrigin] = useState(exploration.content);
  const content = contentOrigin.replace(/<[^>]+>/g, "");

  //시간 데이터(LocalDateTime)을 변환하여 1분 전 <-과 같은 형식으로 만들기
  //서버에서는 2025-10-02T15:32:00 로 받아올 때 사용 가능하다.
  const [timeAgo, setTimeAgo] = useState("");

  const formatTimeAgo = (time) => {
    const now = new Date();
    const past = new Date(time); // 서버에서 받은 LocalDateTime 문자열
    const diff = Math.floor((now - past) / 1000); // 초 단위 차이

    if (diff < 60) return "방금 전";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };
  useEffect(() => {
    // 처음 렌더링 시 계산
    setTimeAgo(formatTimeAgo(exploration.createdAt));

    // 초 단위로 업데이트
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(exploration.createdAt));
    }, 1000); // 1초마다 갱신

    return () => clearInterval(interval);
  }, [exploration.createdAt]);
  return (
    <div className="home-exploration-container">
      <div className="home-exploration-img-box" onClick={onClick}>
        {/* 사진이 없는 탐방기이면 기본 이미지 띄우기 */}
        {exploration.imageNameList.length == 0 ? (
          <img src={sampleImg} className="home-exploration-img"></img>
        ) : (
          <img
            src={`http://localhost:8080/explorations/images/${exploration.imageNameList[0]}`}
            className="home-exploration-img"
          ></img>
        )}
      </div>

      <div className="home-exploration-text">
        <div className="home-exploraton-flex">
          <h4>{exploration.title}</h4>
          <h6 className="home-exploration-text-h6">{content}</h6>
          <h6>{timeAgo}</h6>
        </div>

        <div className="home-exploration-nickname">
          <Image
            src={`https://picsum.photos/400/300?random=${exploration.member.id}`}
            roundedCircle
            fluid
            className="talk-profile-pic-icon border "
          />
          <h6 className="home-exploration-nickname-h6">
            {exploration.member.nickname}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default HomeExploration;
