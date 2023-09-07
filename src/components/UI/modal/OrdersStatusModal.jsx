import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../../styles/index.css";
import { Space, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import publicAxios from "../../../services/instances/publicAxios";
import useProduct from "../../../hooks/useProduct";
import moment from "jalali-moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};
const columns = [
  {
    title: "کالا",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "قیمت",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "تعداد",
    dataIndex: "count",
    key: "count",
  },
];

export default function OrdersStatusModal({ open, onClose, selectedUser }) {
  const [userData, setUserData] = useState({});
  const [getUserTable, setGetUserTable] = useState([]);
  const { isLoading, products } = useProduct();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user data
        const userDataPromises = publicAxios.get(`/users/${selectedUser.user}`);
        const userDataResponse = await userDataPromises;
        const userData = userDataResponse.data.data.user;
        setUserData(userData);

        // Retrieve product details for each product in getUserTableData
        const getUserTableData = selectedUser.products.map((product) => ({
          productId: product.product, // Store the product ID
          count: product.count,
        }));

        const productDetailsPromises = getUserTableData.map((item) =>
          // Find the product details by ID
          products.data.products.find(
            (product) => product._id === item.productId
          )
        );

        const productDetails = await Promise.all(productDetailsPromises);
        console.log(productDetails);
        // Combine product details with the count
        const getUserTableWithData = getUserTableData.map((item, index) => ({
          product: productDetails[index].name, // Use the product name or any other property you want
          price: productDetails[index].price, // Add more details if needed
          count: item.count,
        }));

        setGetUserTable(getUserTableWithData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  console.log(selectedUser);
  console.log(userData);

  const formatPersianDate = (dateString) => {
    const jalaliDate = moment(dateString, "YYYY-MM-DDTHH:mm:ss.SSSZ").locale(
      "fa"
    );
    return jalaliDate.format("jYYYY/jMM/jDD HH:mm:ss");
  };
  return (
    <div className="font-secondary">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="none rounded-md">
          <h1>نمایش سفارش</h1>
          <div>
            <div>نام مشتری:{selectedUser.userName}</div>
            <div>ادرس: {userData.address}</div>
            <div>تلفن: {userData.phoneNumber}</div>
            <div>زمان تحویل: {formatPersianDate(selectedUser.date)}</div>
            <div>زمان سفارش: {formatPersianDate(selectedUser.createdAt)}</div>
            <div>
              <Table columns={columns} dataSource={getUserTable} />
            </div>
          </div>
          <button>تحویل شد</button>
        </Box>
      </Modal>
    </div>
  );
}
