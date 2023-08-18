import React, { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
import editLogo from "../../../assets/svg/editIcon.svg";
import deleteIcon from "../../../assets/svg/deleteIcon.svg";
import axios from "axios";
import privateAxios from "axios";

const OrdersTable = () => {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});

  const loadUserData = async () => {
    const resposeProducts = await axios.get(
      "http://localhost:8000/api/products",
      {
        params: { limit: 34 },
      }
    );
    const responseCategories = await axios.get(
      "http://localhost:8000/api/categories"
    );

    const products = resposeProducts.data.data.products;
    const categories = responseCategories.data.data.categories;
    const alldatas = products.map((product) => ({
      ...product,
      category: categories.find((category) => category._id === product.category)
        ?.name,
      // imageURL: product.imageURL,
    }));
    console.log(alldatas);
    return alldatas;
  };
  useEffect(() => {
    loadUserData().then((alldatas) => {
      setData(alldatas);
    });
  }, []);

  const handleChange = (pagination, filters) => {
    console.log("Various parameters", pagination, filters);
    setFilteredInfo(filters);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };

  const renderEditColumn = () => {
    return (
      <div className="flex gap-6 justify-center">
        <img src={deleteIcon} />
        <img src={editLogo} />
      </div>
    );
  };
  // const renderImageColumn = (imageURL) => {
  //   return (
  //     <img
  //       src={imageURL}
  //       alt="Product"
  //       style={{ width: "50px", height: "50px" }}
  //     />
  //   );
  // };
  const columns = [
    // {
    //   title: "عکس کالا",
    //   dataIndex: "imageURL",
    //   key: "imageURL",
    //   className: "font-secondary",
    //   // render: (imageURL) => renderImageColumn(imageURL),
    // },
    {
      title: "نام کالا",
      dataIndex: "name",
      key: "name",
      className: "font-secondary",
    },

    {
      title: "دسته بندی",
      dataIndex: "category",
      key: "category",
      className: "font-secondary",
      filters: [
        {
          text: "اتاق خواب",
          value: "اتاق خواب",
        },
        {
          text: "سالن نشیمن",
          value: "سالن نشیمن",
        },
        {
          text: "آشپزخانه",
          value: "آشپزخانه",
        },
        {
          text: "سزویس بهداشتی",
          value: "سزویس بهداشتی",
        },
      ],
      filteredValue: filteredInfo.category || null,
      onFilter: (value, record) => record.category.includes(value),
      ellipsis: true,
    },
    {
      title: "ویرایش",
      dataIndex: "ویرایش",
      key: "ویرایش",
      className: "w-[150px] ",
      render: renderEditColumn,
    },
  ];
  const paginationConfig = {
    pageSize: 8,
  };
  return (
    <>
      <Space
        style={{
          marginBottom: 12,
        }}
      >
        <Button
          onClick={clearFilters}
          className="bg-white text-black font-secondary"
        >
          حذف فیلترها
        </Button>
        <Button className="bg-white text-black font-secondary">
          افزودن کالا
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={paginationConfig}
        className="font-secondary"
        components={{
          header: {
            cell: ({ children }) => (
              <th
                style={{
                  background: "#ff8e8e",
                  borderTop: "none",
                  fontSize: "1rem",
                }}
              >
                {children}
              </th>
            ),
          },
        }}
      />
    </>
  );
};
export default OrdersTable;
