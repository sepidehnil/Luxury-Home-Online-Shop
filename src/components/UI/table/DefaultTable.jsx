import React, { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
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
const DefaultTable = () => {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

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
      cate: categories.find((category) => category._id === product.category)
        ?.name,
    }));

    console.log(categories);
    return alldatas;
  };
  useEffect(() => {
    loadUserData().then((alldatas) => {
      setData(alldatas);
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const columns = [
    {
      title: "نام کالا",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "دسته بندی",
      dataIndex: "cate",
      key: "cate",
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
      filteredValue: filteredInfo.cate || null,
      onFilter: (value, record) => record.cate.includes(value),
      sorter: (a, b) => a.cate.length - b.cate.length,
      sortOrder: sortedInfo.columnKey === "cate" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
export default DefaultTable;
