import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getResourceDetail } from '../util/apiClient'; 
import InfoBox from '../components/heritage/InfoBox';
import MapSection from '../components/heritage/MapSection'; 

import Header from '../components/common/Header';
import Navigationbar from '../components/navigationbar/Navigationbar'; 
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import ChatbotButton from '../components/chatbot/ChatbotButton'; 

import './Heritage.css'; 


const HeritageDetail = () => {
    // URL에서 ID를 가져옴 (예: /cultural-heritage/710 -> id = '710')
    const { id } = useParams(); 
    const [heritageData, setHeritageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeritage = async () => {
            if (!id) {
                setError("문화재 ID가 누락되었습니다.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                // 규칙: 'cultural-heritage/ID' 형태로 요청
                const path = `cultural-heritage/${id}`; 
                const data = await getResourceDetail(path);
                
                setHeritageData(data);
            } catch (err) {
                setError(err.message || "문화재 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchHeritage();
    }, [id]);

    // --- UI 렌더링 ---
    if (loading) {
        return <div className="loading-container"><LoadingSpinner /></div>;
    }
    
    // 로딩 완료 후 에러 발생 시
    if (error) {
        return <div className="error-container"><ErrorAlert message={error} /></div>;
    }
    
    if (!heritageData) {
        return <div className="not-found">문화재 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="detail-page-container">
            {/* Header 컴포넌트 */}
            <Header />
            
            <main className="content">
                {/* InfoBox 컴포넌트 */}
                <InfoBox data={heritageData} />
                
                {/* MapSection 컴포넌트 (동적 지도) */}
                <MapSection 
                    lat={heritageData.latitude} 
                    lng={heritageData.longitude} 
                    heritageName={heritageData.name || heritageData.title}
                />
            </main>

            <Footer />
            <Navigationbar />
            <ChatbotButton /> 
        </div>
    );
};

export default HeritageDetail;