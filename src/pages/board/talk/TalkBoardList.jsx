import { useContext, useEffect, useState } from "react";
import TalkDetail from "../../../components/board/TalkDetail";
import api from "../../../config/apiConfig";
import { useNavigate } from "react-router-dom";
import "./TalkBoardList.css";
import { AuthContext } from "../../../contexts/AuthContext";

const TalkBoardList = () => {
  const { user, setUser } = useContext(AuthContext);
  const [talkBoard, setTalkBoard] = useState([]);
  const navigate = useNavigate();
  // 담소 게시글을 가져오는 api
  const getTalkBoard = async () => {
    try {
      const response = await api.get("/talks");
      //내림차순으로 정렬합니다.
      const sortedData = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTalkBoard(sortedData);
      console.log("담소 게시글을 가져왔습니다.", response.data);
      console.log("유저 정보 확인 : ", user);
    } catch (error) {
      console.error(
        "담소 게시글을 가져오는 데 오류가 발생했습니다.",
        error.message
      );
    }
  };

  useEffect(() => {
    getTalkBoard();
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
        <div className="talk-list-none">
          <h3>담소 게시물이 없습니다.</h3>
        </div>
      )}
    </div>
  );
};

export default TalkBoardList;
