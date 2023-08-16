import DefaultTable from "../../components/UI/table/defaultTable";
import { orders } from "../../data/orders";

function Orders() {
  const content = orders.map((goal) => (
    <DefaultTable key={goal.id} address={goal.address} />
  ));
  console.log(orders);
  return <div>{content}</div>;
}
export default Orders;
