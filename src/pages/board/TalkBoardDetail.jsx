//담소 게시글 상세 화면 입니다.
import { useEffect, useState } from "react";
import axios from "axios";
import TalkDetail from "../../components/board/TalkDetail";
import Comment from "../../components/comment/Comment";
import CommentInput from "../../components/comment/CommentInput";
import "./TalkBoardDetail.css";

//대댓글 처리
// 평탄한 댓글 배열 → 계층 구조로 변환
const organizeComments = (comments) => {
  const commentMap = {};
  const topLevel = [];

  comments.forEach((c) => {
    c.replies = [];
    commentMap[c.talkCommentId] = c;
  });

  comments.forEach((c) => {
    if (c.talkparentCommentId) {
      const parent = commentMap[c.talkparentCommentId];
      if (parent) parent.replies.push(c);
    } else {
      topLevel.push(c);
    }
  });

  return topLevel;
};

const TalkBoardDetail = ({ talkId }) => {
  const [talkBoard, setTalkBoard] = useState(null);
  const [talkBoardComment, setTalkBoardComment] = useState([]);

  const getTalkBoard = async () => {
    if (!talkId) return;

    try {
      const response = await axios.get(`http://localhost:8080/talks/${talkId}`);
      setTalkBoard(response.data.data);

      // 댓글 구조화
      const organizedComments = organizeComments(response.data.data.comments);

      setTalkBoardComment(organizedComments);
      console.log("담소 게시글을 가져왔습니다.", response.data);
    } catch (error) {
      console.error(
        "담소 게시글을 가져오는 데 오류가 발생했습니다.",
        error.message
      );
    }
  };

  useEffect(() => {
    getTalkBoard();
  }, [talkId]);

  return (
    <div>
      <div>{talkBoard && <TalkDetail talk={talkBoard} />}</div>
      <div className="comments">
        <div className="comments-input">
          <CommentInput></CommentInput>
        </div>
        <div className="comments-list">
          {talkBoardComment.map((comment) => (
            <div key={comment.talkCommentId}>
              <Comment
                nickname={comment.nickname}
                content={comment.content}
                createdAt={comment.createdAt}
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
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalkBoardDetail;
