import React, { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { List, Pagination, Card } from "antd";
import { fetchsubcategories } from "../../services/instances/subCategory";

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
    <div className="bg-red-50 flex p-4 gap-12 h-screen">
      <div className="w-[500px] h-[450px] bg-white p-8 rounded-lg">
        {categories?.data.categories.map((item) => (
          <div key={item._id} className="mb-5 font-secondary">
            <Link to={`/categories/${item._id}`} key={item._id}>
              <h1
                className={`text-xl font-semibold font-secondary ${
                  categoryId === item._id && "text-blue-500"
                }`}
              >
                {item.name}
              </h1>
            </Link>
            <ul>
              {subcategoriesByCategory[item._id]?.map((subcategory) => (
                <li key={subcategory._id} className="px-3 py-1">
                  {subcategory.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex w-11/12 flex-wrap m-auto mt-6 overflow-hidden">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={displayedProducts}
          renderItem={(product) => (
            <List.Item className="font-secondary">
              <Card
                className="font-secondary"
                title={product.name}
                extra={
                  <Link
                    to={`/products/${product._id}`}
                    className="font-secondary"
                  >
                    جزئیات بیشتر
                  </Link>
                }
              >
                <Link to={`/products/${product._id}`}>
                  <img
                    alt={product.name}
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                  />
                </Link>
                <p>قیمت: {product.price}</p>
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
  );
}

export default CategoriesPage;
