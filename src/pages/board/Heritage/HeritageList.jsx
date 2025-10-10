import React, { useState, useEffect } from 'react';
import { getResourceDetail } from '../util/apiClient'; 
import ListItem from '../components/heritage/ListItem'; 

import Header from '../components/common/Header';
import Navigationbar from '../components/navigationbar/Navigationbar'; 
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import ChatbotButton from '../components/chatbot/ChatbotButton'; 
import Pagination from '../components/pagination/Pagination';
import Footer from '../../../components/common/Footer';

import './Heritage.css'; 


const HeritageList = () => {
    // --- 상태 관리 ---
    const [heritageList, setHeritageList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 12; // 데스크톱 4열 그리드를 고려하여 12개 설정

    // --- 데이터 불러오기 ---
    useEffect(() => {
        const fetchList = async () => {
            setLoading(true);
            setError(null);
            try {
                // 규칙: 페이지 단위 조회 (size=12 설정)
                const path = `cultural-heritage/page?page=${currentPage}&size=${pageSize}`; 
                
                const responseData = await getResourceDetail(path);
                
                // 백엔드 응답이 Page 객체 구조(content, totalPages 등)를 따른다고 가정
                setHeritageList(responseData.content || responseData); 
                setTotalPages(responseData.totalPages || 1);
                
            } catch (err) {
                setError(err.message || "목록을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchList();
    }, [currentPage]); // currentPage가 변경될 때마다 재요청

    // --- UI 렌더링 ---
    if (loading) {
        // 💡 로딩 컴포넌트 사용
        return <div className="loading-container"><LoadingSpinner /></div>;
    }

    return (
        <div className="list-page-container">
            <Header /> 
            
            <main className="content">
                {error && <ErrorAlert message={error} />}

                {/* 필터/정렬 섹션은 이미지의 '인기순' 드롭다운 버튼 영역 */}
                <div className="filter-sort-section">{/* 검색창 아래 필터/정렬 버튼 영역 */}</div>
                
                {heritageList.length === 0 ? (
                    <div className="not-found">등록된 문화재 정보가 없습니다.</div>
                ) : (
                    <div className="heritage-list-grid">
                        {heritageList.map(heritage => (
                            <ListItem 
                                key={heritage.id} 
                                data={heritage} 
                            />
                        ))}
                    </div>
                )}
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </main>
            
            <Navigationbar />
            
            {/* 💡 챗봇 버튼 */}
            <ChatbotButton />
            <Footer />
        </div>
    );
};

export default HeritageList;