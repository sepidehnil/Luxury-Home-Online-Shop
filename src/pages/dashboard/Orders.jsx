import ProgressingOrders from "../../components/UI/table/ProgressingOrders";
import DeliveredOrdersTable from "../../components/UI/table/DeliveredOrdersTable";
import { useState } from "react";

function Orders() {
  const [isChecked, setIsChecked] = useState(true);
  const [currentPage, setCurrentPage] = useState("progressing");

  const handleCheckboxClick = () => {
    if (isChecked) {
      setCurrentPage("progressing");
    } else {
      setCurrentPage("delivered");
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="m-8 font-secondary">
      <h1 className=" text-2xl mb-5">مدیریت سفارش ها</h1>
      <fieldset className="flex gap-9 mb-6 items-center">
        <div>
          <input
            type="radio"
            id="deliverdorders"
            name="orders"
            value="deliverdorders"
            checked={isChecked}
            onChange={handleCheckboxClick} // تغییرات اینجا
          />
          <label htmlFor="deliverdorders" className="mr-2">
            سفارش های تحویل داده شده
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="progressingorders"
            name="orders"
            value="progressingorders"
            checked={!isChecked}
            onChange={handleCheckboxClick} // تغییرات اینجا
          />
          <label htmlFor="progressingorders" className="mr-2">
            سفارش های در انتظار ارسال
          </label>
        </div>
      </fieldset>

      <div className="w-[1000px] font-secondary bg-red-100 rounded-lg ">
        {currentPage === "progressing" && <ProgressingOrders />}
        {currentPage === "delivered" && <DeliveredOrdersTable />}
      </div>
    </div>
  );
}

export default Orders;
