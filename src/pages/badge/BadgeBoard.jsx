import { Image } from "react-bootstrap";
import "./BadgeAcquisition.css";
import SmileFace from "../../assets/smile-face.svg";
import Menu from "../../components/common/menu/Menu";
import { Outlet } from "react-router-dom";

const BadgeAcquisition = () => {
  return (
    <>
      <div className="justify-content-center d-flex align-items-center">
        <div className="" xs={1}>
          <Image src={SmileFace} />
        </div>
        <div className="">
          <h2 className="">사냥꾼 증표</h2>
        </div>
      </div>
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
