import ProgressingOrders from "../../components/UI/table/ProgressingOrders";
import DeliveredOrdersTable from "../../components/UI/table/DeliveredOrdersTable";
import { useState } from "react";

function Orders() {
  const [isChecked, setIsChecked] = useState(false);
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
    <div className="m-14 font-secondary">
      <h1 className=" text-2xl mb-5">Orders Management</h1>
      <fieldset className="flex gap-9 mb-6 items-center">
        <div className="flex gap-1">
          <input
            type="radio"
            id="deliverdorders"
            name="orders"
            value="deliverdorders"
            checked={isChecked}
            onChange={handleCheckboxClick} // تغییرات اینجا
          />
          <label htmlFor="deliverdorders" className="mr-2">
            Delivered orders
          </label>
        </div>

        <div className="flex gap-1">
          <input
            type="radio"
            id="progressingorders"
            name="orders"
            value="progressingorders"
            checked={!isChecked}
            onChange={handleCheckboxClick} // تغییرات اینجا
          />
          <label htmlFor="progressingorders" className="mr-2">
            Progressing orders
          </label>
        </div>
      </fieldset>

      <div className="w-[1000px] font-secondary bg-white rounded-lg ">
        {currentPage === "progressing" && <ProgressingOrders />}
        {currentPage === "delivered" && <DeliveredOrdersTable />}
      </div>
    </div>
  );
}

export default Orders;
