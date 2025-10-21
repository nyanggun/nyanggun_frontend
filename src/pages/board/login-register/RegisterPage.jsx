// pages/RegisterPage.jsx
import React, { useState } from "react";
import { Form, Button, Card, Alert, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../config/apiConfig"; // 인터셉터가 설정된 axios 사용
import CertificationButton from "../../../components/board/CertificationButton";
import LoginInput from "../../../components/logininput/LoginInput";
import Menu from "../../../components/common/menu/Menu";
import SmileFace from "../../../assets/smile-face.svg";

const RegisterPage = () => {
	const navigate = useNavigate();

	// 폼 상태 관리
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		nickname: "",
		phoneNumber: "",
	});
	// 회원가입 결과 메세지 상태 관리
	const [message, setMessage] = useState({ text: "", type: "" });
	// ajax axios 로 API 서버에 회원가입 절차 진행중인지 여부를 상태 저장
	const [loading, setLoading] = useState(false);

	// 입력 변경 처리
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// 회원가입 처리 - apiConfig 사용
	const handleSubmit = async (e) => {
		setMessage({ text: "", type: "" }); // 가입 결과 보여주는 영역을 초기화
		setLoading(true);
		try {
			// api (axios interceptor 객체) 를 이용해 회원 가입 요청을 한다
			const response = await api.post("/api/members", formData);
			// 성공 메세지 표시
			if (response.data) {
				setMessage({
					text: "회원가입이 완료되었습니다. 로그인 페이지로 이동됩니다",
					type: "success",
				});
				// 3초 후에 로그인 페이지로 이동
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			}
		} catch (error) {
			console.error("회원 가입 실패", error);
			// ApiResponseDto 의 에러 메세지 활용
			const errorMessage = error.response?.data?.message || "회원가입에 실패했습니다";
			setMessage({
				text: errorMessage,
				type: "danger",
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="row justify-content-center m-0 p-0">
			<div className="justify-content-center d-flex align-items-center">
				<div className="" xs={1}>
					<Image src={SmileFace} />
				</div>
				<div className="">
					<h2 className=""></h2>
				</div>
			</div>
			<Menu
				menuOne={"로그인"}
				menuOneLink={"/login"}
				menuTwo={"회원가입"} /*chooseMenu={handleMenuChange}*/
				menuTwoLink={"/register"}
			></Menu>
			<div className="col-md-6 m-0 mt-4">
				<Card className="border-0 m-0">
					<Card.Body>
						{/* 메시지 표시 (성공/실패) */}
						{message.text && <Alert variant={message.type}>{message.text}</Alert>}

						<Form onSubmit={handleSubmit}>
							{/* 아이디 입력 */}
							<Form.Group className="mb-3">
								<LoginInput
									title="이메일"
									type="text"
									name="email"
									value={formData.email}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<LoginInput
									title="비밀번호"
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<LoginInput
									title="닉네임"
									type="text"
									name="nickname"
									value={formData.nickname}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<LoginInput
									title="전화번호"
									type="text"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
								/>
							</Form.Group>
							{/* 회원가입 버튼 */}
							<CertificationButton
								disabled={loading}
								text={loading ? "가입 중..." : "회원가입"}
								onClick={() => {
									handleSubmit();
								}}
							/>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default RegisterPage;
