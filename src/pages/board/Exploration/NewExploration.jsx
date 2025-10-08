import { React, useState } from "react";
import axios from "axios";
import WritingEditor from "../../../components/board/WritingEditor";
import WritingPostInputBox from "../../../components/board/WritePostInputBox";
import BorderButton from "../../../components/board/BorderButton";
import { useNavigate } from "react-router-dom";

const NewExploration = () => {
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [relatedHeritage, setRelatedHeritage] = useState("");
	const [content, setContent] = useState("");

	const cancel = () => {
		// 이전 페이지로 보내기
		navigate(-1);
	};
	const finish = async () => {
		// 유효성 검사
		if (!title.trim() || !relatedHeritage.trim() || !content.trim()) {
			alert("모든 내용을 입력해주세요");
			return;
		}

		const postData = {
			title: title,
			relatedHeritage: relatedHeritage,
			content: content, // 현재는 텍스트와 HTML 태그만 포함된 내용
			memberId: 1,
		};

		try {
			const response = await axios.post("http://localhost:8080/api/exploration", postData);
			console.log("서버 응답:", response.data);

			//
			const newPostId = response.data.id;
			const newPostUrl = `/dorandoran/exploration/${newPostId}`; // App.js에 정의된 경로와 일치해야 합니다.
			navigate(newPostUrl);
		} catch (error) {
			console.error("게시글 등록 오류:", error);
			alert("게시글 등록 중 오류가 발생했습니다");
		}
	};

	return (
		<div className="row p-4 justify-content-center">
			<div className="col-xs-12 col-sm-11 col-md-6">
				<WritingPostInputBox placeholder={"제목"} value={title} onChange={(e) => setTitle(e.target.value)} />
				<WritingPostInputBox
					placeholder={"방문문화재"}
					value={relatedHeritage}
					onChange={(e) => setRelatedHeritage(e.target.value)}
				/>
				<WritingEditor value={content} onChange={setContent} />
				<div className="d-flex mt-2 justify-content-end">
					<div className="m-1">
						<BorderButton btnName="취소" buttonColor="red" clickBtn={cancel} />
					</div>
					<div className="m-1">
						<BorderButton btnName="완료" buttonColor="" clickBtn={finish} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewExploration;
