import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const Logout = () => {
	const navigate = useNavigate();

	const { logout } = useContext(AuthContext);

	const LogoutNavigateHome = () => {
		logout();
		navigate("/");
	};
	return <>{LogoutNavigateHome()}</>;
};

export default Logout;
