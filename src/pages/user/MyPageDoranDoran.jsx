import { useContext, useEffect, useRef, useState } from "react";
import "./MyPageDoranDoran.css";
import api from "../../config/apiConfig";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import TalkDetail from "../../components/board/TalkDetail";
import Comment from "../../components/comment/Comment";
import SubMenu from "../../components/common/submenu/SubMenu";
import { AuthContext } from "../../contexts/AuthContext";

const MyPageDoranDoran = () => {
    const userId = useParams();
    const userData = useContext(AuthContext);

    return (
        <div>
            <SubMenu
                menuOne={
                    userData.user?.id === Number(userId.id)
                        ? "내게시글"
                        : "작성 게시글"
                }
                menuOneLink={`/mypage/${userId.id}/dorandoran/post`}
                menuTwo={
                    userData.user?.id === Number(userId.id)
                        ? "내댓글"
                        : "작성 댓글"
                }
                menuTwoLink={`/mypage/${userId.id}/dorandoran/comment`}
                // userId가 로그인 유저와 같을 때만 책갈피 메뉴 보여주기
                menuThree={
                    userData.user?.id === Number(userId.id)
                        ? "책갈피"
                        : undefined
                }
                menuThreeLink={
                    userData.user?.id === Number(userId.id)
                        ? `/mypage/${userId.id}/dorandoran/bookmark`
                        : undefined
                }
            ></SubMenu>
            <div className="mypage-dorandoran-bottom"></div>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default MyPageDoranDoran;
