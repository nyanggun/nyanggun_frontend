import React from "react";
import { Form } from "react-bootstrap";
import "./LoginInput.css";
const LoginInput = ({ title, placeholder, type, name, value, onChange }) => {
	return (
		<div>
			<div>
				<div className="Login-input-group">
					<div className="Login-title">
						<div>{title}</div>
					</div>
					<Form.Control
						placeholder={placeholder}
						className="Login-input form-control no-focus"
						type={type}
						name={name}
						value={value}
						onChange={onChange}
					></Form.Control>
				</div>
			</div>
		</div>
	);
};

export default LoginInput;
