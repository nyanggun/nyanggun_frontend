//탐방기와 담소 게시판 입니다.
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Menu from "../../components/common/menu/Menu";
import "./ExplorationAndTalkPage.css";
import Subtitle from "../../components/board/Subtitle";
import TalkBoardList from "./talk/TalkBoardList";
import NavigationBar from "../../components/common/navigationbar/NavigationBar";
import TalkBoardDetail from "./talk/TalkBoardDetail";
import ExplorationBoard from "./Exploration/ExplorationBoard";
import WritePostButton from "../../components/board/WritePostButton";

const ExplorationAndTalkPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState("");
    const isPostListPage =
        location.pathname === "/dorandoran/explorations" ||
        location.pathname === "/dorandoran/talks";

    //검색 함수 입니다.
    const handleSearch = (keyword) => {
        if (location.pathname.startsWith("/dorandoran/explorations")) {
            return;
        } else if (location.pathname.startsWith("/dorandoran/talks")) {
            //console.log("도란도란의 토크 페이지로 키워드 전달", keyword);
            setSearchKeyword(keyword);
            navigate(
                `/dorandoran/talks/search?keyword=${encodeURIComponent(
                    keyword
                )}`
            );
        }
    };
    return (
        <div>
            <div className="board-page">
                <div className="search-margin">
                    <Subtitle
                        text={"도란도란"}
                        onSearchBoard={handleSearch}
                    ></Subtitle>
                </div>
            </div>

            <div className="menu-margin">
                <Menu
                    menuOne={"문화재 탐방기"}
                    menuOneLink={"/dorandoran/explorations"}
                    menuTwoLink={"/dorandoran/talks"}
                    menuTwo={"문화재 담소"} /*chooseMenu={handleMenuChange}*/
                ></Menu>
            </div>
            {/* outlet을 적용한 코드 */}
            <main>
                <Outlet context={{ searchKeyword }} />
            </main>

            {isPostListPage && (
                <WritePostButton location={window.location.href} />
            )}
        </div>
    );
};

export default ExplorationAndTalkPage;
