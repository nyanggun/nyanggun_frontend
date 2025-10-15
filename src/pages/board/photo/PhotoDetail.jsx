//사진함 상세를 볼 수 있는 페이지 입니다.
import { useNavigate, useParams } from "react-router-dom";
import TalkDetail from "../../../components/board/TalkDetail";
import api from "../../../config/apiConfig";
import { useEffect, useState } from "react";
import PhotoList from "./PhotoList";
const PhotoDetail = () => {
  const navigate = useNavigate();
  const [photoBoard, setPhotoBoard] = useState(null);
  const { photoId } = useParams(); // URL의 :id 값을 id로 추출

  const onUpdatePhoto = () => {
    navigate(`/photobox/update`, {
      state: {
        photoId: photoId,
        title: photoBoard.title,
        relatedHeritage: photoBoard.relatedHeritage,
        photoBoxPicturePath: photoBoard.photoBoxPicturePath,
        tags: photoBoard.tags,
      },
    });
  };

  //사진함 게시글을 삭제하는 메소드 입니다.
  const onDeletePhoto = async () => {
    try {
      const response = await api.delete(`/photobox/detail/${photoId}`);
      alert("게시글을 삭제했습니다.");
      navigate("/photobox");
    } catch (error) {
      console.log(
        "사진함 게시글을 삭제하는 중에 오류가 발생했습니다.",
        error.message
      );
    }
  };

  //사진함 게시글 상세를 불러오는 메소드 입니다.
  const getPhotoDetail = async () => {
    try {
      const response = await api.get(`/photobox/${photoId}`);
      setPhotoBoard(response.data.data);

      console.log("사진함 상세 게시글을 불러왔습니다.", response);
    } catch (error) {
      console.log(
        "사진함 상세 게시글을 불러오는 중에 오류가 발생했습니다.",
        error.message
      );
    }
  };
  useEffect(() => {
    getPhotoDetail();
  }, []);

  //게시글을 북마크하는 메소드 입니다.
  //만약 북마크를 이미 한 상태이면 북마크를 해제합니다.
  const onClickBookmark = async () => {
    //북마크 상태 확인 : 북마크 한 상태인 경우 북마크 해제 (delete)
    if (photoBoard.bookmarked) {
      try {
        const response = await api.delete(`/photobox/bookmark/${photoId}`);
        alert("북마크를 취소했습니다.");
        getPhotoDetail();
      } catch (error) {
        console.log("북마크를 취소하는 중 오류 발생", error.message);
      }
    } else {
      //북마크 상태 확인 : 북마크 안한 상태인 경우 북마크 (post)
      try {
        const response = await api.post(`/photobox/bookmark/${photoId}`);
        alert("북마크했습니다.");
        getPhotoDetail();
      } catch (error) {
        console.log("북마크를 등록하는 중 오류 발생", error.message);
      }
    }
  };

  return (
    <div>
      {photoBoard ? (
        <TalkDetail
          talk={photoBoard}
          onUpdateTalk={onUpdatePhoto}
          onDeleteTalk={onDeletePhoto}
          onBookmark={onClickBookmark}
        />
      ) : (
        <p>로딩중...</p>
      )}
      <PhotoList></PhotoList>
    </div>
  );
};

export default PhotoDetail;
