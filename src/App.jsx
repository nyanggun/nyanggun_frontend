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

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ChatbotButton from "./components/common/chatbot/ChatbotButton";
import LoginPage from "./pages/board/login-register/LoginPage";
import RegisterPage from "./pages/board/login-register/RegisterPage";
import PhotoPage from "./pages/board/photo/PhotoPage";
import PhotoNew from "./pages/board/photo/PhotoNew";
import PhotoDetail from "./pages/board/photo/PhotoDetail";
import NavigationBar from "./components/common/navigationbar/NavigationBar";

const App = () => {
	return (
		<>
			<AuthProvider>
				<Header />
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/dorandoran" element={<ExplorationAndTalkPage />}>
						<Route index element={<Navigate to="exploration" replace />} />
						<Route path="exploration" element={<ExplorationBoard />}></Route>
						<Route path="exploration/:id" element={<ExplorationDetailPage />} />
						<Route path="exploration/:id/edit" element={<ExplorationEdit />} />
						<Route path="exploration/new" element={<NewExploration></NewExploration>}></Route>
						<Route path="talks" element={<TalkBoardList></TalkBoardList>}></Route>
						<Route path="talks/detail/:talkId" element={<TalkBoardDetail></TalkBoardDetail>}></Route>
						<Route path="talks/new" element={<TalkNew></TalkNew>}></Route>
						<Route path="talks/update" element={<TalkUpdate></TalkUpdate>}></Route>
					</Route>
					<Route path="/photos" element={<PhotoPage></PhotoPage>}>
						<Route path="detail/:photoId" element={<PhotoDetail></PhotoDetail>}></Route>
						<Route path="new" element={<PhotoNew></PhotoNew>} />
					</Route>
				</Routes>
				<Footer />
				<NavigationBar></NavigationBar>
			</AuthProvider>
		</>
	);
};

export default App;
