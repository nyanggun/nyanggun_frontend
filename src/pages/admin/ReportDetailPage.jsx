import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";

import api from "../../config/apiConfig";
import CertificationButton from "../../components/board/CertificationButton";
import BorderButton from "../../components/board/BorderButton";

const ReportDetailPage = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState();

  const id = useParams().id;

  const formatTimeAgo = (time) => {
    const now = new Date();
    const past = new Date(time); // 서버에서 받은 LocalDateTime 문자열
    const diff = Math.floor((now - past) / 1000); // 초 단위 차이

    if (diff < 60) return "방금 전";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  useEffect(() => {
    const loadReport = async () => {
      const response = await api.get(`admin/reports/${id}`);
      console.log(response.data.data);
      setReport(response.data.data);
    };
    loadReport();
  }, [id]);

  const changeState = async () => {
    try {
      const response = await api.patch(`/admin/reports/${id}/content/state`);
      setReport(response.data.data);
      console.log(response.data.data);
      //변경 이후에 뜨는 alert이므로 반대로 작성
      if (response.data.data.reportState === "PENDING") {
        alert("해당 콘텐츠 블라인드를 취소했습니다.");
      } else if (response.data.data.reportState === "PROCESSED") {
        alert("해당 콘텐츠를 블라인드했습니다.");
      }
    } catch (e) {
      console.error("에러가 발생하였습니다", e);
    }
  };

  const moveToContent = async () => {
    if (report.contentType == "EXPLORATION")
      navigate(`/dorandoran/explorations/${report.contentId}`);
    else if (report.contentType == "TALK")
      navigate(`/dorandoran/talks/detail/${report.contentId}`);
    else if (report.contentType == "PHOTO_BOX")
      navigate(`/photobox/detail/${report.contentId}`);
    //댓글 위치 걸기
    else if (report.contentType == "TALK_COMMENT") navigate();
    else if (report.contentType == "EXPLORATION_COMMENT") navigate();
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="sm border rounded-3 m-3 p-2">
        <Row className="m-3 justify-content-start align-items-center gap-0">
          <Col xs={1} className="p-0">
            <div>
              <Image
                className="img-fluid rounded-circle border border-1"
                src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
              ></Image>
            </div>
          </Col>
          <Col>
            {report && (
              <span>
                {report.reportMember.nickname} {formatTimeAgo(report.createdAt)}
              </span>
            )}
          </Col>
        </Row>
        <div className="rounded-3 bg-light m-3 p-3">
          <Row>
            <Col>
              <h4 className="">신고사유</h4>
            </Col>
          </Row>
          <Row>
            <Col>{report && <span>{report.reason}</span>}</Col>
          </Row>
        </div>

        <Row>
          <Col className="d-flex justify-content-end gap-2">
            <BorderButton
              btnName={"신고된 게시글로 이동"}
              clickBtn={() => {
                moveToContent();
              }}
            ></BorderButton>
            {report && report.reportState == "PENDING" ? (
              <BorderButton
                btnName={"콘텐츠 숨기기"}
                buttonColor="red"
                clickBtn={() => {
                  changeState();
                }}
              />
            ) : (
              <BorderButton
                btnName={"콘텐츠 숨김 완료"}
                buttonColor="black"
                clickBtn={() => {
                  changeState();
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReportDetailPage;
