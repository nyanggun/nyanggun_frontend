//탐방기와 담소 게시판 입니다.
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "../../components/common/menu/Menu";
import "./ExplorationAndTalkPage.css";
import Subtitle from "../../components/board/Subtitle";
import TalkBoardList from "./talk/TalkBoardList";
import NavigationBar from "../../components/common/navigationbar/NavigationBar";
import TalkBoardDetail from "./talk/TalkBoardDetail";
import ExplorationBoard from "./Exploration/ExplorationBoard";
import WritePostButton from "../../components/board/WritePostButton";

const ExplorationAndTalkPage = () => {
	// 처음 페이지에서는 탐방기부터 보여줍니다. -> 주석처리 : ReactRouterDom의 <Outlet>을 사용하여 하위 URL로 표현
	// const [menuState, setMenuState] = useState({
	// 	isMenuOneClick: true,
	// 	isMenuTwoClick: false,
	// });
	// const [selectedTalkId, setSelectedTalkId] = useState(null);
	// const handleMenuChange = (newState) => {
	// 	setMenuState(newState);
	// 	setSelectedTalkId(null);
	// };

	// const writePostButtonProps =
	// const useEffect(()=>{

	// }, [isMenuOneClick])

	const location = useLocation();
	const isPostListPage = location.pathname === "/dorandoran/exploration" || location.pathname === "/dorandoran/talks";

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
					menuOneLink={"/dorandoran/exploration"}
					menuTwoLink={"/dorandoran/talks"}
					menuTwo={"문화재 담소"} /*chooseMenu={handleMenuChange}*/
				></Menu>
			</div>
			{/* outlet을 적용한 코드 */}
			<main>
				<Outlet />
			</main>

			{isPostListPage && <WritePostButton location={window.location.href} />}
		</div>
	);
};

export default ExplorationAndTalkPage;
