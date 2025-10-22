import React from "react";
import { Outlet } from "react-router-dom";
import Subtitle from "../../components/board/Subtitle";
import Menu from "../../components/common/menu/Menu";
import { Row, Col } from "react-bootstrap";

const AdminPage = () => {
  return (
    <div>
      <Row className="row p-4 justify-content-center m-0  ">
        <Col xs={12} sm={10} md={6} className=" m-0 p-0">
          <Subtitle text="관리자페이지" />
        </Col>
      </Row>
      <div className="py-3">
        <Menu
          menuOne={"신고"}
          menuTwo={"회원"}
          menuOneLink={"/admin/reports"}
          menuTwoLink={"/admin/users"}
        ></Menu>
      </div>
      <main className="mt-3">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AdminPage;
