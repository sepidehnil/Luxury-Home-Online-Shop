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
import { Carousel } from "antd";
import backward from "../../../assets/svg/backward.svg";

function MainHeader(props, categoryId) {
  const ctx = useContext(CartContext);
  const numberOfCartItems = ctx.items.length;

  return (
    <section className="relative">
      <header className="font-secondary flex justify-between rounded-2xl absolute w-full z-10 h-[70px]">
        <div className="flex items-center gap-8">
          <Link to="/">
            <div className="flex gap-1 px-5 py-8 rounded-br-3xl bg-white font-secondary text-2xl inset-3">
              <span>Luxury </span>
              <img src={logo} width="22px" />
              <span>Home</span>
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

        <div className="flex gap-8 items-center mt-[30px] pr-6">
          <Link to="/login">
            <div className="flex gap-1 bg-[#141b2d] py-[38px] px-2 rounded-b-lg text-white transition duration-300 ease-in-out hover:bg-gradient-to-b from-[rgb(20,27,45)] to-[rgba(255,255,255,0.333858543417367)]">
              <img src={userIcon} alt="cart icon" />
              <span className="texl-xl">Admin panel</span>
            </div>
          </Link>
          <Link to="/cart">
            <div className="text-white relative bg-[#141b2d] px-6 py-10 rounded-b-lg transition duration-300 ease-in-out hover:bg-gradient-to-b from-[rgb(20,27,45)] to-[rgba(255,255,255,0.333858543417367)]">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm absolute bg-black left-3 top-4 text-white ">
                {numberOfCartItems}
              </div>
              <img src={carIcon} alt="cart icon" className="w-5" />
            </div>
          </Link>
          <Link to="/userlogin">
            <div className="flex gap-3 items-center bg-white-800 text-white bg-[#141b2d] rounded-b-lg px-3 py-8 transition duration-300 ease-in-out hover:bg-gradient-to-b from-[rgb(20,27,45)] to-[rgba(255,255,255,0.333858543417367)]">
              <span className="texl-xl">Sign in</span>
              <img src={user} />
            </div>
          </Link>
        </div>
      </header>
      <div
        className="z-10 text-white absolute font-secondary bottom-[150px] w-[580px] pr-[90px] pl-[20px] py-5 rounded-l-lg"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,27,45,1) 35%, rgba(255,255,255,0.25262605042016806) 100%)",
        }}
      >
        <p className="text-2xl mb-6">
          Replace Your Space with Stunning interior & Furniture Designs
        </p>
        <p className="text-sm mb-6">
          Here, you will find an array of stunning pieces that will take your
          home decor to the next level, Our furniture combines aesthetic appeal
          with functionality to give you the best of both worlds
        </p>
        <Link to={`/categories/${categoryId}`}>
          <div className="flex justify-end cursor-pointer">
            <div className="w-[180px] h-[40px] flex justify-center items-center bg-[rgba(20,27,45,1)] rounded-3xl gap-2">
              <span>Explore Products</span>
              <img src={backward} className="text-white" />
            </div>
          </div>
        </Link>
      </div>
      <Carousel autoplay autoplaySpeed={4000}>
        <img className="z-0 flex justify-center items-center h-[770px] bg-[url('https://roomdsign.com/wp-content/uploads/2021/09/brown-leather-furniture-with-black-accent-wall.jpg')] bg-no-repeat bg-bottom rounded-2xl bg-cover" />
        <img className="z-0 flex justify-center items-center h-[770px] bg-[url('https://www.ikea.com/images/a-calm-bedroom-with-green-and-black-furniture-framed-prints--b3fa8a967e7f0bb9f3c80bad2a3a6772.jpg?f=sg')] bg-no-repeat bg-bottom rounded-2xl bg-cover" />
        <img className="z-0 flex justify-center items-center h-[770px] bg-[url('https://www.ikea.com/images/an-open-plan-kitchen-with-floor-to-ceiling-windows-sinarp-dr-e5c08a407be1a1222785c254643a17ba.jpg?f=sg')] bg-no-repeat bg-bottom rounded-2xl bg-cover" />
      </Carousel>
    </section>
  );
}
export default MainHeader;
