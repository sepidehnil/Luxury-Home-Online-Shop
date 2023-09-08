import { Outlet } from "react-router-dom";
import MainHeader from "../components/UI/header/MainHeader";
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
