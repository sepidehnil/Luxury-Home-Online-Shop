import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Footer from "../components/UI/footer/Footer";
import DashBoardHeader from "../components/UI/header/DashBoardHeader";

function DashBoardLayout() {
  return (
    <Fragment>
      <DashBoardHeader />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
export default DashBoardLayout;
