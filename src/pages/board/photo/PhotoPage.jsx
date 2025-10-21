//사진함 페이지 입니다.
import Subtitle from "../../../components/board/Subtitle";
import Menu from "../../../components/common/menu/Menu";
import { Row, Col } from "react-bootstrap";
import "./PhotoPage.css";
import WritePostButton from "../../../components/board/WritePostButton";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PhotoList from "./PhotoList";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const PhotoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPostListPage = location.pathname === "/photobox/list";
  const userData = useContext(AuthContext);
  const handleSearch = (keyword, cursor = null) => {
    navigate(
      `/photobox/search?keyword=${encodeURIComponent(keyword)}&cursor=${cursor}`
    );
  };
  return (
    <div>
      <div className="photo-container">
        <div className="photo-search-margin">
          <Subtitle text={"사진함"} onSearchBoard={handleSearch}></Subtitle>
        </div>
      </div>
      <div className="photo-menu-margin">
        <Menu></Menu>
      </div>

      <div>
        <Outlet></Outlet>
      </div>
      {isPostListPage && userData.user?.id ? (
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
