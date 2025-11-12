import { useContext, useEffect, useState } from "react";
import BorderButton from "../../components/board/BorderButton";
import Subtitle from "../../components/board/Subtitle";
import Menu from "../../components/common/menu/Menu";
import "./MyPage.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Image, Row, Col } from "react-bootstrap";
import api from "../../config/apiConfig";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const MyPage = () => {
    const userId = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [userUpdateOn, setUserUpdateOn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userNickname, setUserNickname] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userPassword, setUserPassword] = useState("");
    //조건부 렌더링 시 auth파일에 적힌 변수와 동일하게 작성해야 한다.
    const { user, logout } = useContext(AuthContext);

    const handleOut = async () => {
        const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
        if (isConfirmed) {
            try {
                const response = await api.delete(`/mypage/${userId.id}`);
                alert("회원 탈퇴가 완료되었습니다.");
                navigate("/");
                logout();
            } catch (error) {
                console.log("회원 탈퇴 실패", error);
            }
        } else {
            return;
        }
    };

    const handleUserInfo = async () => {
        try {
            const response = await api.get(`/mypage/${userId.id}`);
            console.log("회원 정보를 불러왔습니다.", response);
            setUserInfo(response.data.data);
        } catch (error) {
            console.log("회원 정보를 불러오는 중 오류 발생", error);
        }
    };

    useEffect(() => {
        handleUserInfo();
    }, [userId.id]);

    useEffect(() => {
        if (userInfo) {
            setUserEmail(userInfo.email || "");
            setUserNickname(userInfo.nickname || "");
            setUserPhoneNumber(userInfo.phoneNumber || "");
        }
    }, [userInfo]);

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남김

        if (value.length >= 4 && value.length < 8) {
            value = `${value.slice(0, 3)}-${value.slice(3)}`;
        } else if (value.length >= 8) {
            value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(
                7,
                11
            )}`;
        }
        setUserPhoneNumber(value);
    };
    const { setToken, refreshUser } = useContext(AuthContext);

    const handleUpdateUserInfo = async () => {
        try {
            const response = await api.put(`/mypage/${userId.id}`, {
                email: userEmail,
                nickname: userNickname,
                phoneNumber: userPhoneNumber,
                password: userPassword,
            });
            alert("회원 정보가 수정되었습니다.");
            //2. JWT 토큰 추출 및 localstorage에 저장
            const token = response.headers["authorization"];
            if (token) {
                const jwtToken = token.replace("Bearer ", "");
                localStorage.setItem("token", jwtToken);
                // api.defaults.headers.Authorization = `Bearer ${jwtToken}`; // axios
                // setToken(jwtToken); // Context token
                // await refreshUser(); // Context user
            }
            console.log(response);
            setUserUpdateOn(false);
        } catch (error) {
            alert("유저 정보 수정 오류", error);
        }
    };

    return (
        <div>
            {!userInfo ? (
                <div>
                    <LoadingSpinner
                        message={"정보를 가져오는 중입니다..."}
                    ></LoadingSpinner>
                </div>
            ) : (
                <Row className="p-0 m-0 justify-content-center">
                    <Col xs={12} sm={11} md={6} className="p-0 m-0">
                        <div>
                            {userId.id === String(user.id) ? (
                                <Subtitle text={"내 정보"} />
                            ) : (
                                <Subtitle text={"회원 정보"} />
                            )}
                        </div>
                        <div className="mypage-profile">
                            <Image
                                src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                                roundedCircle
                                fluid
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                }}
                                className="mypage-profile border border-1"
                            />
                        </div>
                        <div className="mypage-box">
                            <div className="mypage-info">
                                <h6 className="mypage-menu">이메일</h6>

                                {userUpdateOn ? (
                                    <input
                                        className="mypage-input"
                                        value={userEmail}
                                        onChange={(e) =>
                                            setUserEmail(e.target.value)
                                        }
                                        type={"text"}
                                    ></input>
                                ) : (
                                    <input
                                        disabled
                                        className="mypage-input"
                                        value={userEmail}
                                    ></input>
                                )}
                            </div>
                            <div className="mypage-info">
                                <h6 className="mypage-menu">닉네임</h6>
                                {userUpdateOn ? (
                                    <input
                                        type={"text"}
                                        className="mypage-input"
                                        value={userNickname}
                                        onChange={(e) =>
                                            setUserNickname(e.target.value)
                                        }
                                    ></input>
                                ) : (
                                    <input
                                        disabled
                                        className="mypage-input"
                                        value={userNickname}
                                    ></input>
                                )}
                            </div>
                            <div className="mypage-info">
                                <h6 className="mypage-menu">전화번호</h6>

                                {userUpdateOn ? (
                                    <input
                                        type={"text"}
                                        className="mypage-input"
                                        value={userPhoneNumber}
                                        onChange={(e) => handlePhoneChange(e)}
                                        maxLength={15} // 010-1234-5678까지
                                    ></input>
                                ) : (
                                    <input
                                        disabled
                                        className="mypage-input"
                                        value={userPhoneNumber}
                                    ></input>
                                )}
                            </div>
                            {userUpdateOn ? (
                                <div className="mypage-info">
                                    <h6 className="mypage-menu">
                                        비밀번호 확인
                                    </h6>

                                    {userUpdateOn ? (
                                        <input
                                            type={"password"}
                                            className="mypage-input"
                                            value={userPassword}
                                            onChange={(e) =>
                                                setUserPassword(e.target.value)
                                            }
                                            maxLength={15} // 010-1234-5678까지
                                        ></input>
                                    ) : (
                                        <input
                                            disabled
                                            className="mypage-input"
                                            value={userPassword}
                                        ></input>
                                    )}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        {userId.id === String(user.id) && (
                            <div className="mypage-button">
                                {userUpdateOn ? (
                                    <>
                                        <BorderButton
                                            clickBtn={handleUpdateUserInfo}
                                            btnName="확인"
                                            buttonColor="black"
                                        />
                                        <BorderButton
                                            clickBtn={() =>
                                                setUserUpdateOn(false)
                                            }
                                            btnName="취소"
                                            buttonColor="black"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <BorderButton
                                            clickBtn={() =>
                                                setUserUpdateOn(true)
                                            }
                                            btnName="정보수정"
                                            buttonColor="black"
                                        />
                                        <BorderButton
                                            clickBtn={handleOut}
                                            btnName="회원탈퇴"
                                            buttonColor="black"
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            )}

            <div>
                <Menu
                    menuOne={"게시글"}
                    menuOneLink={`/mypage/${userId.id}/dorandoran`}
                    menuTwo={"사진함"}
                    menuTwoLink={`/mypage/${userId.id}/photobox`}
                ></Menu>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MyPage;
