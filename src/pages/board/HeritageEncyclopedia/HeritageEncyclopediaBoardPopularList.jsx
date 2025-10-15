import React, { useState, useEffect } from "react";
import { Row, Col, Image, Pagination } from "react-bootstrap";
import "./HeritageEncyclopedia.css";
import Subtitle from "../../../components/board/Subtitle";
import EncyclopediaEventListColumn from "../../../components/board/EncyclopediaEventListColumn";
import Paginations from "../../../components/common/pagination/Paginations";
import api from "../../../config/apiConfig";
import Menu from "../../../components/common/menu/Menu";
import { Link } from "react-router-dom";

const HeritageEncyclopediaBoardList = () => {
  const [page, setPage] = useState(0);
  const [list, setList] = useState({ content: [] });

  const fetchHeritageEncyclopedia = async (page) => {
    try {
      const response = await api.get(`/heritages/list/name?page=${page}`);
      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      console.log("도감 페이지 오류 : ", error);
    }
  };

  useEffect(() => {
    fetchHeritageEncyclopedia(page);
  }, [page]);

  const onSearch = () => {};

  return (
    <Row className="h-100 justify-content-center align-items-center m-0">
      <Col xs={12} sm={10} md={8} lg={6}>
        <div>
          {list.content.map((heritage) => (
            <EncyclopediaEventListColumn
              key={heritage.id}
              heritage={heritage}
            />
          ))}
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
