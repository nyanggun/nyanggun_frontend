import { useContext, useEffect, useRef, useState } from "react";
import TalkDetail from "../../../components/board/TalkDetail";
import api from "../../../config/apiConfig";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import "./TalkBoardList.css";
import { AuthContext } from "../../../contexts/AuthContext";

const TalkSearchResult = () => {
  // let cursor = null;
  // let hasNext = false;
  // ref를 사용하여 최신 값 유지
  const cursor = useRef(null);
  const hasNext = useRef(true);
  const userData = useContext(AuthContext);
  const [talkBoard, setTalkBoard] = useState([]);
  const navigate = useNavigate();
  const [searchKeyword] = useSearchParams();
  const keyword = searchKeyword.get("keyword");

  // 담소 게시글 검색 결과를 가져오는 메소드 입니다.
  const handleTalkBoardResult = async () => {
    console.log("tempCursor: ", cursor);
    console.log("tempHasNext: ", hasNext);

    try {
      const response = await api.get("/talks/search", {
        params: { keyword: keyword, cursor: cursor.current },
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
    }
  };
  useEffect(() => {
    handleTalkBoardResult();

    //스크롤이 끝에 도달했을 때 게시글 더 불러오기
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100 && hasNext.current) {
        handleTalkBoardResult();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //키워드가 변경되면 재검색, 기존 데이터 제거
  useEffect(() => {
    setTalkBoard([]); // 기존 결과 제거
    cursor.current = null; // 커서 초기화
    hasNext.current = true; // 다음 페이지 가능 여부 초기화
    handleTalkBoardResult();
  }, [keyword]);

  return (
    <div>
      {talkBoard.length > 0 ? (
        <div>
          {talkBoard.map((talks) => (
            <TalkDetail
              key={talks.talkId}
              talk={talks}
              onClick={() =>
                navigate(`/dorandoran/talks/detail/${talks.talkId}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="talk-list-none">
          <h3>검색 결과가 없습니다.</h3>
        </div>
      )}
    </div>
  );
};

export default TalkSearchResult;
