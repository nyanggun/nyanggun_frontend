import { useEffect, useRef, useState } from "react";
import "./MyPageDoranDoran.css";
import api from "../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import TalkDetail from "../../components/board/TalkDetail";

const MyPageDoranDoranPost = () => {
    const userId = useParams();

    // ref를 사용하여 최신 값 유지
    const cursor = useRef(null);
    const hasNext = useRef(true);
    const navigate = useNavigate();
    const [userPost, setUserPost] = useState([]);

    //내 게시글을 가져오는 함수 입니다.
    const handleUserPost = async () => {
        try {
            const response = await api.get(`/mypage/${userId.id}/post`, {
                params: { cursor: cursor.current },
            });

            const {
                contents,
                nextCursor,
                hasNext: hasNextFromServer,
            } = response.data.data;

            cursor.current = nextCursor;
            hasNext.current = hasNextFromServer;

            setUserPost((prev) => [
                ...prev,
                ...contents
                    .map((item) => {
                        if (item.category === "EXPLORATION") {
                            return {
                                ...item,
                                content: item.content.replace(
                                    /<\/?[^>]+(>|$)/g,
                                    ""
                                ), // HTML 태그 제거
                            };
                        }
                        return item;
                    })
                    .filter(
                        (item) => !prev.some((p) => p.postId === item.postId)
                    ),
            ]);

            console.log("작성한 게시글을 성공적으로 가져왔습니다.");
        } catch (error) {
            console.log("내 게시글을 가져오는 중 오류 발생", error);
        }
    };

    useEffect(() => {
        handleUserPost();

        //스크롤이 끝에 도달했을 때 게시글 더 불러오기
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (
                scrollTop + windowHeight >= documentHeight - 100 &&
                hasNext.current
            ) {
                handleUserPost();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <div>
                {userPost.length > 0 ? (
                    <div>
                        {userPost.map((talks) => (
                            <div
                                onClick={() =>
                                    navigate(
                                        talks.category === "TALK"
                                            ? `/dorandoran/talks/detail/${talks.postId}`
                                            : `/dorandoran/explorations/${talks.postId}`
                                    )
                                }
                            >
                                <div style={{ pointerEvents: "none" }}>
                                    <TalkDetail
                                        key={talks.postId}
                                        talk={talks}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="talk-list-none">
                        <h3>작성한 게시글이 없습니다.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPageDoranDoranPost;
