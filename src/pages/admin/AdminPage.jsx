import React from "react";
import { Outlet } from "react-router-dom";
import Subtitle from "../../components/board/Subtitle";
import Menu from "../../components/common/menu/Menu";

const AdminPage = () => {
	return (
		<div>
			<Subtitle text="관리자페이지" />
			<div className="py-3">
				<Menu
					menuOne={"신고"}
					menuTwo={"유저"}
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
