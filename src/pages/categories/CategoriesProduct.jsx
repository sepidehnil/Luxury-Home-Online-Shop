import React, { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { List, Pagination, Card } from "antd";
import { fetchsubcategories } from "../../services/instances/subCategory";
import PagesHeader from "../../components/UI/header/PagesHeader";
import backward from "../../assets/svg/backwardArrow.svg";

function CategoriesPage() {
  const { isLoading, products } = useProduct();
  const { categoryId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const categories = useSelector((state) => state.categories.categories);
  const subcategories = useSelector(
    (state) => state.subcategories.subcategories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchsubcategories());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log(categoryId);
  const filteredProducts = products?.data.products.filter(
    (item) => item.category === categoryId
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  const subcategoriesByCategory = categories?.data.categories.reduce(
    (acc, category) => {
      const categorySubcategories = subcategories.data.subcategories.filter(
        (subcategory) => subcategory.category === category._id
      );
      acc[category._id] = categorySubcategories;
      return acc;
    },
    {}
  );

  return (
    <section>
      <div>
        <PagesHeader />
      </div>

      <div className="flex pr-6 gap-12">
        <div className="w-[250px] rounded-r-lg border-2 border-gray-200 shadow-md bg-[#5b7f4c] h-[600px]">
          {categories?.data.categories.map((item) => (
            <div>
              <div
                key={item._id}
                className="p-5 font-secondary text-lg hover:bg-[#4a703a]"
              >
                <Link to={`/categories/${item._id}`} key={item._id}>
                  <h1
                    className={`text-2xl font-secondary text-[rgb(20,27,45)] ${
                      categoryId === item._id && "text-gray-100 "
                    }`}
                  >
                    {item.name}
                  </h1>
                </Link>
                <ul>
                  {subcategoriesByCategory[item._id]?.map((subcategory) => (
                    <li key={subcategory._id} className="px-3 py-1 ">
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-11/12 flex-wrap m-auto py-6">
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={displayedProducts}
            renderItem={(product) => (
              <List.Item className="font-secondary">
                <Card
                  className="font-secondary border-2 border-gray-200 hover:shadow-lg"
                  title={product.name}
                >
                  <Link to={`/products/${product._id}`}>
                    <img
                      alt={product.name}
                      src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                    />
                  </Link>
                  <p className="mt-2">Price: $ {product.price}</p>
                  <Link
                    to={`/products/${product._id}`}
                    className="font-secondary"
                  >
                    <div className="flex gap-2">
                      <span className="underline">More Details</span>
                      <img src={backward} />
                    </div>
                  </Link>
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={itemsPerPage}
            onChange={onPageChange}
            className="m-auto mt-2"
          />
        </div>
      </div>
    </section>
  );
}

export default CategoriesPage;
