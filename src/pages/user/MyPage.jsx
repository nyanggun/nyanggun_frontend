import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../config/apiConfig";
import { useNavigate } from "react-router-dom";
import MyPageMember from "../../components/member/MyPageMember";
import Menu from "../../components/common/menu/Menu";
import Subtitle from "../../components/board/Subtitle"; // 기존 Subtitle 유지
import commentProfile from "../../assets/comment-profile.svg";
import "./MyPage.css";

const MyPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 상위 메뉴 상태
  const [activeSection, setActiveSection] = useState("게시글");
  const [activeTab, setActiveTab] = useState("책갈피");

  const tabsBySection = {
    게시글: ["책갈피", "내게시글", "내댓글"],
    사진함: ["내사진", "북마크사진", "댓글단사진"],
    도감: ["책갈피"],
  };

  const tabs = tabsBySection[activeSection] || [];

  // 사진함 데이터 상태
  const [myPhotos, setMyPhotos] = useState([]);
  const [bookmarkedPhotos, setBookmarkedPhotos] = useState([]);
  const [commentedPhotos, setCommentedPhotos] = useState([]);

  // 프로필 데이터 가져오기
  const getProfileData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(`/mypage/${user.id}`);
      // API에서 이미지가 없으면 기본 이미지 사용
      setProfileData({
        ...response.data,
        profileImagePath: response.data.profileImagePath || commentProfile,
      });
    } catch (error) {
      console.error("프로필 정보를 불러오는 중 오류:", error.message);
      setProfileData({
        email: user.email || "koreaculturehunters@gmail.com",
        nickname: user.nickname || "김대감",
        phoneNumber: "010-1234-5678",
        profileImagePath: commentProfile,
        id: user.id,
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) getProfileData();
  }, [user, getProfileData]);

  // 사진함 데이터 가져오기
  const fetchPhotoData = async () => {
    if (!user) return;
    try {
      const [myRes, bookmarkRes, commentRes] = await Promise.all([
        api.get(`/mypage/${user.id}/photos`),
        api.get(`/mypage/${user.id}/photos/bookmarked`),
        api.get(`/mypage/${user.id}/photos/commented`),
      ]);
      setMyPhotos(myRes.data);
      setBookmarkedPhotos(bookmarkRes.data);
      setCommentedPhotos(commentRes.data);
    } catch (error) {
      console.error("사진 데이터 로딩 실패:", error.message);
    }
  };

  useEffect(() => {
    if (activeSection === "사진함") {
      fetchPhotoData();
    }
  }, [activeSection]);

  // 회원 탈퇴
  const handleWithdrawal = async () => {
    if (!window.confirm("정말로 회원 탈퇴하시겠습니까?")) return;
    try {
      await api.delete(`/mypage/${user.id}/leave`);
      alert("회원 탈퇴가 완료되었습니다.");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 중 오류:", error.message);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 회원 정보 수정
  const handleEditInfo = async (formData) => {
    try {
      const response = await api.put(
        `/mypage/${user.id}/profileupdate`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProfileData({
        ...response.data,
        profileImagePath:
          response.data.profileImagePath ||
          profileData.profileImagePath ||
          commentProfile,
      });
      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error("회원 정보 수정 중 오류:", error.message);
      alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return (
      <div className="mypage-container">
        <p style={{ textAlign: "center", padding: "50px" }}>
          프로필 정보를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (!user || !profileData) {
    return (
      <div className="mypage-container">
        <p style={{ textAlign: "center", padding: "50px" }}>
          로그인 후 이용 가능합니다.
        </p>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("/login")}>로그인 하러가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      {/* 상단 제목 중앙 정렬, 기존 Subtitle과 SVG 유지 */}
      <div className="mypage-header" style={{ margin: "40px 0" }}>
        <Subtitle text="내 정보" showIcon={true} showSearch={false} />
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
        menuTwo="사진함"
        menuThree="도감"
        chooseMenu={(section) => {
          setActiveSection(section);
          setActiveTab(tabsBySection[section][0]);
        }}
      />

      {/* 하위 탭 */}
      <div className="mypage-tabs d-flex justify-content-center gap-3 mt-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`menu-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mypage-content">
        {activeSection === "게시글" && (
          <>
            {activeTab === "책갈피" && <div>책갈피 게시글 목록</div>}
            {activeTab === "내게시글" && <div>내 게시글 목록</div>}
            {activeTab === "내댓글" && <div>내 댓글 목록</div>}
          </>
        )}

        {activeSection === "사진함" && (
          <>
            {activeTab === "내사진" && (
              <div className="mypage-photo-grid">
                {myPhotos.map((photo) => (
                  <img key={photo.id} src={photo.imagePath} alt={photo.title} />
                ))}
              </div>
            )}
            {activeTab === "북마크사진" && (
              <div className="mypage-photo-grid">
                {bookmarkedPhotos.map((photo) => (
                  <img key={photo.id} src={photo.imagePath} alt={photo.title} />
                ))}
              </div>
            )}
            {activeTab === "댓글단사진" && (
              <div className="mypage-photo-grid">
                {commentedPhotos.map((photo) => (
                  <img key={photo.id} src={photo.imagePath} alt={photo.title} />
                ))}
              </div>
            )}
          </>
        )}

        {activeSection === "도감" && activeTab === "책갈피" && (
          <div>도감 책갈피 목록</div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
