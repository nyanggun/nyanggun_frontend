//사진함 상세를 볼 수 있는 페이지 입니다.
import { useNavigate } from "react-router-dom";
import TalkDetail from "../../../components/board/TalkDetail";
const PhotoDetail = () => {
    const navigate = useNavigate();
    const talks = {
        title: "제목",
        relatedHeritage: "경복궁",
        nickname: "사냥꾼1",
        createdAt: "2025-10-02T15:32:00",
        tags: ["#태그1", "#태그2", "#태그3", "#태그4"],
    };

    const onUpdatePhoto = () => {
        navigate(`/photobox/update`, {
            state: {
                title: "제목",
                relatedHeritage: "경복궁",
                nickname: "사냥꾼1",
                tags: ["#태그1", "#태그2", "#태그3", "#태그4"],
            },
        });
    };

    return (
        <div>
            <TalkDetail talk={talks} onUpdateTalk={onUpdatePhoto}></TalkDetail>
        </div>
    );
};

export default PhotoDetail;
