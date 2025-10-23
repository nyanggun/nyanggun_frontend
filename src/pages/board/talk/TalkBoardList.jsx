import { useContext, useEffect, useRef, useState } from "react";
import TalkDetail from "../../../components/board/TalkDetail";
import api from "../../../config/apiConfig";
import { useNavigate } from "react-router-dom";
import "./TalkBoardList.css";
import { AuthContext } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const TalkBoardList = () => {
  const userData = useContext(AuthContext);
  const [talkBoard, setTalkBoard] = useState([]);
  const navigate = useNavigate();
  const [isScrollLoading, setIsScrollLoading] = useState(false);

  // let cursor = null;
  // let hasNext = false;
  // ref를 사용하여 최신 값 유지
  const cursor = useRef(null);
  const hasNext = useRef(true);

  // 담소 게시글을 가져오는 메소드 입니다.
  const getTalkBoard = async () => {
    setIsScrollLoading(true);
    console.log("tempCursor: ", cursor);
    console.log("tempHasNext: ", hasNext);

    try {
      const response = await api.get("/talks", {
        params: { cursor: cursor.current },
      });

      const {
        contents,
        nextCursor,
        hasNext: hasNextFromServer,
      } = response.data.data;

      cursor.current = nextCursor;
      hasNext.current = hasNextFromServer;

      setTalkBoard((prev) => [
        ...prev,
        ...contents.filter(
          (item) => !prev.some((p) => p.talkId === item.talkId)
        ),
      ]);

      console.log("담소 게시글을 가져왔습니다.", response.data);
    } catch (error) {
      console.error(
        "담소 게시글을 가져오는 데 오류가 발생했습니다.",
        error.message
      );
    } finally {
      setTimeout(() => {
        setIsScrollLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    getTalkBoard();

    //스크롤이 끝에 도달했을 때 게시글 더 불러오기
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100 && hasNext.current) {
        getTalkBoard();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {talkBoard.length > 0 ? (
        <div>
          {talkBoard.map((talks) => (
            <TalkDetail
              key={talks.talkId}
              talk={talks}
              onClick={() => navigate(`detail/${talks.talkId}`)}
            />
          ))}
        </div>
      ) : (
        !isScrollLoading && (
          <div className="talk-list-none">
            <h3>담소 게시물이 없습니다.</h3>
          </div>
        )
      )}
      {isScrollLoading && (
        <div className="loading-overlay">
          <LoadingSpinner message="사진 불러오는 중..." />
        </div>
      )}
    </div>
  );
};

export default TalkBoardList;
