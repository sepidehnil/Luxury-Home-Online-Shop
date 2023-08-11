import { Link } from "react-router-dom";

function MainHeader() {
  return (
    <div className="flex gap-4 mb-12 stticky">
      <div>
        <Link to="/home">خانه</Link>
      </div>
      <div>
        <Link to="/cart">سبد خرید</Link>
      </div>
      <div>
        <Link to="/login">پنل مدیریت</Link>
      </div>
    </div>
  );
}
export default MainHeader;
