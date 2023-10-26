import InstockTable from "../../components/UI/table/InstockTable";
function Instock() {
  return (
    <div className="m-14">
      <h1 className="font-secondary text-2xl mb-5">
        stock and price mangement
      </h1>
      <div className="w-[1000px] font-secondary bg-white rounded-lg ">
        <InstockTable />
      </div>
    </div>
  );
}
export default Instock;
