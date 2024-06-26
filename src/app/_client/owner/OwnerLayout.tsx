import * as React from "react";
import OwnerSidebar from "../../../components/Sidebars/OwnerSidebar";
import OwnerNavbar from "../../../components/Navbar/OwnerNavbar";
import OwnerFooter from "../../../components/Footer/OwnerFooter";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
const OwnerLayout = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();
  const authToken = cookie.load("auth_token");
  if (!authToken || !cookie.load("Otate") || !cookie.load("auth_USER")) {
    navigate("/auth/login");
  }

  return (
    <div className="w-full h-screen flex justify-between">
      <div className="w-[24vw]">
        <OwnerSidebar />
      </div>
      <div className="w-[76vw] h-screen">
        <OwnerNavbar />
        <div className="w-full overflow-y-auto h-[90vh]">
          <div className=" min-h-[80vh] pt-[5vh] px-6">{children}</div>
          <OwnerFooter />
        </div>
      </div>
    </div>
  );
};

export default OwnerLayout;
