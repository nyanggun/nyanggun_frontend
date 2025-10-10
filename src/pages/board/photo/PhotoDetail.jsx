//사진함 상세를 볼 수 있는 페이지 입니다.
import TalkDetail from "../../../components/board/TalkDetail";
const PhotoDetail = () => {
  const talks = {
    title: "제목",
    relatedHeritage: "경복궁",
    nickname: "사냥꾼1",
    createdAt: "2025-10-02T15:32:00",
  };
  return (
    <div>
      <TalkDetail talk={talks}></TalkDetail>
    </div>
  );
};

export default PhotoDetail;
