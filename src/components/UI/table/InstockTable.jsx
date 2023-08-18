import React, { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
import editLogo from "../../../assets/svg/editIcon.svg";
import deleteIcon from "../../../assets/svg/deleteIcon.svg";
import axios from "axios";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];
const InstockTable = () => {
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
      price: product.price,
    }));
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

  const columns = [
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
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      className: "font-secondary",
    },
    {
      title: "موجودی",
      dataIndex: "quantity",
      key: "quantity",
      className: "w-[150px] ",
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
          حذف فیلرها
        </Button>
        <Button className="bg-white text-black font-secondary">ذخیره</Button>
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
export default InstockTable;
