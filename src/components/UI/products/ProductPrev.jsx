import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductPrev({ categories, products, categoryId, name }) {
  const filteredProducts = products.data.products.filter(
    (item) => item.category === categoryId
  );
  const lastSixProducts = filteredProducts.slice(
    Math.max(filteredProducts.length - 6, 0)
  );
  console.log(categoryId);
  return (
    <section>
      <Link to={`/categories/${categoryId}`}>
        <h1 className="text-3xl font-semibold font-secondary py-8 px-8">
          {name}
        </h1>
      </Link>
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
    </section>
  );
}
export default ProductPrev;
