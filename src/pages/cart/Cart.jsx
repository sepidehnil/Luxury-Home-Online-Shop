import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  function shipping() {
    navigate("/shipping");
  }
  return (
    <div>
      <ul>
        <li>یخچال سامسونگ </li>
        <li>تلویزیون سونی</li>
      </ul>
      <button onClick={shipping} className="border-2 border-rose-600 ">
        نهایی کردن سبد خرید
      </button>
    </div>
  );
}
export default Cart;
