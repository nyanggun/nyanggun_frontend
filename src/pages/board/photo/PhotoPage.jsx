//사진함 페이지 입니다.
import Subtitle from "../../../components/board/Subtitle";
import Menu from "../../../components/common/menu/Menu";
import { Row, Col } from "react-bootstrap";
import "./PhotoPage.css";
import WritePostButton from "../../../components/board/WritePostButton";
import { Outlet } from "react-router-dom";
import PhotoList from "./PhotoList";

const PhotoPage = () => {
    return (
        <div>
            <div className="photo-container">
                <div className="photo-search-margin">
                    <Subtitle text={"사진함"}></Subtitle>
                </div>
            </div>
            <div className="photo-menu-margin">
                <Menu></Menu>
            </div>
       
           <div>
            <Outlet></Outlet>
           </div>
            <div>
                <WritePostButton location="/photobox"></WritePostButton>
            </div>
        </div>
    );
};

export default PhotoPage;
