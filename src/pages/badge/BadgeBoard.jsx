import { Image } from "react-bootstrap";
import "./BadgeBoard.css";
import SmileFace from "../../assets/smile-face.svg";
import Menu from "../../components/common/menu/Menu";
import { Link, Outlet } from "react-router-dom";

const BadgeAcquisition = () => {
  return (
    <>
      <Link
        to="/badges/map"
        style={{
          textDecoration: "none", // 밑줄 제거
          color: "inherit", // 글자색 유지
        }}
      >
        <div className="justify-content-center d-flex align-items-center">
          <div className="" xs={1}>
            <Image src={SmileFace} />
          </div>
          <div className="">
            <h2 className="">사냥꾼 증표</h2>
          </div>
        </div>
      </Link>
      <Menu
        menuOne={"문화재 인증"}
        menuOneLink={"/badges/map"}
        menuTwo={"증표함"}
        menuTwoLink={"/badges/badgebox"}
      ></Menu>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default BadgeAcquisition;
