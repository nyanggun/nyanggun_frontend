import "./HeritageEncyclopedia.css";
import Subtitle from "../../../components/board/Subtitle";
import Menu from "../../../components/common/menu/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HeritageEncyclopediaBoardList = () => {
  const navigate = useNavigate();

  const onSearch = (keyword) => {
    navigate(`/heritages/search?keyword=${keyword}`);
  };

  const isSearchPage = location.pathname.includes("heritages/search");
  return (
    <div>
      <div className="">
        <div className="d-flex justify-content-center">
          <div className="mb-4 w-50">
            <Subtitle
              moveTo={"/heritages/name"}
              text={"문화재 도감"}
              onSearchBoard={onSearch}
            />
          </div>
        </div>
        {!isSearchPage && (
          <Menu
            menuOne={"ㄱㄴㄷ순"}
            menuOneLink={"/heritages/name"}
            menuTwo={"인기순"}
            menuTwoLink={"/heritages/popular"}
          ></Menu>
        )}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HeritageEncyclopediaBoardList;
