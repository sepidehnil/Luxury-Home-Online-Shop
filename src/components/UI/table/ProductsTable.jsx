import React, { useState, useEffect } from "react";
import { Button, Space, Table, Image } from "antd";
import editLogo from "../../../assets/svg/editIcon.svg";
import deleteIcon from "../../../assets/svg/deleteIcon.svg";
import axios from "axios";
import DeleteModal from "../modal/DeleteModal";
import AddProductModal from "../modal/AddProductModal";
import publicAxios from "../../../services/instances/publicAxios";
import EditProduct from "../modal/EditProduct";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchcategories } from "../../../services/instances/categoriesSlice";

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
};

const loadUserData = async () => {
  const resposeProducts = await publicAxios.get("/products", {
    params: { limit: 1000 },
  });
  console.log(resposeProducts);
  const responseCategories = await publicAxios.get("/categories");

  const products = resposeProducts.data.data.products;
  const categories = responseCategories.data.data.categories;
  const alldatas = products.map(async (product) => {
    const category = categories.find(
      (category) => category._id === product.category
    )?.name;
    const imageURL =
      product.images.length > 0
        ? `http://localhost:8000/images/products/images/${product.images[0]}`
        : "";

    return {
      ...product,
      category: category,
      imageURL: imageURL,
      edit: product._id,
    };
  });

  const resolvedData = await Promise.all(alldatas);
  console.log(resolvedData);
  return resolvedData;
};

const ProductsTable = () => {
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [selectedItem, setSelectedItem] = useState();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [product, setSelectedProduct] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    loadUserData().then((resolvedData) => {
      setData(resolvedData);
      setTotalItems(resolvedData.length);
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchcategories());
  }, [dispatch]);

  const handleClose = () => setOpen(false);
  const handleCloseProduct = (newProduct) => {
    setModalOpen(false);
    if (newProduct) {
      const processedProduct = processProduct(newProduct);
      setData((prevData) => [...prevData, processedProduct]);
      const newTotalItems = totalItems + 1;
      const newTotalPages = Math.ceil(
        newTotalItems / paginationConfig.pageSize
      );
      setTotalItems(newTotalItems);
      // Check if the current page exceeds the new total pages
      if (paginationConfig.current > newTotalPages) {
        // If it does, set the current page to the last page
        setPagination({ ...paginationConfig, current: newTotalPages });
      }
    }
  };

  const processProduct = (product) => {
    const category = categories.data.categories.find(
      (category) => category._id === product.category
    )?.name;
    const imageURL =
      product.images.length > 0
        ? `http://localhost:8000/images/products/images/${product.images[0]}`
        : "";

    return {
      ...product,
      category: category,
      imageURL: imageURL,
      edit: product._id,
    };
  };

  const handleCloseEdit = () => setEditModal(false);

  const renderEditColumn = (record) => {
    const handleOpen = () => {
      console.log("Clicked item id:", record);
      setSelectedItem(record);
      setOpen(true);
    };
    const handelOpenEdit = () => {
      setSelectedProduct(data.find((product) => product._id === record));
      setEditModal(true);
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
      axios
        .delete(`http://localhost:8000/api/products/${selectedItem}`)
        .then(() => {
          setData((prevData) =>
            prevData.filter((item) => item._id !== selectedItem)
          );
          setSelectedItem(null);
          handleClose();
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
    const newTotalItems = totalItems - 1;
    setTotalItems(newTotalItems);
    const newTotalPages = Math.ceil(newTotalItems / paginationConfig.pageSize);
    if (paginationConfig.current > newTotalPages) {
      setPagination({ ...paginationConfig, current: newTotalPages });
    }
  }

  const handelAddProduct = () => {
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
      title: "Image",
      dataIndex: "imageURL",
      key: "imageURL",
      className: "font-secondary text-center",
      render: (imageURL) => (
        <Image src={`${imageURL}`} width={120} height={120} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "font-secondary text-center",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      className: "font-secondary text-center",
      filters: [
        {
          text: "Bedroom",
          value: "Bedroom",
        },
        {
          text: "Living room",
          value: "Living room",
        },
        {
          text: "Kitchen",
          value: "Kitchen",
        },
        {
          text: "Bathroom",
          value: "Bathroom",
        },
      ],
      filteredValue: filteredInfo.category || null,
      onFilter: (value, record) => record.category.includes(value),
      ellipsis: true,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      className: "w-[150px] ",
      render: (record) => renderEditColumn(record),
    },
  ];
  const paginationConfig = {
    pageSize: 3,
    total: totalItems,
    style: paginationStyle,
  };
  return (
    <>
      {open && (
        <DeleteModal
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirmDelete}
        />
      )}
      {editModal && (
        <EditProduct
          open={editModal}
          onClose={handleCloseEdit}
          product={product}
        />
      )}
      {modalOpen && (
        <AddProductModal onOpen={modalOpen} onClose={handleCloseProduct} />
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
          Remove filters
        </Button>
        <Button
          className="bg-white text-black font-secondary"
          onOpen={modalOpen}
          onClick={handelAddProduct}
        >
          Add product
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
                  background: "white",
                  borderTop: "none",
                  fontSize: "1rem",
                  textAlign: "center",
                  color: "black",
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
