import { Outlet } from "react-router-dom";
import MainHeader from "../components/UI/header/MainHeader";
import Footer from "../components/UI/footer/Footer";

function CartLayout() {
  return (
    <div>
      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
export default CartLayout;
