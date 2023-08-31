import React from "react";
import ProductCard from "../../components/UI/products/ProductCard";
import useProduct from "../../hooks/useProduct";
import { useParams } from "react-router-dom";

function CategoriesPage() {
  const { isLoading, products } = useProduct();
  const { categoryId } = useParams();

  const filteredProducts = products?.data.products.filter(
    (item) => item.category === categoryId
  );

  console.log(categoryId);
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <div className="bg-blue-50">
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
  );
}

export default CategoriesPage;
