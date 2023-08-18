import InstockTable from "../../components/UI/table/InstockTable";
function Instock() {
  return (
    <div className="m-8">
      <h1 className="font-secondary text-2xl mb-5">مدیریت موجودی و قیمت ها</h1>
      <div className="w-[1000px] font-secondary bg-red-100 rounded-lg ">
        <InstockTable />
      </div>
    </div>
  );
}
export default Instock;
