import React from "react";
import { Route, Routes } from "react-router-dom";

import ExplorationAndTalkPage from "./pages/board/ExplorationAndTalkPage";

import BadgeAcquisition from "./pages/badge/BadgeAcquisition";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/exploration-and-talk" element={<ExplorationAndTalkPage />} />
			</Routes>
		</>
	);
};

export default App;
