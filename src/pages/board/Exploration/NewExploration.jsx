import { React, useContext, useState } from "react";
import api from "../../../config/apiConfig";
import WritingEditor from "../../../components/board/WritingEditor";
import WritingPostInputBox from "../../../components/board/WritePostInputBox";
import BorderButton from "../../../components/board/BorderButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const NewExploration = () => {
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [relatedHeritage, setRelatedHeritage] = useState("");
	const [content, setContent] = useState("");
	const [imageFiles, setImageFiles] = useState([]);

	const { user } = useContext(AuthContext);
	console.log(user);

	const cancel = () => {
		// 이전 페이지로 보내기
		navigate(-1);
	};

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		// 기존 파일 목록에 새로 선택한 파일들을 추가합니다.
		setImageFiles((prevFiles) => [...prevFiles, ...files]);
	};

	const removeImage = (indexToRemove) => {
		// 미리보기에서 'X' 버튼을 누르면 해당 인덱스의 파일을 제거합니다.
		setImageFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
	};

	const finish = async () => {
		// 유효성 검사
		if (!title.trim() || !relatedHeritage.trim() || !content.trim()) {
			alert("모든 내용을 입력해주세요");
			return;
		}
		const formData = new FormData();
		const dto = {
			title: title,
			relatedHeritage: relatedHeritage,
			content: content, // 현재는 텍스트와 HTML 태그만 포함된 내용
			memberId: user.id,
		};
		formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));

		//
		if (imageFiles.length > 0) {
			imageFiles.forEach((file) => {
				// "images"라는 key 값은 서버와 동일해야 합니다.
				formData.append("images", file);
			});
		}

		try {
			const response = await api.post("http://localhost:8080/explorations", formData, {
				// ✨ 세 번째 인자로 headers 옵션을 추가하여 재정의
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("서버 응답:", response.data);

			//
			const newPostId = response.data.data.id;
			const newPostUrl = `/dorandoran/explorations/${newPostId}`; // App.js에 정의된 경로와 일치해야 합니다.
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
				{/* 이미지 추가 */}
				<div className="mt-3">
					<input
						type="file"
						id="image-upload"
						className="form-control"
						accept="image/*"
						multiple
						onChange={handleImageChange}
					/>
				</div>

				{/* 이미지 미리보기 영역 */}
				<div className="mt-2 d-flex flex-wrap">
					{imageFiles.map((file, index) => (
						<div key={index} className="position-relative m-1" style={{ width: "100px", height: "100px" }}>
							<img
								src={URL.createObjectURL(file)}
								alt={`preview ${index}`}
								style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
							/>
							<button
								onClick={() => removeImage(index)}
								className="btn btn-sm btn-danger position-absolute top-0 end-0"
								style={{ lineHeight: "1", padding: "0.2rem 0.4rem" }}
							>
								X
							</button>
						</div>
					))}
				</div>
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
