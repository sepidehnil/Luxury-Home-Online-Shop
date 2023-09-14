import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Screenshot 2023-08-10 193526.png";

function Pay() {
  const successful = useNavigate();
  function successfulPayment() {
    successful("/successPay");
  }
  const failed = useNavigate();
  function paymentFailed() {
    failed("/failedPay");
  }
  return (
    <div className="flex flex-col">
      <img src={logo} alt="logo" className="w-[450px] h-[600px] m-auto" />
      <div className="flex gap-4 m-auto mt-7 font-secondary">
        <button
          onClick={successfulPayment}
          className="px-3 py-2 bg-red-600 border-none rounded-lg"
        >
          پرداخت
        </button>
        <button
          onClick={paymentFailed}
          className="px-3 py-2 border-2 border-red-600 rounded-lg"
        >
          انصراف
        </button>
      </div>
    </div>
  );
}
export default Pay;
