import { Link } from "react-router-dom";
import profileImage from "../../../assets/images/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png";

function DashBoardSidebar() {
  return (
    <div className="w-[300px] h-[400px] font-secondary text-lg rounded-lg m-8">
      <div className=" bg-red-500 py-4 px-6 rounded-lg">
        <img src={profileImage} className="rounded-full w-[90px] h-[90px]" />
      </div>

      <div className="px-6 py-9 flex flex-col gap-6 bg-white rounded-lg">
        <div>
          <Link to="/orders">سفارش ها</Link>
        </div>
        <div>
          <Link to="/instock">موجودی و قیمت ها</Link>
        </div>
        <div>
          <Link to="/products">کالاها</Link>
        </div>
        <div>
          <Link to="/home">بازگشت خانه</Link>
        </div>
      </div>
    </div>
  );
}
export default DashBoardSidebar;
