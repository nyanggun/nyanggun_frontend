import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import ExplorationAndTalkPage from "./pages/board/ExplorationAndTalkPage";

import BadgeAcquisition from "./pages/badge/BadgeAcquisition";
import ExplorationBoard from "./pages/board/Exploration/ExplorationBoard";
import NewExploration from "./pages/board/NewExploration";
import TalkBoardList from "./pages/board/talk/TalkBoardList";
import TalkBoardDetail from "./pages/board/talk/TalkBoardDetail";
import TalkNew from "./pages/board/talk/TalkNew";
import TalkUpdate from "./pages/board/talk/TalkUpdate";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/dorandoran" element={<ExplorationAndTalkPage />}>
          {/* <Route index element={<Navigate to="exploration" replace />} /> */}
          <Route path="exploration" element={<ExplorationBoard />}></Route>
          <Route
            path="exploration/new"
            element={<NewExploration></NewExploration>}
          ></Route>
          <Route path="talks" element={<TalkBoardList></TalkBoardList>}></Route>
          <Route
            path="talks/detail/:talkId"
            element={<TalkBoardDetail></TalkBoardDetail>}
          ></Route>
          <Route path="talks/new" element={<TalkNew></TalkNew>}></Route>
          <Route
            path="talks/update"
            element={<TalkUpdate></TalkUpdate>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
