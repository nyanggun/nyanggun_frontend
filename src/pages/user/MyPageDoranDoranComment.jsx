import { useEffect, useRef, useState } from "react";
import "./MyPageDoranDoran.css";
import api from "../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import TalkDetail from "../../components/board/TalkDetail";
import Comment from "../../components/comment/Comment";
import { Col, Row } from "react-bootstrap";

const MyPageDoranDoranComment = () => {
    const userId = useParams();

    // ref를 사용하여 최신 값 유지
    const cursor = useRef(null);
    const hasNext = useRef(true);
    const navigate = useNavigate();
    const [userComment, setUserComment] = useState([]);

    //내 댓글을 가져오는 함수 입니다.
    const handleUserComment = async () => {
        try {
            const response = await api.get(`/mypage/${userId.id}/comment`, {
                params: { cursor: cursor.current },
            });

            const {
                contents,
                nextCursor,
                hasNext: hasNextFromServer,
            } = response.data.data;

            cursor.current = nextCursor;
            hasNext.current = hasNextFromServer;

            setUserComment((prev) => [
                ...prev,
                ...contents.filter(
                    (item) => !prev.some((p) => p.postId === item.postId)
                ),
            ]);

            console.log("작성한 댓글을 성공적으로 가져왔습니다.", response);
        } catch (error) {
            console.log("내 댓글을 가져오는 중 오류 발생", error);
        }
    };

    useEffect(() => {
        handleUserComment();

        //스크롤이 끝에 도달했을 때 게시글 더 불러오기
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (
                scrollTop + windowHeight >= documentHeight - 100 &&
                hasNext.current
            ) {
                handleUserComment();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <div>
                <Row className="justify-content-center align-items-center m-0">
                    <Col xs={12} sm={10} md={8} lg={6}>
                        {userComment.length > 0 ? (
                            <div>
                                {userComment.map((comment) => (
                                    <Comment
                                        content={comment.content}
                                        nickname={comment.nickname}
                                        createdAt={comment.createdAt}
                                        onClick={() =>
                                            navigate(
                                                comment.category === "TALK"
                                                    ? `/dorandoran/talks/detail/${comment.postId}`
                                                    : `/dorandoran/explorations/${comment.postId}`
                                            )
                                        }
                                    ></Comment>
                                ))}
                            </div>
                        ) : (
                            <div className="talk-list-none">
                                <h3>작성한 댓글이 없습니다.</h3>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MyPageDoranDoranComment;
