//담소 게시글 상세 화면 입니다.
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TalkDetail from "../../../components/board/TalkDetail";
import Comment from "../../../components/comment/Comment";
import CommentInput from "../../../components/comment/CommentInput";
import "./TalkBoardDetail.css";
import api from "../../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

//대댓글 처리 메소드
//서버에서 댓글 목록들을 불러온 후 계층 구조로 변환합니다.
// 평탄한 댓글 배열 → 계층 구조로 변환
const organizeComments = (comments) => {
  const commentMap = {};
  const topLevel = [];

  // 최신순 정렬 (createdAt 내림차순)
  comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  comments.forEach((c) => {
    c.replies = [];
    commentMap[c.talkCommentId] = c;
  });

  comments.forEach((c) => {
    if (c.talkParentCommentId) {
      const parent = commentMap[c.talkParentCommentId];
      if (parent) parent.replies.push(c);
    } else {
      topLevel.push(c);
    }
  });

  //각 부모 댓글의 대댓글은 오래된 순 (createdAt 오름차순)
  topLevel.forEach((parent) => {
    parent.replies.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  });

  return topLevel;
};

//담소 게시글의 내용을 가져오는 메소드 입니다.
const TalkBoardDetail = () => {
  const userData = useContext(AuthContext);
  const navigate = useNavigate();
  const [talkBoard, setTalkBoard] = useState(null);
  const [talkBoardComment, setTalkBoardComment] = useState([]);
  //대댓글의 상태를 기억함
  const [activeParentCommentId, setActiveParentCommentId] = useState(null);
  const { talkId } = useParams(); // URL의 :id 값을 id로 추출
  const getTalkBoard = async () => {
    if (!talkId) return;

    try {
      const response = await api.get(`/talks/${talkId}`);
      setTalkBoard(response.data.data);

      // 댓글 구조화
      const organizedComments = organizeComments(response.data.data.comments);

      setTalkBoardComment(organizedComments);
      console.log("담소 게시글 상세를 가져왔습니다.", response.data);
    } catch (error) {
      console.error(
        "담소 게시글 상세를 가져오는 데 오류가 발생했습니다.",
        error.message
      );
    }
  };

  useEffect(() => {
    getTalkBoard();
  }, [talkId]);

  //담소를 수정하는 메소드 입니다.

  const handleUpdateTalk = () => {
    navigate(`/dorandoran/talks/update`, {
      state: {
        talkId: talkBoard.talkId,
        title: talkBoard.title,
        content: talkBoard.content,
        talkPictureList: talkBoard.talkPictureList,
      },
    });
  };

  //담소를 삭제하는 메소드 입니다.
  const handleDeleteTalk = async () => {
    try {
      await api.delete(`/talks/${talkId}`, {
        talkId,
      });
      console.log("담소 게시글 삭제 완료");
      alert("게시글이 삭제되었습니다.");
      navigate(`/dorandoran/talks`);
    } catch (error) {
      console.log("담소 게시글 삭제에 문제가 생겼습니다", error.message);
    }
  };

  //담소 댓글을 전송하는 메소드 입니다.
  //대대댓글은 없고, 대댓글에 댓글을 달려고 하면 처음 댓글의 대댓글로 들어가게 됩니다.
  const handleCommentSubmit = async (content, parentCommentId = null) => {
    if (!content.trim()) return;

    try {
      const response = await api.post(`/talks/${talkId}/comments`, {
        talkId,
        memberId: userData.user.id,
        content,
        parentCommentId,
      });
      // 댓글 작성 후 전체 댓글 다시 불러오기
      getTalkBoard();
      console.log("담소 댓글 작성 완료");
    } catch (error) {
      console.error("담소 댓글 작성 실패", error.message);
    }
  };

  //담소 댓글을 수정하는 메소드 입니다. Comment 컴포넌트에서 전달받아 로직을 처리합니다.
  const handleUpdateComment = async (commentId, content) => {
    try {
      await api.put(`/talks/${talkId}/comments/${commentId}`, {
        commentId,
        content,
      });
      console.log("담소 댓글 수정 완료");
      getTalkBoard();
    } catch (error) {
      console.log("담소 댓글 수정에 문제가 생겼습니다", error.message);
    }
  };

  //담소 댓글을 삭제하는 메소드 입니다.
  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/talks/${talkId}/comments/${commentId}`, {
        commentId,
      });
      console.log("담소 댓글 삭제 완료");
      alert("댓글이 삭제되었습니다.");
      getTalkBoard();
    } catch (error) {
      console.log("담소 댓글 삭제에 문제가 생겼습니다", error.message);
    }
  };

  //게시글을 북마크하는 메소드 입니다.
  //만약 북마크를 이미 한 상태이면 북마크를 해제합니다.
  const onClickBookmark = async () => {
    //북마크 상태 확인 : 북마크 한 상태인 경우 북마크 해제 (delete)
    if (talkBoard.bookmarked) {
      try {
        const response = await api.delete(`/talks/bookmark/${talkId}`);
        alert("북마크를 취소했습니다.");
        getTalkBoard();
      } catch (error) {
        console.log("북마크를 취소하는 중 오류 발생", error.message);
      }
    } else {
      //북마크 상태 확인 : 북마크 안한 상태인 경우 북마크 (post)
      try {
        const response = await api.post(`/talks/bookmark/${talkId}`);
        alert("북마크했습니다.");
        getTalkBoard();
      } catch (error) {
        console.log("북마크를 등록하는 중 오류 발생", error.message);
      }
    }
  };

  return (
    <div>
      <div>
        {talkBoard && (
          <TalkDetail
            talk={talkBoard}
            onDeleteTalk={handleDeleteTalk}
            onUpdateTalk={handleUpdateTalk}
            onBookmark={onClickBookmark}
          />
        )}
      </div>
      <div className="comments">
        <div className="comments-input">
          <CommentInput onSubmit={handleCommentSubmit}></CommentInput>
        </div>
        {talkBoardComment.length > 0 ? (
          <div className="comments-list">
            {talkBoardComment.map((comment) => (
              <div key={comment.talkCommentId}>
                <Comment
                  nickname={comment.nickname}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  memberId={comment.memberId}
                  talkCommentId={comment.talkCommentId}
                  onCommentSubmit={handleCommentSubmit}
                  onUpdateComment={handleUpdateComment}
                  onDeleteComment={handleDeleteComment}
                />

                {/* 대댓글 */}
                {comment.replies.map((reply) => (
                  <div
                    key={reply.talkCommentId}
                    style={{ marginLeft: "7%" }} // 들여쓰기
                  >
                    <Comment
                      nickname={reply.nickname}
                      content={reply.content}
                      createdAt={reply.createdAt}
                      talkCommentId={reply.talkCommentId}
                      memberId={comment.memberId}
                      onCommentSubmit={handleCommentSubmit}
                      onUpdateComment={handleUpdateComment}
                      onDeleteComment={handleDeleteComment}
                      activeParentCommentId={activeParentCommentId}
                      setActiveParentCommentId={setActiveParentCommentId}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="comments-none">댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default TalkBoardDetail;
