// 백엔드 서버의 주소 설정 (실제 환경 변수를 사용하세요)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * 자원명 구조에 맞춰 데이터를 불러오는 함수.
 * 규칙: '/api/'를 제외하고 자원명만 사용합니다.
 * @param {string} resourcePath - 'cultural-heritage/710' 또는 'cultural-heritage/all' 등
 */
export const getResourceDetail = async (resourcePath) => {
    const url = `${API_BASE_URL}/${resourcePath}`;
    
    try {
        // Axios 대신 기본 fetch API 사용 (Axios를 사용하려면 import 필요)
        const response = await fetch(url); 

        // API 응답 규칙(ApiResponseDto)에 따라 응답을 처리합니다.
        if (!response.ok) {
            // 서버에서 HTTP 4xx/5xx 에러 코드를 보낸 경우
            throw new Error(`API 호출 실패: HTTP Status ${response.status} - ${resourcePath}`);
        }

        const responseData = await response.json();

        // ApiResponseDto 구조를 따른다고 가정
        if (responseData.success === false) {
             // ApiResponseDto 내의 success: false 처리
            throw new Error(`API 응답 실패: ${responseData.message || '알 수 없는 서버 오류'}`);
        }
        
        // 실제 데이터(payload) 반환
        return responseData.data;

    } catch (error) {
        console.error("API 통신 오류:", error);
        throw error; // 호출한 페이지에서 에러를 처리하도록 던집니다.
    }
};