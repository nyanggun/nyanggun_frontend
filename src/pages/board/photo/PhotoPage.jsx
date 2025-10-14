//사진함 페이지 입니다.
import Subtitle from "../../../components/board/Subtitle";
import Menu from "../../../components/common/menu/Menu";
import { Row, Col } from "react-bootstrap";
import "./PhotoPage.css";
import WritePostButton from "../../../components/board/WritePostButton";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PhotoList from "./PhotoList";

const PhotoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isPostListPage = location.pathname === "/photobox/list";
    const handleSearch = (keyword) => {
        navigate(`/photobox/search?keyword=${encodeURIComponent(keyword)}`);
    };
    return (
        <div>
            <div className="photo-container">
                <div className="photo-search-margin">
                    <Subtitle
                        text={"사진함"}
                        onSearchBoard={handleSearch}
                    ></Subtitle>
                </div>
            </div>
            <div className="photo-menu-margin">
                <Menu></Menu>
            </div>

            <div>
                <Outlet></Outlet>
            </div>
            {isPostListPage ? (
                <div>
                    <WritePostButton location="/photobox"></WritePostButton>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default PhotoPage;
