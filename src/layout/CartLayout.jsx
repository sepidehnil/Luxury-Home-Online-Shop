import { Outlet } from "react-router-dom";
import MainHeader from "../components/UI/header/MainHeader";
import Footer from "../components/UI/footer/Footer";
import CartProvider from "../context/CartProvider";
import PagesHeader from "../components/UI/header/PagesHeader";

function CartLayout() {
  return (
    <CartProvider>
      <div className="h-screen">
        <PagesHeader />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </CartProvider>
  );
}
export default CartLayout;
