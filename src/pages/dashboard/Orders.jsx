<<<<<<< HEAD
import ProgressingOrders from "../../components/UI/table/ProgressingOrders";
import DeliveredOrdersTable from "../../components/UI/table/DeliveredOrdersTable";
import { useState } from "react";

function Orders() {
  const [isChecked, setIsChecked] = useState(true); // تغییرات اینجا
  const [currentPage, setCurrentPage] = useState("progressing");

  const handleCheckboxClick = () => {
    if (isChecked) {
      setCurrentPage("delivered");
    } else {
      setCurrentPage("progressing");
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
=======
import Table from "../../components/UI/table/table";

function Orders() {
  return (
    <div className="m-8">
      <Table />
>>>>>>> eba8fe2ff1ddf6cd35d68938350f4eee33d4e13b
    </div>
  );
}

export default Orders;
