import MainHeader from "../components/UI/header/MainHeader";
import Footer from "../components/UI/footer/Footer";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SideBarModal from "../components/UI/modal/sideBarmodal";
import { useState } from "react";

function HomeLayout() {
  const [showSideBar, setSideBar] = useState(false);
  function openBtn() {
    setSideBar(true);
  }
  function closeBtn() {
    setSideBar(false);
  }

  return (
    <Fragment>
      {showSideBar && <SideBarModal onClose={closeBtn} />}
      <MainHeader onOpen={openBtn} />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
export default HomeLayout;
