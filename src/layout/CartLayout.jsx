import { Outlet } from "react-router-dom";
import MainHeader from "../components/UI/header/MainHeader";
import Footer from "../components/UI/footer/Footer";
import CartProvider from "../context/CartProvider";

function CartLayout() {
  return (
    <CartProvider>
      <MainHeader />
      <Outlet />
      {/* <Footer /> */}
    </CartProvider>
  );
}
export default CartLayout;
