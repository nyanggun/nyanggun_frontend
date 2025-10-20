import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../config/apiConfig";
import { useNavigate } from "react-router-dom";
import MyPageMember from "../../components/member/MyPageMember";
import Menu from "../../components/common/menu/Menu";
import Subtitle from "../../components/board/Subtitle";
import "./MyPage.css";

const MyPage = () => {
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);

	// 상위 메뉴 상태
	const [activeSection, setActiveSection] = useState("게시글");

	// 하위 탭 상태
	const [activeTab, setActiveTab] = useState("책갈피");

	// 각 섹션별 탭 구성
	const tabsBySection = {
		게시글: ["책갈피", "내게시글", "내댓글"],
		사진함: ["내사진", "북마크사진", "댓글단사진"],
	};

	const tabs = tabsBySection[activeSection] || [];

	const getProfileData = useCallback(async () => {
		if (!user) {
			setLoading(false);
			return;
		}
		try {
			const response = await api.get(`/mypage`);
			setProfileData(response.data);
		} catch (error) {
			console.error("프로필 정보를 불러오는 중 오류:", error.message);
			setProfileData({
				email: user.email || "koreaculturehunters@gmail.com",
				nickname: user.nickname || "김대감",
				phoneNumber: "010-1234-5678",
				profileImagePath: "/assets/default_profile.svg",
				id: user.id,
			});
		} finally {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		if (user) getProfileData();
	}, [user, getProfileData]);

	const handleWithdrawal = async () => {
		if (!window.confirm("정말로 회원 탈퇴하시겠습니까?")) return;
		try {
			await api.delete("/mypage/leave");
			alert("회원 탈퇴가 완료되었습니다.");
			setUser(null);
			navigate("/");
		} catch (error) {
			console.error("회원 탈퇴 중 오류:", error.message);
			alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const handleEditInfo = async (updatedData) => {
		try {
			const response = await api.put("/mypage/profileupdate", updatedData);
			setProfileData(response.data);
			alert("회원 정보가 수정되었습니다.");
		} catch (error) {
			console.error("회원 정보 수정 중 오류:", error.message);
			alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const handleSearchBoard = (keyword) => {
		console.log(`[검색 실행] 섹션: ${activeSection}, 탭: ${activeTab}, 검색어: ${keyword}`);
	};

	if (loading) {
		return (
			<div className="mypage-container">
				<p style={{ textAlign: "center", padding: "50px" }}>프로필 정보를 불러오는 중입니다...</p>
			</div>
		);
	}

	if (!user || !profileData) {
		return (
			<div className="mypage-container">
				<p style={{ textAlign: "center", padding: "50px" }}>로그인 후 이용 가능합니다.</p>
				<div style={{ textAlign: "center" }}>
					<button onClick={() => navigate("/login")}>로그인 하러가기</button>
				</div>
			</div>
		);
	}

	return (
		<div className="mypage-container">
			{/* 상단 제목 및 검색창 */}
			<div className="mypage-header">
				<Subtitle text="내 정보" onSearchBoard={handleSearchBoard} />
			</div>

			{/* 프로필 정보 */}
			<MyPageMember
				profileData={profileData}
				handleEditInfo={handleEditInfo}
				handleWithdrawal={handleWithdrawal}
			/>

			{/* 상위 메뉴 */}
			<Menu
				menuOne="게시글"
				menuOneLink="#"
				menuTwo="사진함"
				menuTwoLink="#"
				chooseMenu={(section) => {
					setActiveSection(section);
					setActiveTab(tabsBySection[section][0]); // 섹션이 바뀌면 첫 번째 탭으로 초기화
				}}
			/>

			{/* 하위 탭 */}
			<div className="mypage-tabs d-flex justify-content-center gap-3 mt-3">
				{tabs.map((tab) => (
					<button
						key={tab}
						className={`menu-item ${activeTab === tab ? "active" : ""}`}
						onClick={() => setActiveTab(tab)}
						style={{
							padding: "5px 15px",
							fontWeight: "bold",
							cursor: "pointer",
							border: "none",
							background: "none",
						}}
					>
						{tab}
					</button>
				))}
			</div>

			{/* 콘텐츠 영역 */}
			<div className="mypage-content">
				{activeSection === "게시글" && (
					<>
						{activeTab === "책갈피" && (
							<div className="mypage-post-card">
								<h4>궁궐 갔다온 후기 전하노라</h4>
								<p>김대감 · 10시간 전</p>
								<img className="mypage-post-image" src="/assets/example_post.jpg" alt="게시글 이미지" />
								<p>나 김대감, 궁궐에 다녀왔다...</p>
							</div>
						)}
						{activeTab === "내게시글" && <div>내 게시글 목록</div>}
						{activeTab === "내댓글" && <div>내가 작성한 댓글 목록</div>}
					</>
				)}

				{activeSection === "사진함" && (
					<>
						{activeTab === "내사진" && (
							<div className="mypage-photo-grid">
								<img src="/assets/example_photo1.jpg" alt="사진1" />
								<img src="/assets/example_photo2.jpg" alt="사진2" />
								<img src="/assets/example_photo3.jpg" alt="사진3" />
							</div>
						)}
						{activeTab === "북마크사진" && <div>내가 북마크한 사진들</div>}
						{activeTab === "댓글단사진" && <div>내가 댓글 단 사진들</div>}
					</>
				)}
			</div>
		</div>
	);
};

export default MyPage;
