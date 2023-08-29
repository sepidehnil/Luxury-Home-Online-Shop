import book1 from "../../assets/images/bookscase/billy-bookcase-white__1051924_pe845813_s5.jpg";
import useProduct from "../../hooks/useProduct";
import ProductCard from "../../components/UI/products/ProductCard";
import { useSelector } from "react-redux";
import ProductPrev from "../../components/UI/products/ProductPrev";

function HomePage() {
  const { isLoading, products } = useProduct();
  const categories = useSelector((state) => state.categories.categories);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!categories || categories.length === 0) {
    return <div>No categories found.</div>;
  }
  // const categoryId = categories.data.categories[0]._id;
  return (
    <div className="bg-red-50 font-secondary">
      {categories.data.categories.map((category) => {
        return (
          <ProductPrev
            key={category._id}
            categories={categories}
            products={products}
            categoryId={category._id}
            name={category.name}
          />
        );
      })}
    </div>
  );
}
export default HomePage;
