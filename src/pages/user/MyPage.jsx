// MyPage.jsx
import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import MyPageMember from "../../components/member/MypageMember";
import Menu from "../../components/common/menu/Menu";
import Subtitle from "../../components/board/Subtitle";
import commentProfile from "../../assets/comment-profile.svg";
import "./MyPage.css";

const MyPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("도란도란");
  const [activeTab, setActiveTab] = useState("책갈피");

  const [myPhotos, setMyPhotos] = useState([]);
  const [bookmarkedPhotos, setBookmarkedPhotos] = useState([]);
  const [commentedPhotos, setCommentedPhotos] = useState([]);

  // ---------------- 리다이렉트 처리 ----------------
  useEffect(() => {
    //   if (!id) {
    //     // 로그인 안 되어 있으면 로그인 페이지로 이동
    //     navigate("/login");
    //     return;
    //   }

    // id가 없으면 본인 페이지로 이동
    if (!id && user?.id) {
      navigate(`/mypage/${user.id}`, { replace: true });
    }
    // id가 있으면 그대로 사용 → 다른 유저 페이지 가능
  }, [id, user, navigate]);

  // ---------------- API ----------------
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await api.get(`/mypage/${id}`);
        setProfileData({
          ...response.data,
          profileImagePath: response.data.profileImagePath || commentProfile,
        });
        console.log(response.data);
      } catch (error) {
        console.error("프로필 정보를 불러오는 중 오류:", error.message);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, [id]);

  // ---------------- 핸들러 ----------------
  const handleWithdrawal = async () => {
    if (!user || user.id !== profileData.id) return;
    if (!window.confirm("정말 회원 탈퇴하시겠습니까?")) return;
    try {
      await api.delete(`/mypage/${id}/delete`);
      alert("회원 탈퇴가 완료되었습니다.");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 중 오류:", error.message);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };
  // ---------------- 사진함 API ----------------
  const fetchPhotoData = useCallback(async () => {
    if (!id) return;
    try {
      const [myRes, bookmarkRes, commentRes] = await Promise.all([
        api.get(`/mypage/${id}/photos`),
        api.get(`/mypage/${id}/photos/bookmarked`),
        api.get(`/mypage/${id}/photos/commented`),
      ]);
      setMyPhotos(myRes.data || []);
      setBookmarkedPhotos(bookmarkRes.data || []);
      setCommentedPhotos(commentRes.data || []);
    } catch (error) {
      console.error("사진 데이터 로딩 실패:", error.message);
    }
  }, [id]);

  useEffect(() => {
    if (activeSection === "사진함" && id) fetchPhotoData();
  }, [activeSection, id, fetchPhotoData]);

  // const handleSanction = async (targetUserId) => {
  //   if (!user || user.role !== "ROLE_ADMIN" || user.id === targetUserId) return;
  //   if (!window.confirm(`사용자 ID ${targetUserId}을 제재하시겠습니까?`))
  //     return;

  //   try {
  //     const reason = prompt("제재 사유를 입력하세요:");
  //     if (!reason) {
  //       alert("사유 입력이 필요합니다.");
  //       return;
  //     }
  //     await api.post(`/admin/users/${targetUserId}/sanction`, { reason });
  //     alert(`사용자 ID ${targetUserId} 제재 완료`);
  //     loadProfileData();
  //   } catch (error) {
  //     console.error("사용자 제재 중 오류:", error.message);
  //     alert("제재 실패. 관리자 권한 및 백엔드 확인 필요.");
  //   }
  // };

  const handleEditInfo = async (formData) => {
    if (!user || user.id !== profileData.id) return; // 1. ID 유효성 검사 로직
    if (!id || id === "undefined" || isNaN(Number(id))) {
      console.error("멤버 ID가 유효하지 않아 요청을 중단합니다:", id);
      alert("회원 정보를 가져올 수 없습니다. 다시 시도해 주세요.");
      return;
    }

    try {
      // API 호출
      const response = await api.patch(
        `/mypage/${id}/profileupdate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ); // 2. 캐시 무력화 로직 (새로 추가됨)
      const newImagePath = response.data.profileImagePath;
      const cacheBustedPath = newImagePath
        ? `${newImagePath}?t=${Date.now()}`
        : profileData.profileImagePath || commentProfile;

      setProfileData(() => ({
        ...response.data,
        profileImagePath: cacheBustedPath,
      })); // setUser에 캐시 무력화 경로 적용

      setUser((prev) => ({
        ...prev,
        nickname: response.data.nickname,
        profileImagePath: cacheBustedPath,
      }));

      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error("회원 정보 수정 실패:", error.message);
      alert("정보 수정에 실패했습니다.");
    }
  };

  // ---------------- 렌더링 ----------------
  if (loading)
    return (
      <p style={{ textAlign: "center", padding: "50px" }}>
        프로필 정보를 불러오는 중입니다...
      </p>
    );
  if (!profileData)
    return (
      <p style={{ textAlign: "center", padding: "50px" }}>
        조회할 프로필 정보가 없습니다.
      </p>
    );

  const renderPhotoContent = () => {
    let data = [];
    if (activeTab === "내사진") data = myPhotos;
    else if (activeTab === "북마크사진") data = bookmarkedPhotos;
    else if (activeTab === "댓글단사진") data = commentedPhotos;

    if (!data || data.length === 0)
      return (
        <p style={{ textAlign: "center", padding: "20px" }}>
          게시글이 없습니다.
        </p>
      );

    return (
      <div className="mypage-photo-grid">
        {data.map((photo) => (
          <img
            key={photo.id}
            src={photo.profileImagePath}
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
          text={
            user && user.id === profileData.id
              ? "내 정보"
              : `${profileData.nickname}님의 정보`
          }
          showIcon={true}
          showSearch={false}
        />
      </div>

      <MyPageMember
        profileData={profileData}
        handleEditInfo={handleEditInfo}
        handleWithdrawal={handleWithdrawal}
        // handleSanction={handleSanction}
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

      <div className="mypage-tabs d-flex justify-content-center gap-3 mt-3">
        {activeSection === "도란도란" &&
          ["책갈피", "내게시글", "내댓글"].map((tab) => (
            <button
              key={tab}
              className={`menu-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        {activeSection === "사진함" &&
          ["내사진", "북마크사진", "댓글단사진"].map((tab) => (
            <button
              key={tab}
              className={`menu-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        {activeSection === "도감" &&
          ["책갈피"].map((tab) => (
            <button
              key={tab}
              className={`menu-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
      </div>

      <div className="mypage-content">
        {activeSection === "도란도란" &&
          activeTab === "책갈피" &&
          profileData.bookmarkedPosts?.length > 0 &&
          profileData.bookmarkedPosts.map((item) => (
            <div
              key={item.id}
              className="mypage-post-card"
              onClick={() => navigate(`/dorandoran/explorations/${item.id}`)}
            >
              {item.title || item.content}
            </div>
          ))}

        {activeSection === "사진함" && renderPhotoContent()}

        {activeSection === "도감" &&
          activeTab === "책갈피" &&
          profileData.bookmarkedHeritages?.length > 0 &&
          profileData.bookmarkedHeritages.map((item) => (
            <div
              key={item.id}
              className="mypage-post-card"
              onClick={() => navigate(`/heritages/detail/${item.id}`)}
            >
              {item.name || item.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyPage;
