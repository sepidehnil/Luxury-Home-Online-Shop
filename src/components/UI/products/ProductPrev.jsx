import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import useProduct from "../../../hooks/useProduct";
import backward from "../../../assets/svg/backward.svg";

function ProductPrev({ categoryId }) {
  const { isLoading, products } = useProduct();

  if (isLoading) {
    <p>loading </p>;
  }
  const filteredProducts = products.data.products.filter(
    (item) => item.category === categoryId
  );
  console.log(categoryId);
  const lastSixProducts = filteredProducts.slice(
    Math.max(filteredProducts.length - 6, 0)
  );

  return (
    <section className="bg-[#fdd262] rounded-2xl py-8">
      <div className="flex w-11/12 gap-6 flex-wrap m-auto">
        {lastSixProducts.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            image={`http://localhost:8000/images/products/images/${product.images[0]}`}
            price={product.price}
            id={product._id}
          />
        ))}
      </div>
      <div className="text-white flex justify-end px-8 mt-8 items-center cursor-pointer">
        <div className="px-2 py-2 flex justify-center items-center bg-[#0A1E3C] text-white rounded-2xl gap-3">
          <Link to={`/categories/${categoryId}`}>
            <p> دیدن محصولات بیشتر</p>
          </Link>
          <img src={backward} />
        </div>
      </div>
    </section>
  );
}
export default ProductPrev;
