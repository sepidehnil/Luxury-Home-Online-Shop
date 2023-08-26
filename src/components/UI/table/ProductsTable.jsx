import React, { useState, useEffect } from "react";
import { Button, Space, Table, Image } from "antd";
import editLogo from "../../../assets/svg/editIcon.svg";
import deleteIcon from "../../../assets/svg/deleteIcon.svg";
import axios from "axios";
import DeleteModal from "../modal/DeleteModal";
import AddEditProductModal from "../modal/AddEditProductModal";
import publicAxios from "../../../services/instances/publicAxios";

const ProductsTable = () => {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [selectedItem, setSelectedItem] = useState();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editting, setIsEditing] = useState(false);

  const loadUserData = async () => {
    const resposeProducts = await publicAxios.get(
      "http://localhost:8000/api/products",
      {
        params: { limit: 1000 },
      }
    );
    const responseCategories = await publicAxios.get(
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
        edit: product._id,
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

  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setModalOpen(false);

  const renderEditColumn = (record) => {
    const handleOpen = () => {
      console.log("Clicked item id:", record);
      setSelectedItem(record);
      setOpen(true);
    };
    const handelOpenEdit = () => {
      setIsEditing(true);
      setModalOpen(true);
    };
    return (
      <div className="flex gap-6 justify-center">
        <img src={deleteIcon} onClick={handleOpen} />
        <img src={editLogo} onClick={handelOpenEdit} />
      </div>
    );
  };

  function handleConfirmDelete() {
    if (selectedItem) {
      // Send a DELETE request to the backend
      axios
        .delete(`http://localhost:8000/api/products/${selectedItem}`)
        .then(() => {
          // Remove the item from the local data
          setData((prevData) =>
            prevData.filter((item) => item._id !== selectedItem)
          );
          setSelectedItem(null); // Move this line inside the .then block
          handleClose(); // Close the modal after successful deletion
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  }

  const handelAddProduct = () => {
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleChange = (pagination, filters) => {
    console.log("Various parameters", pagination, filters);
    setFilteredInfo(filters);
  };
  const clearFilters = () => {
    setFilteredInfo({});
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
      dataIndex: "edit",
      key: "edit",
      className: "w-[150px] ",
      render: (record) => renderEditColumn(record),
    },
  ];
  const paginationConfig = {
    pageSize: 3,
  };
  return (
    <>
      {true && (
        <DeleteModal
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirmDelete}
        />
      )}
      {modalOpen && (
        <AddEditProductModal
          onOpen={modalOpen}
          onClose={handleCloseEdit}
          isEditing={editting}
        />
      )}
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
        <Button
          className="bg-white text-black font-secondary"
          onOpen={modalOpen}
          onClick={handelAddProduct}
          onClose={handleCloseEdit}
          isEditing={editting}
        >
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
export default ProductsTable;
