import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import api from "../../config/apiConfig";

const UserListPage = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const loadUserList = async () => {
      try {
        const response = await api.get("/admin/members");
        console.log(response.data.data);
        setUserList(response.data.data);
      } catch (e) {
        console.error("유저 리스트 로딩 중 에러가 발생하였습니다", e);
      }
    };
    loadUserList();
  }, []);

  //시간 데이터(LocalDateTime)을 변환하여 1분 전 <-과 같은 형식으로 만들기
  //서버에서는 2025-10-02T15:32:00 로 받아올 때 사용 가능하다.
  const formatTimeAgo = (time) => {
    const now = new Date();
    const past = new Date(time); // 서버에서 받은 LocalDateTime 문자열
    const diff = Math.floor((now - past) / 1000); // 초 단위 차이

    if (diff < 60) return "방금 전";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  const navigate = useNavigate();
  const handleRowClick = (userId) => {
    navigate(`/mypage/${userId}`);
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={10} lg={10}>
        <table className="table">
          {/* 1. <thead>로 헤더 그룹화 */}
          <thead>
            <tr>
              <th>id</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>상태</th>
              <th>역할</th>
              <th>가입일시</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 ? (
              userList.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleRowClick(user.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.nickname}</td>
                  <td>
                    <span
                      style={{
                        color: user.state === "ACTIVE" ? "green" : "red",
                      }}
                    >
                      {user.state === "ACTIVE" ? "활동중" : "활동중지"}
                    </span>
                  </td>

                  <td>
                    {{
                      ROLE_USER: "일반회원",
                      ROLE_ADMIN: "관리자",
                    }[user.role] || ""}
                  </td>

                  <td>{formatTimeAgo(user.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">신고 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Col>
    </Row>
  );
};

export default UserListPage;
