import { React, useState, useEffect } from "react";
import ExplorationPost from "../Exploration/ExplorationPost";

import api from "../../../config/apiConfig";
import { useSearchParams, Link } from "react-router-dom";

const ExplorationSearchResult = () => {
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get("keyword");
	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		const getSearchResult = async () => {
			try {
				const response = await api.get(`/explorations/search`, {
					params: {
						keyword: keyword,
					},
				});
				console.log("검색결과:", response.data.data);
				setSearchResult(response.data.data);
			} catch (err) {
				console.err("검색 결과를 전송받지 못했습니다", err);
			}
		};
		getSearchResult();
	}, [keyword]);

	return (
		<div>
			{searchResult.length > 0 ? (
				searchResult.map((exploration) => (
					<Link
						key={exploration.id}
						to={`/dorandoran/explorations/${exploration.id}`}
						style={{ textDecoration: "none", color: "inherit" }}
					>
						<ExplorationPost key={exploration.id} {...exploration} />
					</Link>
				))
			) : (
				<div>검색 결과가 없습니다.</div>
			)}
		</div>
	);
};

export default ExplorationSearchResult;
