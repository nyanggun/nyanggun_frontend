import React, { useState, useEffect } from "react";
import { Row, Col, Image, Pagination } from "react-bootstrap";
import "./HeritageEncyclopedia.css";
import "../../../components/common/menu/Menu.css";
import Subtitle from "../../../components/board/Subtitle";
import EncyclopediaEventListColumn from "../../../components/board/EncyclopediaEventListColumn";
import Paginations from "../../../components/common/pagination/Paginations";
import api from "../../../config/apiConfig";
import Menu from "../../../components/common/menu/Menu";
import { Link, useLocation } from "react-router-dom";

const HeritageEncyclopediaBoardList = () => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [list, setList] = useState({ content: [] });

  const keyword = new URLSearchParams(location.search).get("keyword");

  const fetchHeritageEncyclopedia = async (page) => {
    try {
      const response = await api.get(
        `/heritages/search?keyword=${keyword}&page=${page}`
      );
      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      console.log("도감 검색 오류 : ", error);
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchHeritageEncyclopedia(page);
    }
  }, [page, keyword]);

  return (
    <Row className="h-100 justify-content-center align-items-center m-0">
      <Col xs={12} sm={10} md={8} lg={6}>
        <div className="text-center">
          <h3>"{keyword}" 검색 결과</h3>
        </div>
        <div className="menu-lines">
          <hr className="line green"></hr>
          <hr className="line white"></hr>
          <hr className="line red"></hr>
        </div>
        <div>
          {list.content && list.content.length > 0 ? (
            list.content.map((heritage) => (
              <EncyclopediaEventListColumn
                key={heritage.id}
                heritage={heritage}
              />
            ))
          ) : (
            <div className="text-center my-5 text-muted">
              <span>검색 결과가 없습니다.</span>
            </div>
          )}
        </div>
        <div>
          <Paginations
            currentPage={page}
            totalPage={list?.totalPages || 0}
            onPageChange={setPage}
          />
        </div>
      </Col>
    </Row>
  );
};

export default HeritageEncyclopediaBoardList;
