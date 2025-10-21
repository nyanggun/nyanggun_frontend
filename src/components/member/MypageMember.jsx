import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import "./MyPageMember.css";
import BorderButton from "../board/BorderButton";
import { AuthContext } from "../../contexts/AuthContext"; // 로그인 사용자 정보를 가져오기 위한 Context

const MypageMember = ({ 
    profileData,           // 조회할 회원 정보
    handleEditInfo,        // 정보 수정 API 호출 함수
    handleWithdrawal,      // 회원 탈퇴 API 호출 함수
    handleSanction         // 관리자 제재 API 호출 함수
}) => {
    // 현재 로그인 사용자 정보 가져오기
    const { user } = useContext(AuthContext);

    // 수정 모드 상태 관리
    const [isEditing, setIsEditing] = useState(false);

    // 수정 폼 데이터 상태
    const [editData, setEditData] = useState({
        email: profileData.email || "",
        nickname: profileData.nickname || "",
        phoneNumber: profileData.phoneNumber || "",
        password: "",       // 새 비밀번호 (변경 시 입력)
        profileImage: null, // 이미지 업로드용 File 객체
    });

    // profileData가 바뀔 때마다 editData 초기화
    useEffect(() => {
        setEditData({
            email: profileData.email || "",
            nickname: profileData.nickname || "",
            phoneNumber: profileData.phoneNumber || "",
            password: "",
            profileImage: null,
        });
        setIsEditing(false); // 기본 모드는 정보 표시 모드
    }, [profileData]);

    // ------------------ 파일 선택 ------------------
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 선택한 파일을 상태에 저장
            setEditData((prev) => ({ ...prev, profileImage: file }));
        }
    };

    // ------------------ 정보 저장 ------------------
    const handleSave = () => {
        const formData = new FormData();
        formData.append("email", editData.email);
        formData.append("nickname", editData.nickname);
        formData.append("phoneNumber", editData.phoneNumber);
        if (editData.password) formData.append("password", editData.password);
        if (editData.profileImage) formData.append("profileImage", editData.profileImage);

        // 부모 컴포넌트로 FormData 전달
        handleEditInfo(formData);

        // 수정 완료 후 상태 초기화
        setIsEditing(false);
        setEditData((prev) => ({ ...prev, password: "" })); // 비밀번호 초기화
    };

    // ------------------ 회원 탈퇴 ------------------
    const handleWithdrawalClick = () => {
        const confirmed = window.confirm("정말 회원 탈퇴하시겠습니까?");
        if (confirmed) handleWithdrawal(); // 탈퇴 API 호출
    };

    // ------------------ 관리자 제재 ------------------
    const handleSanctionClick = () => {
        handleSanction(profileData.id); // 제재 API 호출
    };

    // ------------------ 권한 체크 ------------------
    const isOwner = user?.id === profileData?.id;                     // 본인 계정인지
    const isViewingOtherUserAsAdmin = user?.role === "ROLE_ADMIN" && !isOwner; // 관리자 권한 & 타인 계정

    return (
        <div className="mypage-member-section">
            {/* ------------------ 아바타 영역 ------------------ */}
            <div className="mypage-avatar">
                <img
                    src={
                        isEditing && editData.profileImage
                            ? URL.createObjectURL(editData.profileImage) // 수정 중 새 이미지 미리보기
                            : profileData.profileImagePath || "/assets/comment-profile.svg" // 기본 이미지
                    }
                    alt="프로필 이미지"
                />
                {isEditing && isOwner && ( // 본인이 수정 모드일 때만 파일 업로드 input 표시
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginTop: "8px" }}
                    />
                )}
            </div>

            {/* ------------------ 회원 정보 영역 ------------------ */}
            <div className="mypage-info-area">
                {!isEditing ? (
                    <>
                        {/* -------- 정보 표시 모드 -------- */}
                        <div className="mypage-info-list">
                            <p>
                                <strong>이메일</strong>{" "}
                                {profileData.email || "등록된 이메일 없음"}
                            </p>
                            <p>
                                <strong>닉네임</strong> {profileData.nickname || "사용자"}
                            </p>
                            <p>
                                <strong>전화번호</strong>{" "}
                                {profileData.phoneNumber || "등록된 번호 없음"}
                            </p>
                        </div>

                        {/* -------- 버튼 영역 -------- */}
                        <div className="mypage-action-buttons">
                            {/* 본인일 경우: 정보 수정 / 회원 탈퇴 버튼 */}
                            {isOwner && (
                                <>
                                    <BorderButton
                                        btnName="정보수정"
                                        clickBtn={() => setIsEditing(true)}
                                        buttonColor="black"
                                    />
                                    <BorderButton
                                        btnName="회원탈퇴"
                                        clickBtn={handleWithdrawalClick}
                                        buttonColor="red"
                                    />
                                </>
                            )}

                            {/* 관리자이며 타인 계정일 경우: 사용자 제재 버튼 */}
                            {isViewingOtherUserAsAdmin && (
                                <BorderButton
                                    btnName="사용자 제재"
                                    clickBtn={handleSanctionClick}
                                    buttonColor="red"
                                />
                            )}
                        </div>
                    </>
                ) : (
                    // -------- 수정 모드 --------
                    isOwner && (
                        <div className="mypage-edit-form">
                            <div className="form-group d-flex align-items-center mb-2">
                                <label style={{ width: "80px" }}>이메일</label>
                                <input
                                    type="text"
                                    value={editData.email}
                                    onChange={(e) =>
                                        setEditData({ ...editData, email: e.target.value })
                                    }
                                    placeholder="이메일"
                                />
                            </div>
                            <div className="form-group d-flex align-items-center mb-2">
                                <label style={{ width: "80px" }}>닉네임</label>
                                <input
                                    type="text"
                                    value={editData.nickname}
                                    onChange={(e) =>
                                        setEditData({ ...editData, nickname: e.target.value })
                                    }
                                    placeholder="닉네임"
                                />
                            </div>
                            <div className="form-group d-flex align-items-center mb-2">
                                <label style={{ width: "80px" }}>전화번호</label>
                                <input
                                    type="text"
                                    value={editData.phoneNumber}
                                    onChange={(e) =>
                                        setEditData({ ...editData, phoneNumber: e.target.value })
                                    }
                                    placeholder="전화번호"
                                />
                            </div>
                            <div className="form-group d-flex align-items-center mb-2">
                                <label style={{ width: "80px" }}>비밀번호</label>
                                <input
                                    type="password"
                                    value={editData.password}
                                    onChange={(e) =>
                                        setEditData({ ...editData, password: e.target.value })
                                    }
                                    placeholder="새 비밀번호 (변경 시에만 입력)"
                                />
                            </div>

                            {/* 저장 / 취소 버튼 */}
                            <div className="mypage-form-buttons d-flex gap-2 justify-content-start mt-3">
                                <BorderButton
                                    btnName="저장"
                                    clickBtn={handleSave}
                                    buttonColor="green"
                                />
                                <BorderButton
                                    btnName="취소"
                                    clickBtn={() => setIsEditing(false)}
                                    buttonColor="gray"
                                />
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default MypageMember;
