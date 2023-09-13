import useProduct from "../../hooks/useProduct";
import { useSelector } from "react-redux";
import ProductPrev from "../../components/UI/products/ProductPrev";
import logo from "../../assets/images/green-chair-logo-tree-design-250nw-2000531558.jpg";
import search from "../../assets/svg/search.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HomePage() {
  const { isLoading } = useProduct();
  const categories = useSelector((state) => state.categories.categories);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (categories?.data?.categories?.length > 0) {
      setSelectedCategory(categories.data.categories[0]._id);
    }
  }, [categories]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!categories || categories.length === 0) {
    return <div>No categories found.</div>;
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  console.log(selectedCategory);
  return (
    <section className="font-secondary">
      <div className="bg-[#fdd262] h-[300px] rounded-2xl mt-10 flex flex-col items-center">
        <div className="bg-white px-5 py-2 rounded-b-2xl">
          <div className="rounded-full bg-[#0A1E3C] p-1 text-lg text-white w-[100px] flex justify-center font-primary">
            محصولات
          </div>
        </div>
        <div className="text-[#0A1E3C] flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-3xl font-bold">انتخابی متناسب برای فضای شما</h1>
          <p className="font-primary w-[640px] mt-4 text-lg">
            یک مجموعه دقیقاً برگزیده از محصولات با کیفیت را برای فضای شما تدارک
            دیده‌ایم! <br />
            این مجموعه شامل مواردی است که با دقت انتخاب شده‌اند و بطور قطع تمامی
            نیازهای شما را پوشش می‌دهند.
          </p>
        </div>
      </div>

      <div className="h-full flex justify-center items-center my-8">
        <div className="flex justify-center items-center gap-7 font-secondary">
          {categories?.data?.categories?.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
            >
              <h1
                className={`p-2 rounded-full w-[150px] flex justify-center items-center border-2 border-gray-200 hover:bg-[#0A1E3C] hover:text-white cursor-pointer ${
                  selectedCategory && selectedCategory === category._id
                    ? "bg-[#0A1E3C] text-white"
                    : "bg-white text-[#0A1E3C]"
                }`}
              >
                {category.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <ProductPrev selectedCategory={selectedCategory} />
    </section>
  );
}
export default HomePage;
