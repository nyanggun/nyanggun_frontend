import { useContext, useEffect, useState } from "react";
import TalkDetail from "../../../components/board/TalkDetail";
import api from "../../../config/apiConfig";
import {
    useLocation,
    useNavigate,
    useOutletContext,
    useSearchParams,
} from "react-router-dom";
import "./TalkBoardList.css";
import { AuthContext } from "../../../contexts/AuthContext";

const TalkSearchResult = () => {
    const userData = useContext(AuthContext);
    const [talkBoard, setTalkBoard] = useState([]);
    const navigate = useNavigate();
    const [searchKeyword] = useSearchParams();
    const keyword = searchKeyword.get("keyword");

    // 담소 게시글을 가져오는 api
    const handleTalkSearchList = async () => {
        console.log("키워드 결과페이지에서 받음 ", keyword);
        try {
            const response = await api.get("/talks/search", {
                params: { keyword: keyword },
            });
            //내림차순으로 정렬합니다.
            const sortedData = response.data.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setTalkBoard(sortedData);
            console.log("담소 검색 결과를 가져왔습니다.", response.data);
            console.log("유저 정보 확인 : ", user);
        } catch (error) {
            console.error(
                "담소 검색 결과를 가져오는 데 오류가 발생했습니다.",
                error.message
            );
        }
    };

    useEffect(() => {
        handleTalkSearchList();
    }, [keyword]);

    return (
        <div>
            {talkBoard.length > 0 ? (
                <div>
                    {talkBoard.map((talks) => (
                        <TalkDetail
                            key={talks.talkId}
                            talk={talks}
                            onClick={() =>
                                navigate(
                                    `/dorandoran/talks/detail/${talks.talkId}`
                                )
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="talk-list-none">
                    <h3>검색 결과가 없습니다.</h3>
                </div>
            )}
        </div>
    );
};

export default TalkSearchResult;
