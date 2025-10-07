import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import ExplorationAndTalkPage from "./pages/board/ExplorationAndTalkPage";

import BadgeAcquisition from "./pages/badge/BadgeAcquisition";
import ExplorationBoard from "./pages/board/Exploration/ExplorationBoard";
import NewExploration from "./pages/board/NewExploration";
import TalkBoardList from "./pages/board/talk/TalkBoardList";
import TalkBoardDetail from "./pages/board/talk/TalkBoardDetail";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/dorandoran" element={<ExplorationAndTalkPage />}>
                    {/* <Route index element={<Navigate to="exploration" replace />} /> */}
                    <Route
                        path="exploration"
                        element={<ExplorationBoard />}
                    ></Route>
                    <Route
                        path="exploration/new"
                        element={<NewExploration></NewExploration>}
                    ></Route>
                    <Route
                        path="talks"
                        element={<TalkBoardList></TalkBoardList>}
                    ></Route>
                    <Route
                        path="talks/detail/:talkId"
                        element={<TalkBoardDetail></TalkBoardDetail>}
                    ></Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
