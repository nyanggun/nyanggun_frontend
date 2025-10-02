import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Paginations.css";

const Paginations = () => {
  return (
    <Pagination className="pagination-container">
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item active>{11}</Pagination.Item>
      <Pagination.Item>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
};

export default Paginations;
