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
    <div>
      <img src={logo} alt="logo" />
      <button onClick={successfulPayment}>پرداخت</button>
      <button onClick={paymentFailed}>انصراف</button>
    </div>
  );
}
export default Pay;
