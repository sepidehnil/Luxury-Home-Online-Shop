import { Outlet } from "react-router-dom";
import MainHeader from "../components/UI/header/MainHeader";
import Footer from "../components/UI/footer/Footer";

function ClientLayout() {
  return (
    <div>
      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
export default ClientLayout;
