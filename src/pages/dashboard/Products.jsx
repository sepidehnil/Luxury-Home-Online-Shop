import ProductsTable from "../../components/UI/table/ProductsTable";
function Products() {
  return (
    <div className="m-8">
      <h1 className="font-secondary text-2xl mb-5">مدیریت کالا ها</h1>
      <div className="w-[1000px]  font-secondary bg-red-100 rounded-lg ">
        <ProductsTable />
      </div>
    </div>
  );
}
export default Products;
