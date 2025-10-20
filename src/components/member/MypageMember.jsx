import React, { useContext, useState } from "react";
import "./MyPageMember.css";
import { AuthContext } from "../../contexts/AuthContext";
import BorderButton from "../board/BorderButton";

const MypageMember = ({ profileData, handleEditInfo, handleWithdrawal }) => {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    email: profileData.email || "",
    nickname: profileData.nickname || "",
    phoneNumber: profileData.phoneNumber || "",
    password: "",
    profileImage: null, // 이미지 업로드용
  });

  // 파일 선택
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  // 정보 저장
  const handleSave = () => {
    const formData = new FormData();
    formData.append("email", editData.email);
    formData.append("nickname", editData.nickname);
    formData.append("phoneNumber", editData.phoneNumber);
    if (editData.password) formData.append("password", editData.password);
    if (editData.profileImage)
      formData.append("profileImage", editData.profileImage);

    handleEditInfo(formData); // 부모로 FormData 전달
    setIsEditing(false);
    setEditData((prev) => ({ ...prev, password: "" }));
  };

  const handleWithdrawalClick = () => {
    const confirmed = window.confirm("정말 회원 탈퇴하시겠습니까?");
    if (confirmed) handleWithdrawal();
  };

  return (
    <div className="mypage-member-section">
      {/* 아바타 */}
      <div className="mypage-avatar">
        <img
          src={
            editData.profileImage
              ? URL.createObjectURL(editData.profileImage)
              : profileData.profileImagePath || "/assets/comment_profile.svg"
          }
          alt="프로필 이미지"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "8px" }}
          />
        )}
      </div>

      {/* 회원 정보 영역 */}
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

            {user?.id === profileData?.id && (
              <div className="mypage-action-buttons">
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
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mypage-edit-form">
              {/* 이메일 */}
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

              {/* 닉네임 */}
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

              {/* 전화번호 */}
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

              {/* 비밀번호 */}
              <div className="form-group d-flex align-items-center mb-2">
                <label style={{ width: "80px" }}>비밀번호</label>
                <input
                  type="password"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                  placeholder="비밀번호"
                />
              </div>

              {/* 저장/취소 버튼 */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default MypageMember;
