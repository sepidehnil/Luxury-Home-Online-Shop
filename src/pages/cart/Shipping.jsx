import { useNavigate } from "react-router-dom";

function shipping() {
  const navigate = useNavigate();
  function pay() {
    navigate("/pay");
  }

  return (
    <div>
      <form>
        <label for="fname">نام خوانوادگی:</label>
        <br />
        <input
          type="text"
          id="fname"
          name="fname"
          className="border-2 border-rose-600 "
        />
        <label for="fname">ایمیل:</label>

        <input
          type="email"
          id="femail"
          name="femail"
          className="border-2 border-rose-600 "
        />
        <label for="date"> تاریخ تحویل: </label>

        <input
          type="date"
          id="date"
          name="date"
          className="border-2 border-rose-600 "
        />
      </form>
      <button className="border-2 border-rose-600 " onClick={pay}>
        پرداخت
      </button>
    </div>
  );
}
export default shipping;
