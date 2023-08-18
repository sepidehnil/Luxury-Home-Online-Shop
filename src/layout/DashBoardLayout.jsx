import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Footer from "../components/UI/footer/Footer";
import DashBoardSidebar from "../components/UI/modal/DashBoardSidebar";

function DashBoardLayout() {
  return (
    <Fragment>
      <div className="flex h-screen w-screen bg-white">
        <DashBoardSidebar />
        <Outlet />
      </div>

      <Footer />
    </Fragment>
  );
}
export default DashBoardLayout;
