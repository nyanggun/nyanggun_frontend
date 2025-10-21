// MyPage.jsx
import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom"; 

import MyPageMember from "../../components/member/MyPageMember"; 
import Menu from "../../components/common/menu/Menu";
import Subtitle from "../../components/board/Subtitle";
import commentProfile from "../../assets/comment-profile.svg";
import "./MyPage.css"; 

const MyPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId } = useParams(); 
  const targetId = userId || (user ? user.id : null);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 상위 메뉴 / 하위 탭 상태
  const [activeSection, setActiveSection] = useState("도란도란");
  const [activeTab, setActiveTab] = useState("책갈피");

  // 사진함 상태
  const [myPhotos, setMyPhotos] = useState([]);
  const [bookmarkedPhotos, setBookmarkedPhotos] = useState([]);
  const [commentedPhotos, setCommentedPhotos] = useState([]);

  // ---------------- API ----------------
  const getProfileData = useCallback(async () => {
    if (!targetId) { setLoading(false); return; }
    try {
      const response = await api.get(`/mypage/${targetId}`);
      setProfileData({
        ...response.data,
        profileImagePath: response.data.profileImagePath || commentProfile,
      });
    } catch (error) {
      console.error("프로필 정보를 불러오는 중 오류:", error.message);
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  }, [targetId]);

  useEffect(() => { if (targetId) getProfileData(); }, [targetId, getProfileData]);

  // 사진함 데이터
  const fetchPhotoData = useCallback(async () => {
    if (!targetId) return;
    try {
      const [myRes, bookmarkRes, commentRes] = await Promise.all([
        api.get(`/mypage/${targetId}/photos`),
        api.get(`/mypage/${targetId}/photos/bookmarked`),
        api.get(`/mypage/${targetId}/photos/commented`),
      ]);
      setMyPhotos(myRes.data || []);
      setBookmarkedPhotos(bookmarkRes.data || []);
      setCommentedPhotos(commentRes.data || []);
    } catch (error) {
      console.error("사진 데이터 로딩 실패:", error.message);
    }
  }, [targetId]);

  useEffect(() => {
    if (activeSection === "사진함" && targetId) fetchPhotoData();
  }, [activeSection, targetId, fetchPhotoData]);

  // ---------------- 핸들러 ----------------
  const handleWithdrawal = async () => {
    if (!user || user.id !== profileData.id) return;
    if (!window.confirm("정말 회원 탈퇴하시겠습니까?")) return;
    try {
      await api.delete(`/mypage/${user.id}/leave`);
      alert("회원 탈퇴가 완료되었습니다.");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 중 오류:", error.message);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  const handleSanction = async (targetUserId) => {
    if (!user || user.role !== 'ROLE_ADMIN' || user.id === targetUserId) return;
    if (!window.confirm(`사용자 ID ${targetUserId}을 제재하시겠습니까?`)) return;

    try {
      const reason = prompt("제재 사유를 입력하세요:");
      if (!reason) { alert("사유 입력이 필요합니다."); return; }
      await api.post(`/admin/users/${targetUserId}/sanction`, { reason });
      alert(`사용자 ID ${targetUserId} 제재 완료`);
      getProfileData();
    } catch (error) {
      console.error("사용자 제재 중 오류:", error.message);
      alert("제재 실패. 관리자 권한 및 백엔드 확인 필요.");
    }
  };

  const handleEditInfo = async (formData) => {
    if (!user || user.id !== profileData.id) return;
    try {
      const response = await api.put(`/mypage/${user.id}/profileupdate`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfileData({
        ...response.data,
        profileImagePath: response.data.profileImagePath || profileData.profileImagePath || commentProfile,
      });
      setUser(prev => ({
        ...prev,
        nickname: response.data.nickname,
        profileImagePath: response.data.profileImagePath
      }));
      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error("회원 정보 수정 실패:", error.message);
      alert("정보 수정에 실패했습니다.");
    }
  };

  // ---------------- 렌더링 ----------------
  if (loading) return <p style={{ textAlign: "center", padding: "50px" }}>프로필 정보를 불러오는 중입니다...</p>;
  if (!profileData) return <p style={{ textAlign: "center", padding: "50px" }}>조회할 프로필 정보가 없습니다.</p>;

  // 사진함 콘텐츠 렌더러
  const renderPhotoContent = () => {
    let data = [];
    if (activeTab === "내사진") data = myPhotos;
    else if (activeTab === "북마크사진") data = bookmarkedPhotos;
    else if (activeTab === "댓글단사진") data = commentedPhotos;

    if (!data || data.length === 0)
      return <p style={{ textAlign: "center", padding: "20px" }}>게시글이 없습니다.</p>;

    return (
      <div className="mypage-photo-grid">
        {data.map(photo => (
          <img
            key={photo.id}
            src={photo.imagePath}
            alt={photo.title || ""}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/photobox/detail/${photo.id}`)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mypage-container">
      <div className="mypage-header" style={{ margin: "40px 0" }}>
        <Subtitle 
          text={user && user.id === profileData.id ? "내 정보" : `${profileData.nickname}님의 정보`} 
          showIcon={true} 
          showSearch={false} 
        />
      </div>

      <MyPageMember
        profileData={profileData}
        handleEditInfo={handleEditInfo}
        handleWithdrawal={handleWithdrawal}
        handleSanction={handleSanction}
        currentUser={user}
      />

      <Menu
        menuOne="도란도란"
        menuTwo="사진함"
        menuThree="도감"
        activeSection={activeSection}
        chooseMenu={(section) => {
          setActiveSection(section);
          setActiveTab(section === "사진함" ? "내사진" : "책갈피");
        }}
      />

      {/* 하위 탭 */}
      <div className="mypage-tabs d-flex justify-content-center gap-3 mt-3">
        {activeSection === "도란도란" && ["책갈피","내게시글","내댓글"].map(tab => (
          <button
            key={tab}
            className={`menu-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >{tab}</button>
        ))}
        {activeSection === "사진함" && ["내사진","북마크사진","댓글단사진"].map(tab => (
          <button
            key={tab}
            className={`menu-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >{tab}</button>
        ))}
        {activeSection === "도감" && ["책갈피"].map(tab => (
          <button
            key={tab}
            className={`menu-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >{tab}</button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mypage-content">
        {activeSection === "도란도란" && activeTab === "책갈피" && profileData.bookmarkedPosts?.length > 0 &&
          profileData.bookmarkedPosts.map(item => (
            <div key={item.id} className="mypage-post-card" onClick={() => navigate(`/dorandoran/explorations/${item.id}`)}>
              {item.title || item.content}
            </div>
        ))}

        {activeSection === "사진함" && renderPhotoContent()}

        {activeSection === "도감" && activeTab === "책갈피" && profileData.bookmarkedHeritages?.length > 0 &&
          profileData.bookmarkedHeritages.map(item => (
            <div key={item.id} className="mypage-post-card" onClick={() => navigate(`/heritages/detail/${item.id}`)}>
              {item.name || item.title}
            </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
