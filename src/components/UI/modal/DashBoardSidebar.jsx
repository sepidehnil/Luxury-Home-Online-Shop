import { Link } from "react-router-dom";
import profileImage from "../../../assets/images/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png";
import Cookies from "js-cookie";
import { useState } from "react";

function DashBoardSidebar() {
  const [activeLink, setActiveLink] = useState(location.pathname);

  function handleClick() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "http://localhost:5173/login";
  }
  return (
    <div className="flex flex-col bg-white">
      <div className="w-[300px] h-screen font-secondary text-lg shadow-xl">
        <div className="bg-[#7da86b] py-4 px-6">
          <img src={profileImage} className="rounded-full w-[90px] h-[90px]" />
        </div>
        <div className="flex flex-col gap-8 rounded-lg text-xl mt-8 w-full ">
          <Link to="/orders">
            <div
              className={activeLink === "/orders" ? "bg-[#7da86b] pl-2" : ""}
              onClick={() => setActiveLink("/orders")}
            >
              <div
                className={
                  activeLink === "/orders" ? "bg-[#e9fce0] pl-2 py-2" : "pl-4"
                }
              >
                Orders
              </div>
            </div>
          </Link>

          <Link to="/instock">
            <div
              className={activeLink === "/instock" ? "bg-[#7da86b] pl-2" : ""}
              onClick={() => setActiveLink("/instock")}
            >
              <div
                className={
                  activeLink === "/instock" ? "bg-[#e9fce0] pl-2 py-2" : "pl-4"
                }
              >
                Inventory and price
              </div>
            </div>
          </Link>

          <Link to="/products">
            <div
              className={activeLink === "/products" ? "bg-[#7da86b] pl-2" : ""}
              onClick={() => setActiveLink("/products")}
            >
              <div
                className={
                  activeLink === "/products" ? "bg-[#e9fce0] pl-2 py-2" : "pl-4"
                }
              >
                Products
              </div>
            </div>
          </Link>

          <div className="border-b-2 border-[#7da86b] pb-1 w-[250px] m-auto"></div>

          <Link to="/">
            <div
              className={activeLink === "/" ? "bg-[#7da86b] pl-2" : ""}
              onClick={() => setActiveLink("/")}
            >
              <div
                className={
                  activeLink === "/" ? "bg-[#e9fce0] pl-2 py-2" : "pl-4"
                }
              >
                Home
              </div>
            </div>
          </Link>

          {Cookies.get("accessToken") && (
            <button onClick={handleClick} className="text-left pl-4">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default DashBoardSidebar;
