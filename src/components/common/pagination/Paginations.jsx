//페이지네이션 컴포넌트입니다.
import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Paginations.css";

//onPageChange : 현재 사용자가 무슨 페이지를 눌렀는지 부모 컴포넌트에 알리는 콜백함수입니다.
const Paginations = ({ currentPage, totalPage, onPageChange }) => {
  if (totalPage <= 1) return null;

  // 페이지 범위 계산
  const getPageNumbers = () => {
    const pages = [];

    if (totalPage < 5) {
      // 전체 페이지 수가 5 이하라면 전부 출력
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      const maxVisible = 5;
      const currentBlock = Math.floor(currentPage / maxVisible);
      let start = currentBlock * maxVisible + 1;
      let end = Math.min(start + maxVisible - 1, totalPage);

      // 항상 5개 유지되도록 조정
      if (end - start < 4) {
        if (start === 1) {
          end = 5;
        } else if (end === totalPage) {
          start = totalPage - 4;
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="pagination-container">
      {/* Prev 버튼 */}
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      />

      {/* 페이지 번호 */}
      {pageNumbers.map((num) => (
        <Pagination.Item
          key={num - 1}
          active={num - 1 === currentPage}
          onClick={() => onPageChange(num - 1)}
        >
          {num}
        </Pagination.Item>
      ))}

      {/* Next 버튼 */}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      />
    </Pagination>
  );
};

export default Paginations;
