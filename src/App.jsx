import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthProvider";
import ExplorationAndTalkPage from "./pages/board/ExplorationAndTalkPage";

import BadgeAcquisition from "./pages/badge/BadgeAcquisition";
import ExplorationBoard from "./pages/board/Exploration/ExplorationBoard";
import ExplorationDetailPage from "./pages/board/Exploration/ExplorationDetailPage";
import ExplorationEdit from "./pages/board/Exploration/ExplorationEdit";
import NewExploration from "./pages/board/Exploration/NewExploration";
import TalkBoardList from "./pages/board/talk/TalkBoardList";
import TalkBoardDetail from "./pages/board/talk/TalkBoardDetail";
import TalkNew from "./pages/board/talk/TalkNew";
import TalkUpdate from "./pages/board/talk/TalkUpdate";
import TalkSearchResult from "./pages/board/talk/TalkSearchResult";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ChatbotButton from "./components/common/chatbot/ChatbotButton";
import LoginPage from "./pages/board/login-register/LoginPage";
import RegisterPage from "./pages/board/login-register/RegisterPage";
import PhotoPage from "./pages/board/photo/PhotoPage";
import PhotoNew from "./pages/board/photo/PhotoNew";
import PhotoDetail from "./pages/board/photo/PhotoDetail";
import NavigationBar from "./components/common/navigationbar/NavigationBar";
import PhotoList from "./pages/board/photo/PhotoList";
import Logout from "./pages/board/login-register/Logout";
import PhotoUpdate from "./pages/board/photo/PhotoUpdate";
import HeritageEncyclopediaBoardList from "./pages/board/HeritageEncyclopedia/HeritageEncyclopediaBoardList";
import HeritageEncyclopediaDetail from "./pages/board/HeritageEncyclopedia/HeritageEncyclopediaDetail";
import PhotoSearchResult from "./pages/board/photo/PhotoSearchResult";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dorandoran" element={<ExplorationAndTalkPage />}>
            <Route index element={<Navigate to="explorations" replace />} />
            <Route path="explorations" element={<ExplorationBoard />}></Route>
            <Route
              path="explorations/:id"
              element={<ExplorationDetailPage />}
            />
            <Route path="explorations/:id/edit" element={<ExplorationEdit />} />
            <Route
              path="explorations/new"
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
            <Route path="talks/new" element={<TalkNew></TalkNew>}></Route>
            <Route
              path="talks/update"
              element={<TalkUpdate></TalkUpdate>}
            ></Route>
            <Route
              path="talks/search"
              element={<TalkSearchResult></TalkSearchResult>}
            />
          </Route>
          <Route>
            <Route
              path="/heritages"
              element={<HeritageEncyclopediaBoardList />}
            />
            <Route
              path="/heritages/detail/:HeritageEncyclopediaId"
              element={<HeritageEncyclopediaDetail />}
            />
          </Route>
          <Route
            path="badges"
            element={<BadgeAcquisition></BadgeAcquisition>}
          />
          <Route path="/photobox" element={<PhotoPage></PhotoPage>}>
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<PhotoList></PhotoList>}></Route>
            <Route
              path="detail/:photoId"
              element={<PhotoDetail></PhotoDetail>}
            ></Route>
            <Route path="new" element={<PhotoNew></PhotoNew>} />
            <Route path="update" element={<PhotoUpdate></PhotoUpdate>} />
            <Route
              path="search"
              element={<PhotoSearchResult></PhotoSearchResult>}
            />
          </Route>
        </Routes>
        <Footer />
        <NavigationBar></NavigationBar>
        <ChatbotButton />
      </AuthProvider>
    </>
  );
};

export default App;
