//탐방기와 담소 게시판 입니다.
import { useEffect, useState } from "react";
import Menu from "../../components/common/menu/Menu";
import "./ExplorationAndTalkPage.css";
import Subtitle from "../../components/board/Subtitle";
import TalkBoardList from "../../components/board/talk/talkBoardList";
import NavigationBar from "../../components/common/navigationbar/NavigationBar";
import TalkBoardDetail from "./TalkBoardDetail";

const ExplorationAndTalkPage = () => {
  //처음 페이지에서는 탐방기부터 보여줍니다.
  const [menuState, setMenuState] = useState({
    isMenuOneClick: true,
    isMenuTwoClick: false,
  });
  const [selectedTalkId, setSelectedTalkId] = useState(null);
  const handleMenuChange = (newState) => {
    setMenuState(newState);
    setSelectedTalkId(null);
  };
  return (
    <div>
      <div className="board-page">
        <div className="search-margin">
          <Subtitle text={"도란도란"}></Subtitle>
        </div>
      </div>

      <div className="menu-margin">
        <Menu
          menuOne={"문화재 탐방기"}
          menuTwo={"문화재 담소"}
          chooseMenu={handleMenuChange}
        ></Menu>
      </div>

      {menuState.isMenuOneClick ? (
        <div>탐방기 목록 입니다. 여기에서 탐방기를 불러오면 됩니다.</div>
      ) : selectedTalkId ? (
        <TalkBoardDetail talkId={selectedTalkId} />
      ) : (
        <TalkBoardList onSelectTalk={(id) => setSelectedTalkId(id)} />
      )}
    </div>
  );
};

export default ExplorationAndTalkPage;
