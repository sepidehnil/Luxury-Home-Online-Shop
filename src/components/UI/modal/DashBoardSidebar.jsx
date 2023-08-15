import { Link } from "react-router-dom";

function DashBoardSidebar() {
  return (
    <div className="flex gap-5">
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
  );
}
export default DashBoardSidebar;
