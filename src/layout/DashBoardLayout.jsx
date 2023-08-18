import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Footer from "../components/UI/footer/Footer";
import DashBoardSidebar from "../components/UI/modal/DashBoardSidebar";

function DashBoardLayout() {
  return (
    <Fragment>
      <DashBoardSidebar />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
export default DashBoardLayout;
