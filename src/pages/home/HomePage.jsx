import useProduct from "../../hooks/useProduct";
import { useSelector } from "react-redux";
import ProductPrev from "../../components/UI/products/ProductPrev";
import logo from "../../assets/images/green-chair-logo-tree-design-250nw-2000531558.jpg";
import search from "../../assets/svg/search.svg";

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
    <div className="font-secondary">
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
