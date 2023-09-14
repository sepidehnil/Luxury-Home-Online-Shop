import { Link } from "react-router-dom";
import carIcon from "../../../assets/svg/cartIcon.svg";
import userIcon from "../../../assets/svg/userIcon.svg";
import menueIcon from "../../../assets/svg/menuIcon.svg";
import search from "../../../assets/svg/search.svg";
import { useContext } from "react";
import CartContext from "../../../context/cart-context";
import user from "../../../assets/svg/user.svg";
import logo from "../../../assets/images/green-chair-logo-tree-design-250nw-2000531558.jpg";
import React from "react";

function PagesHeader() {
  const ctx = useContext(CartContext);
  const numberOfCartItems = ctx.items.length;

  return (
    <section>
      <header className="font-secondary pl-[40px] flex justify-between w-full bg-[#141b2d] h-[85px] shodaw-sm">
        <div className="flex gap-5 items-center">
          <Link to="/">
            <div className="flex gap-1 px-5 py-6 bg-white font-secondary text-2xl">
              <span>خانه </span>
              <img src={logo} width="22px" />
              <span>لوکس</span>
            </div>
          </Link>
          <div className="w-[500px] h-[35px] px-4 bg-white flex items-center text-black rounded-3xl mr-5">
            <img src={search} />
            <input
              type="text"
              className="px-[10px] py-[2px] outline-none w-full bg-transparent text-md"
            />
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <Link to="/login">
            <div className="flex gap-1 px-2 py-8 text-white transition duration-300 ease-in-out hover:bg-gradient-to-b from-[rgb(20,27,45)] to-[rgba(255,255,255,0.333858543417367)]">
              <img src={userIcon} alt="cart icon" />
              <span className="texl-xl">پنل ادمین</span>
            </div>
          </Link>
          <Link to="/cart">
            <div className="text-white relative px-6 py-10 transition duration-300 ease-in-out hover:bg-gradient-to-b from-[rgb(20,27,45)] to-[rgba(255,255,255,0.333858543417367)]">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-lg absolute bg-white text-[rgb(20,27,45)] left-3 top-4">
                {numberOfCartItems.toLocaleString("fa")}
              </div>
              <img src={carIcon} alt="cart icon" className="w-5" />
            </div>
          </Link>
          <Link to="/userlogin">
            <div className="flex gap-3 items-center bg-white-800 text-white px-3 py-8 transition duration-300 ease-in-out hover:bg-gradient-to-b from-[rgb(20,27,45)] to-[rgba(255,255,255,0.333858543417367)]">
              <span className="texl-xl">ورود</span>
              <img src={user} />
            </div>
          </Link>
        </div>
      </header>
    </section>
  );
}
export default PagesHeader;
