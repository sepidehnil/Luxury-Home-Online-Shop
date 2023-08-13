import { Link } from "react-router-dom";
import logo from "../../../assets/images/download.png";
import carIcon from "../../../assets/svg/cartIcon.svg";
import userIcon from "../../../assets/svg/userIcon.svg";
import menueIcon from "../../../assets/svg/menuIcon.svg";
import search from "../../../assets/svg/search.svg";

function MainHeader() {
  return (
    <header className="font-primary py-[15px] px-[40px] bg-[#c41231] flex items-center justify-between text-white">
      <div className="flex items-center gap-5">
        <div className="w-[190px] h-[60px]">
          <Link to="/home">
            <img src={logo} alt="HomeSense brand logo" />
          </Link>
        </div>
        <Link to="/login">
          <div className="flex gap-1 text-md ">
            <img src={userIcon} alt="cart icon" />
            پنل ادمین
          </div>
        </Link>
        <div className="w-[500px] h-[35px] px-4 bg-slate-200 flex items-center text-black rounded-3xl mr-5">
          <img src={search} />
          <input
            type="text"
            className="px-[10px] py-[2px] outline-none w-full bg-transparent text-md"
          />
        </div>
      </div>

      <div className="flex gap-7">
        <Link to="/cart">
          <div className="px-[20px] py-[8px] bg-red-800 bord rounded-3xl flex gap-5 items-center justify-center">
            <div className="px-[12px] py-[3px] rounded-2xl bg-red-600 flex items-center justify-center text-md">
              0
            </div>

            <div className="flex gap-2 text-md">
              سبد خرید
              <img src={carIcon} alt="cart icon" />
            </div>
          </div>
        </Link>
        <img src={menueIcon} />
      </div>
    </header>
  );
}
export default MainHeader;
