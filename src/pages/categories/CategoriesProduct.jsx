import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/UI/products/ProductCard";
import useProduct from "../../hooks/useProduct";

function CategoriesPage() {
  const { products } = useProduct();
  const categories = useSelector((state) => state.categories.categories);

  console.log(products.data.products);
  return (
    <div className="bg-blue-50">
      {products.data.products.map((product) => (
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
