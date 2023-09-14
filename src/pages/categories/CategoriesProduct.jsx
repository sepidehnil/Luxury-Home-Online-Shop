import React from "react";
import ProductCard from "../../components/UI/products/ProductCard";
import useProduct from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CategoriesPage() {
  const { isLoading, products } = useProduct();
  const { categoryId } = useParams();
  const categories = useSelector((state) => state.categories.categories);

  const filteredProducts = products?.data.products.filter(
    (item) => item.category === categoryId
  );
  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className="w-full h-full bg-red-50 flex p-8 gap-12">
      <div className="w-[500px] h-full bg-white p-8">
        {categories?.data.categories.map((item) => (
          <Link to={`/categories/${item._id}`} key={item._id}>
            {" "}
            {/* Use item._id as the URL parameter */}
            <h1
              className={`text-xl font-semibold font-secondary mb-7 ${
                categoryId === item._id &&
                "text-blue-500" /* Highlight active category */
              }`}
            >
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
      <div className="flex w-11/12 flex-wrap m-auto gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            image={`http://localhost:8000/images/products/images/${product.images[0]}`}
            price={product.price}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
