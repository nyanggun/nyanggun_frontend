import { Outlet, useParams } from "react-router-dom";
import SubMenu from "../../components/common/submenu/SubMenu";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const MyPagePhotoBox = () => {
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
                menuOneLink={`/mypage/${userId.id}/photobox/post`}
                // userId가 로그인 유저와 같을 때만 책갈피 메뉴 보여주기
                menuTwo={
                    userData.user?.id === Number(userId.id)
                        ? "책갈피"
                        : undefined
                }
                menuTwoLink={
                    userData.user?.id === Number(userId.id)
                        ? `/mypage/${userId.id}/photobox/bookmark`
                        : undefined
                }
            ></SubMenu>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default MyPagePhotoBox;
