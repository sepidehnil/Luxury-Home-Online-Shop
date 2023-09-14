import { Outlet } from "react-router-dom";
import MainHeader from "../components/UI/header/MainHeader";
import Footer from "../components/UI/footer/Footer";
import CartProvider from "../context/CartProvider";
import PagesHeader from "../components/UI/header/PagesHeader";

function CartLayout() {
  return (
    <CartProvider>
      <PagesHeader />
      <Outlet />
      {/* <Footer /> */}
    </CartProvider>
  );
}
export default CartLayout;
