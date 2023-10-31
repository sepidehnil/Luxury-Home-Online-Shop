import ProductsTable from "../../components/UI/table/ProductsTable";
function Products() {
  return (
    <div className="m-14">
      <h1 className="font-secondary text-2xl mb-5">Products management</h1>
      <div className="w-[1000px] font-secondary rounded-lg ">
        <ProductsTable />
      </div>
    </div>
  );
}
export default Products;
