import { React, useEffect, useState } from "react";
import api from "../../../config/apiConfig";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import WritingEditor from "../../../components/board/WritingEditor";
import WritingPostInputBox from "../../../components/board/WritePostInputBox";
import BorderButton from "../../../components/board/BorderButton";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ExplorationDetailPageEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const location = useLocation();

	const {
		originTitle = "",
		originRelatedHeritage = "",
		originContent = "",
		memberId = "",
		originImagePathList = [],
	} = location.state || {};

	// 1. 상태 변수 수정 및 추가
	const [title, setTitle] = useState(originTitle);
	const [relatedHeritage, setRelatedHeritage] = useState(originRelatedHeritage);
	const [content, setContent] = useState(originContent);

	// 기존 이미지, 새로 추가할 이미지, 삭제할 이미지를 분리하여 관리
	const [existingImages, setExistingImages] = useState(originImagePathList);
	const [newImageFiles, setNewImageFiles] = useState([]);
	const [imagesToDelete, setImagesToDelete] = useState([]); // 삭제할 '기존' 이미지 경로 목록

	// 2. 이미지 핸들러 수정 및 추가
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setNewImageFiles((prevFiles) => [...prevFiles, ...files]);
	};

	// 새로 추가한 이미지 미리보기 제거
	const removeNewImage = (indexToRemove) => {
		setNewImageFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
	};

	// 기존 이미지를 제거하는 핸들러
	const removeExistingImage = (imagePath) => {
		// 화면에 보이는 목록에서 제거
		setExistingImages((prevPaths) => prevPaths.filter((path) => path !== imagePath));
		// '삭제할 목록'에 추가
		setImagesToDelete((prevPaths) => [...prevPaths, imagePath]);
	};

	const cancel = () => navigate(-1);

	// 3. '완료' 버튼 클릭 시 서버 전송 로직 수정
	const finish = async () => {
		if (!title.trim() || !relatedHeritage.trim() || !content.trim()) {
			alert("모든 내용을 입력해주세요");
			return;
		}

		const formData = new FormData();

		const dto = {
			id: id,
			title: title,
			relatedHeritage: relatedHeritage,
			content: content,
			memberId: memberId,
			imagesToDelete: imagesToDelete, // 삭제할 이미지 경로 리스트 추가
		};

		// DTO 객체를 JSON 문자열로 변환하여 Blob으로 추가 (파일과 텍스트를 함께 보내기 위함)
		formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));

		// 새로 추가된 이미지 파일들만 추가
		newImageFiles.forEach((file) => {
			formData.append("images", file);
			console.log(formData);
		});

		try {
			// FormData를 서버로 전송 (api.patch는 직접 만드신 모듈 사용)
			const response = await api.patch(`http://localhost:8080/explorations/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("서버 응답:", response.data);
			navigate(`/dorandoran/explorations/${id || response.data.id}`);
		} catch (error) {
			console.error("게시글 수정 오류:", error);
			alert("게시글 수정 중 오류가 발생했습니다");
		}
	};

	return (
		<div className="row p-4 justify-content-center">
			<div className="col-xs-12 col-sm-11 col-md-8">
				<h3 className="mb-3">게시글 수정</h3>
				<WritingPostInputBox placeholder={"제목"} value={title} onChange={(e) => setTitle(e.target.value)} />
				<WritingPostInputBox
					placeholder={"방문문화재"}
					value={relatedHeritage}
					onChange={(e) => setRelatedHeritage(e.target.value)}
				/>
				<WritingEditor value={content} onChange={setContent} />

				<div className="mt-3">
					<label htmlFor="image-upload" className="btn btn-secondary">
						새 이미지 추가
					</label>
					<input
						type="file"
						id="image-upload"
						multiple
						accept="image/*"
						onChange={handleImageChange}
						style={{ display: "none" }}
					/>
				</div>

				{/* 4. 기존 이미지와 새 이미지 미리보기를 따로 렌더링 */}
				<div className="mt-2 d-flex flex-wrap border p-2 rounded">
					{/* 기존 이미지 미리보기 */}
					{existingImages.map((path, index) => (
						<div
							key={`existing-${index}`}
							className="position-relative m-1"
							style={{ width: "100px", height: "100px" }}
						>
							<img
								src={`http://localhost:8080${path}`}
								alt={`기존 이미지 ${index}`}
								style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
							/>
							<button
								onClick={() => removeExistingImage(path)}
								className="btn btn-sm btn-danger position-absolute top-0 end-0"
							>
								X
							</button>
						</div>
					))}
					{/* 새로 추가한 이미지 미리보기 */}
					{newImageFiles.map((file, index) => (
						<div
							key={`new-${index}`}
							className="position-relative m-1"
							style={{ width: "100px", height: "100px" }}
						>
							<img
								src={URL.createObjectURL(file)}
								alt={`새 이미지 ${index}`}
								style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
							/>
							<button
								onClick={() => removeNewImage(index)}
								className="btn btn-sm btn-danger position-absolute top-0 end-0"
							>
								X
							</button>
						</div>
					))}
				</div>

				<div className="d-flex mt-3 justify-content-end">
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

export default ExplorationDetailPageEdit;
