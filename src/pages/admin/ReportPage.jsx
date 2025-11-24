import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import api from "../../config/apiConfig";

const ReportPage = () => {
    const [reportList, setReportList] = useState([]);

    useEffect(() => {
        const loadReport = async () => {
            const response = await api.get("/admin/reports");
            console.log(response.data.data);
            setReportList(response.data.data);
        };

        loadReport();
    }, []);

    //시간 데이터(LocalDateTime)을 변환하여 1분 전 <-과 같은 형식으로 만들기
    //서버에서는 2025-10-02T15:32:00 로 받아올 때 사용 가능하다.
    const formatTimeAgo = (time) => {
        const now = new Date();
        const past = new Date(time); // 서버에서 받은 LocalDateTime 문자열
        const diff = Math.floor((now - past) / 1000); // 초 단위 차이

        if (diff < 60) return "방금 전";
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        return `${Math.floor(diff / 86400)}일 전`;
    };

    const navigate = useNavigate();
    const handleRowClick = (reportId) => {
        navigate(`/admin/reports/${reportId}`);
    };

    return (
        <Row className="justify-content-center m-0 p-0">
            <Col xs={12} sm={10} lg={10} className="m-0 p-0">
                {reportList.length > 0 ? (
                    <table className="table">
                        {/* 1. <thead>로 헤더 그룹화 */}
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>날짜</th>
                                <th>분류</th>
                                <th>사유</th>
                                <th>신고자</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportList.map((report) => (
                                <tr
                                    key={report.id}
                                    onClick={() => handleRowClick(report.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <td>{report.id}</td>
                                    <td>{formatTimeAgo(report.createdAt)}</td>
                                    <td>
                                        {{
                                            TALK: "문화재 담소",
                                            EXPLORATION: "문화재 탐방기",
                                            EXPLORATION_COMMENT:
                                                "문화재 탐방기 댓글",
                                            TALK_COMMENT: "문화재 담소 댓글",
                                            PHOTO_BOX: "사진함",
                                        }[report.contentType.toUpperCase()] ||
                                            ""}
                                    </td>

                                    <td>{report.reason.slice(0, 20)}</td>
                                    <td>{report.reportMember.nickname}</td>
                                    <td>
                                        {report.reportState === "PENDING"
                                            ? "처리중"
                                            : report.reportState === "PROCESSED"
                                            ? "처리완료"
                                            : ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            marginTop: "100px",
                            marginBottom: "100px",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "24px",
                        }}
                    >
                        신고 내역이 없습니다.
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default ReportPage;
