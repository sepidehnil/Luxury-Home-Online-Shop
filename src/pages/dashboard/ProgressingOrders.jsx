import OrdersTable from "../../components/UI/table/OrdersTable";

function Orders() {
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
          />
          <label for="deliverdorders" className="mr-2">
            سفارش های تحویل داده شده
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="progressingorders"
            name="orders"
            value="progressingorders"
            checked
          />
          <label for="progressingorders" className="mr-2">
            سفارش های در انتظار ارسال
          </label>
        </div>
      </fieldset>

      <div className="w-[1000px] font-secondary bg-red-100 rounded-lg ">
        <OrdersTable />
      </div>
    </div>
  );
}
export default Orders;
