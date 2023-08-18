import { Link } from "react-router-dom";
import logo from "../../../assets/images/download.png";

function MainHeader() {
  return (
    <header className="font-primary py-[20px] px-[40px] bg-[#c41231] flex items-center ">
      <img
        src={logo}
        alt="homesense brand logo"
        className="w-[180px] h-[50px]"
      />
      <span>
        <Link to="/home">خانه</Link>
      </span>
      <span>
        <Link to="/cart">سبد خرید</Link>
      </span>
      <span>
        <Link to="/login">پنل مدیریت</Link>
      </span>
    </header>
  );
}
export default MainHeader;
