import MainHeader from "../components/UI/header/MainHeader";
import Footer from "../components/UI/footer/Footer";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <Fragment>
      <MainHeader />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
export default HomeLayout;
