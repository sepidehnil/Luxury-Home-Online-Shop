import React, { useState, useEffect } from "react";
import { Button, Space, Table, Image } from "antd";
import editLogo from "../../../assets/svg/editIcon.svg";
import deleteIcon from "../../../assets/svg/deleteIcon.svg";
import axios from "axios";
import DeleteModal from "../modal/DeleteModal";

const OrdersTable = () => {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    const alldatas = products.map((product) => {
      return {
        ...product,
        category: categories.find(
          (category) => category._id === product.category
        )?.name,
        imageURL: product.images[0],
      };
    });

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
        <img src={deleteIcon} onClick={handleOpen} />
        <img src={editLogo} />
      </div>
    );
  };

  const columns = [
    {
      title: "عکس کالا",
      dataIndex: "imageURL",
      key: "imageURL",
      className: "font-secondary text-center",
      render: (imageURL) => (
        <Image
          src={`http://localhost:8000/images/products/images/${imageURL}`}
          width={120}
          height={120}
        />
      ),
    },
    {
      title: "نام کالا",
      dataIndex: "name",
      key: "name",
      className: "font-secondary text-center",
    },

    {
      title: "دسته بندی",
      dataIndex: "category",
      key: "category",
      className: "font-secondary text-center",
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
    pageSize: 3,
  };
  return (
    <>
      {open && <DeleteModal open={open} onClose={handleClose} />}
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
                  textAlign: "center",
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
