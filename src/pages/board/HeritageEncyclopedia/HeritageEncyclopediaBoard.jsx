import "./HeritageEncyclopedia.css";
import Subtitle from "../../../components/board/Subtitle";
import Menu from "../../../components/common/menu/Menu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const HeritageEncyclopediaBoardList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const linkToPage =
    location.pathname === "/heritages/name" ||
    location.pathname === "/heritages/popular";

  const onSearch = () => {};

  return (
    <div>
      <div className="">
        <div className="mb-3">
          <Subtitle text={"문화재 도감"} onSearchBoard={onSearch} />
        </div>
        <Menu
          menuOne={"ㄱㄴㄷ순"}
          menuOneLink={"/"}
          menuTwoLink={"/"}
          menuTwo={"인기순"}
        ></Menu>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HeritageEncyclopediaBoardList;
