// src/components/member/MypageMember.jsx
import React, { useEffect, useState } from "react";
import BorderButton from "../board/BorderButton";
import "./MyPageMember.css";

/**
 * Props:
 * - profileData: 조회된 사용자 정보 (id, email, nickname, phoneNumber, profileImagePath, role 등)
 * - handleEditInfo(formData): 부모로 FormData 전송 -> 서버에 multipart/form-data PUT 요청
 * - handleWithdrawal(): 부모에서 탈퇴 처리
 * - handleSanction(targetId): 부모에서 관리자 제재 처리
 * - currentUser: 현재 로그인 사용자 객체 (id, role 등)
 */
const MypageMember = ({
  profileData,
  handleEditInfo,
  handleWithdrawal,
  handleSanction,
  currentUser,
}) => {
  // 현재 로그인 사용자
  const user = currentUser;

  // 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false);

  // 로컬 편집 폼 상태 (비밀번호 확인 포함)
  const [editData, setEditData] = useState({
    email: profileData.email || "",
    nickname: profileData.nickname || "",
    phoneNumber: profileData.phoneNumber || "",
    password: "",
    passwordConfirm: "",
    profileImageFile: null,
  });

  // profileData 바뀌면 폼 리셋
  useEffect(() => {
    setEditData({
      email: profileData.email || "",
      nickname: profileData.nickname || "",
      phoneNumber: profileData.phoneNumber || "",
      password: "",
      passwordConfirm: "",
      profileImageFile: null,
    });
    setIsEditing(false);
  }, [profileData]);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setEditData((p) => ({ ...p, profileImageFile: file }));
  };

  // 저장: 비밀번호 확인 검사, FormData 구성 후 부모 핸들러 호출
  const handleSave = () => {
    // 비밀번호가 입력되었을 때 확인 값 비교
    if (editData.password || editData.passwordConfirm) {
      if (editData.password !== editData.passwordConfirm) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      }
    }

    const formData = new FormData();

    // 1. DTO 객체 생성
    const memberDto = {
      email: editData.email,
      nickname: editData.nickname,
      phoneNumber: editData.phoneNumber,
    };

    if (editData.password) memberDto.password = editData.password;

    // JSON Blob으로 추가
    formData.append(
      "dto",
      new Blob([JSON.stringify(memberDto)], { type: "application/json" })
    );

    // 프로필 이미지 파일 추가
    if (editData.profileImageFile) {
      formData.append("profileImage", editData.profileImageFile);
    }

    // 부모 컴포넌트의 handleEditInfo 함수를 호출하여 FormData를 서버로 전송합니다.
    handleEditInfo(formData);
    console.log(formData);

    // UI 상태 초기화
    setIsEditing(false);
    setEditData((p) => ({ ...p, password: "", passwordConfirm: "" }));
  };

  // 회원탈퇴(본인만)
  const onWithdrawClick = () => {
    if (!user || user.id !== profileData.id) {
      alert("본인만 탈퇴할 수 있습니다.");
      return;
    }
    if (window.confirm("정말 회원 탈퇴하시겠습니까?")) {
      handleWithdrawal();
    }
  };

  // 관리자 제재: 관리자만 보이게, 타인 계정에만(자기 자신 제재 불가)
  const onSanctionClick = () => {
    if (!user || user.role !== "ROLE_ADMIN") {
      alert("관리자 권한이 필요합니다.");
      return;
    }
    if (user.id === profileData.id) {
      alert("자기 자신을 제재할 수 없습니다.");
      return;
    }
    if (
      window.confirm(
        `${profileData.nickname} (${profileData.id}) 을 제재하시겠습니까?`
      )
    ) {
      handleSanction(profileData.id);
    }
  };

  const isOwner = user?.id === profileData?.id;
  const isAdminViewingOther = user?.role === "ROLE_ADMIN" && !isOwner;
  console.log(profileData.profileImagePath);

  return (
    <div className="mypage-member-section">
      {/* Avatar */}
      <div className="mypage-avatar">
        <img src={profileData.profileImagePath} alt="프로필" />
        {isEditing && isOwner && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mypage-file-input"
          />
        )}
      </div>

      {/* Info area */}
      <div className="mypage-info-area">
        {!isEditing ? (
          <>
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

            <div className="mypage-action-buttons">
              {/* 본인이면 수정/탈퇴 노출 */}
              {isOwner && (
                <>
                  <BorderButton
                    btnName="정보수정"
                    clickBtn={() => setIsEditing(true)}
                    buttonColor="black"
                  />
                  <BorderButton
                    btnName="회원탈퇴"
                    clickBtn={onWithdrawClick}
                    buttonColor="red"
                  />
                </>
              )}

              {/* 관리자(타인 조회시) 제재 버튼 */}
              {isAdminViewingOther && (
                <BorderButton
                  btnName="사용자 제재"
                  clickBtn={onSanctionClick}
                  buttonColor="red"
                />
              )}
            </div>
          </>
        ) : (
          // 편집 폼 (본인만)
          isOwner && (
            <div className="mypage-edit-form">
              {/* 이메일은 수정 불가(비활성)로 표시 */}
              <div className="form-group d-flex align-items-center mb-2">
                <label style={{ width: 80 }}>이메일</label>
                <input type="text" value={editData.email} disabled />
              </div>

              <div className="form-group d-flex align-items-center mb-2">
                <label style={{ width: 80 }}>닉네임</label>
                <input
                  type="text"
                  value={editData.nickname}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, nickname: e.target.value }))
                  }
                />
              </div>

              <div className="form-group d-flex align-items-center mb-2">
                <label style={{ width: 80 }}>전화번호</label>
                <input
                  type="text"
                  value={editData.phoneNumber}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, phoneNumber: e.target.value }))
                  }
                />
              </div>

              <div className="form-group d-flex align-items-center mb-2">
                <label style={{ width: 80 }}>비밀번호</label>
                <input
                  type="password"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData((p) => ({ ...p, password: e.target.value }))
                  }
                  placeholder="변경 시에만 입력"
                />
              </div>

              <div className="form-group d-flex align-items-center mb-2">
                <label style={{ width: 80 }}>비밀번호 확인</label>
                <input
                  type="password"
                  value={editData.passwordConfirm}
                  onChange={(e) =>
                    setEditData((p) => ({
                      ...p,
                      passwordConfirm: e.target.value,
                    }))
                  }
                  placeholder="다시 입력"
                />
              </div>

              <div className="mypage-form-buttons d-flex gap-2 justify-content-end mt-3">
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
