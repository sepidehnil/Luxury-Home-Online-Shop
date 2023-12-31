import MainHeader from "../components/UI/header/MainHeader";
import Footer from "../components/UI/footer/Footer";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategories } from "../services/instances/categoriesSlice";
import SideBarModal from "../components/UI/modal/SideBarModal";
import CartProvider from "../context/CartProvider";
import HomepageCategories from "../pages/categories/HomepageCategories";

function HomeLayout() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchcategories());
  }, [dispatch]);

  const [showSideBar, setSideBar] = useState(false);
  function openBtn() {
    setSideBar(true);
  }
  // function closeBtn() {
  //   setSideBar(false);
  // }

  return (
    <CartProvider>
      {/* {showSideBar && <SideBarModal onClose={closeBtn} />} */}
      {/* <HomepageCategories /> */}
      <Outlet />
      {/* <Footer /> */}
    </CartProvider>
  );
}
export default HomeLayout;
