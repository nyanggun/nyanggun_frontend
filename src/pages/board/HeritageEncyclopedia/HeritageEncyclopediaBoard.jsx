import "./HeritageEncyclopedia.css";
import Subtitle from "../../../components/board/Subtitle";
import Menu from "../../../components/common/menu/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const HeritageEncyclopediaBoardList = () => {
  const navigate = useNavigate();

  const onSearch = (keyword) => {
    navigate(`/heritages/search?keyword=${keyword}`);
  };

  const isSearchPage = location.pathname.includes("heritages/search");
  return (
    <div>
      <div className="">
        <div className="mb-3">
          <Subtitle
            moveTo={"/heritages/name"}
            text={"문화재 도감"}
            onSearchBoard={onSearch}
          />
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
