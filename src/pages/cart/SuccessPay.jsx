import Cookies from "js-cookie";
import privateAxios from "../../services/instances/privateAxios";
import { useEffect } from "react";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

function SuccessPay() {
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const orders = localStorage.getItem("cartData");

        const newList = JSON.parse(orders).items.map((item) => ({
          product: item.id,
          count: item.amount,
        }));

        const userId = Cookies.get("userId");
        const delivery = localStorage.getItem("shippingDate");
        const requestObj = {
          user: userId,
          products: newList,
          deliveryDate: delivery,
          deliveryStatus: true,
        };
        const response = await privateAxios.post("/orders", requestObj);
        console.log("Request sent successfully", response.data);
        console.log(response.data);
        localStorage.removeItem("cartData");
        localStorage.removeItem("shippingDate");
      } catch (error) {
        console.error("Error sending request:", error);
      }
    };

    sendRequest();
  }, []);

  useEffect(() => {
    const sendRequest2 = async () => {
      try {
        const users = localStorage.getItem("userData");
        console.log(users);
        const newUser = JSON.parse(users);
        console.log(newUser);
        const userId = Cookies.get("userId");

        await privateAxios.patch(`/users/${userId}`, newUser).then(() => {
          console.log("User data updated successfully.");
        });
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    };
    sendRequest2();
  }, []);

  return (
    <div className="flex justify-center h-[650px] font-secondary">
      <div className="flex gap-8 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          fill="currentColor"
          class="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
        <div>پرداخت با موفقیت انجام شد</div>
      </div>
    </div>
  );
}
export default SuccessPay;
