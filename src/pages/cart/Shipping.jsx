import { useNavigate } from "react-router-dom";

function shipping() {
  const navigate = useNavigate();
  function pay() {
    navigate("/pay");
  }

  return (
    <div className="h-[745px] bg-[url('https://www.ikea.com/images/a-boho-bedroom-with-a-double-bed-draped-in-neutral-bed-linen-feed733279e7de1f79945bec7e45b02c.jpg?f=sg')] bg-no-repeat ">
      <form className="w-[400px] h-full p-8 bg-transparent backdrop-blur-xl flex flex-col font-secondary gap-5">
        <label for="fname">نام: </label>
        <input
          type="text"
          id="fname"
          name="fname"
          className="border-2 py-1 px-1 rounded-lg outline-none"
        />
        <label for="fname">نام خانوادگی: </label>
        <input
          type="text"
          id="fname"
          name="fname"
          className="border-2 py-1 px-2 rounded-lg outline-none"
        />
        <label for="fname">ادرس: </label>
        <textarea
          id="w3review"
          name="w3review"
          rows="5"
          className="rounded-lg outline-none py-1 px-2"
        ></textarea>
        <label for="fname">تلفن همراه: </label>
        <input
          type="email"
          id="femail"
          name="femail"
          className="border-2 py-1 px-2 rounded-lg outline-none"
        />
        <label for="date">تاریخ تحویل: </label>
        <input
          type="date"
          id="date"
          name="date"
          className="border-2 py-1 px-2 rounded-lg outline-none"
        />
        <button
          className="flex w-full py-2 px-2 justify-center mt-7 bg-red-600 rounded-lg "
          onClick={pay}
        >
          پرداخت
        </button>
      </form>
    </div>
  );
}
export default shipping;
