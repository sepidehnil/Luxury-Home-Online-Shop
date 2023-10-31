import useProduct from "../../hooks/useProduct";
import { useSelector } from "react-redux";
import ProductPrev from "../../components/UI/products/ProductPrev";
import { useState, useEffect } from "react";
import MainHeader from "../../components/UI/header/MainHeader";

function HomePage() {
  const { isLoading } = useProduct();
  const categories = useSelector((state) => state.categories.categories);

  const [categoryId, setcategoryId] = useState(null);

  useEffect(() => {
    if (categories?.data?.categories?.length > 0) {
      setcategoryId(categories.data.categories[0]._id);
    }
  }, [categories]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!categories || categories.length === 0) {
    return <div>No categories found.</div>;
  }

  const handleCategoryClick = (categoryId) => {
    setcategoryId(categoryId);
  };

  console.log(categoryId);
  return (
    <section className="font-secondary p-8">
      <div>
        <MainHeader />
      </div>

      <div className="bg-[#fdd262] h-[300px] rounded-2xl mt-10 flex flex-col items-center">
        <div className="bg-white px-5 py-2 rounded-b-2xl">
          <div className="rounded-full bg-[#0A1E3C] p-1 text-lg text-white w-[100px] flex justify-center font-primary">
            Products
          </div>
        </div>
        <div className="text-[#0A1E3C] flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-3xl font-bold">Collection for your space</h1>
          <p className="font-primary w-[640px] mt-4 text-lg">
            Introducing our carefully curated Product Collection! We've
            handpicked a selection of top-quality items that are sure to meet
            all of your needs.
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
                  categoryId && categoryId === category._id
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
      <ProductPrev categoryId={categoryId} />
    </section>
  );
}
export default HomePage;
