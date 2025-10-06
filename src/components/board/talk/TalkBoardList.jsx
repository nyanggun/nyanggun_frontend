import axios from "axios";
import { useEffect, useState } from "react";
import TalkDetail from "../TalkDetail";

const TalkBoardList = ({ onSelectTalk }) => {
  const [talkBoard, setTalkBoard] = useState([]);

  // 담소 게시글을 가져오는 api
  const getTalkBoard = async () => {
    try {
      const response = await axios.get("http://localhost:8080/talks");
      setTalkBoard(response.data.data);
      console.log("담소 게시글을 가져왔습니다.", response.data);
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
      {talkBoard.map((talks) => (
        <TalkDetail
          key={talks.talkId}
          talk={talks}
          onClick={() => onSelectTalk(talks.talkId)}
        />
      ))}
    </div>
  );
};

export default TalkBoardList;
