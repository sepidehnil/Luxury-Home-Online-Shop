import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../../styles/index.css";
import { Space, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import publicAxios from "../../../services/instances/publicAxios";
import privateAxios from "../../../services/instances/privateAxios";
import useProduct from "../../../hooks/useProduct";
import jalaliMoment from "jalali-moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};
const paginationStyle = {
  display: "flex",
  justifyContent: "center",
};

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    className: "font-secondary text-center w-[280px]",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    className: "font-secondary text-center w-[100px]",
  },
  {
    title: "Amount",
    dataIndex: "count",
    key: "count",
    className: "font-secondary text-center w-[100px]",
  },
];

export default function ProgressingStatusModal({
  open,
  onClose,
  selectedUser,
}) {
  const [userData, setUserData] = useState({});
  const [getUserTable, setGetUserTable] = useState([]);
  const { isLoading, products } = useProduct();

  if (isLoading) {
    <p>loading...</p>;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (products && products.data && products.data.products) {
          const userDataPromises = publicAxios.get(
            `/users/${selectedUser.user}`
          );
          const userDataResponse = await userDataPromises;
          const userData = userDataResponse.data.data.user;
          setUserData(userData);
          const getUserTableData = selectedUser.products.map((product) => ({
            productId: product.product,
            count: product.count,
          }));

          const productDetailsPromises = getUserTableData.map((item) =>
            products.data.products.find(
              (product) => product._id === item.productId
            )
          );

          const productDetails = await Promise.all(productDetailsPromises);
          console.log(productDetails);
          const getUserTableWithData = getUserTableData.map((item, index) => ({
            product: productDetails[index].name,
            price: `$ ${productDetails[index].price}`,
            count: item.count,
          }));

          setGetUserTable(getUserTableWithData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [products, selectedUser]);

  const handleDelivered = (e) => {
    e.preventDefault();

    const updatedData = {
      deliveryStatus: false,
    };

    privateAxios
      .patch(`/orders/${selectedUser._id}`, updatedData)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const paginationConfig = {
    style: paginationStyle,
  };
  return (
    <div className="font-secondary">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="font-primary"
      >
        <Box sx={style}>
          <div className="text-left flex flex-col gap-4 font-secondary">
            <h1 className="font-secondary text-lg">Display order</h1>
            <div className="border-b-2 border-[#7da86b]"></div>
            <div className="flex flex-col gap-3">
              <div>Customer name: {selectedUser.userName}</div>
              <div>Address: {userData.address}</div>
              <div>Phone number: {userData.phoneNumber}</div>
              <div>
                Delivered time:{" "}
                {jalaliMoment(selectedUser.deliveryDate, "YYYY-MM-DDTHH")
                  .local("eng")
                  .format("YYYY-MM-DD")}
              </div>
              <div>
                Place Order time:{" "}
                {jalaliMoment(selectedUser.createdAt, "YYYY-MM-DDTHH")
                  .local("eng")
                  .format("YYYY-MM-DD")}
              </div>
            </div>

            <div className="font-secondary border-2 border-gray-400 rounded-lg">
              <Table
                columns={columns}
                dataSource={getUserTable}
                pagination={paginationConfig}
                components={{
                  header: {
                    cell: ({ children }) => (
                      <th
                        style={{
                          fontSize: "1rem",
                          textAlign: "center",
                          background: "#222a3a",
                          color: "white",
                          border: "none",
                        }}
                      >
                        {children}
                      </th>
                    ),
                  },
                }}
              />
            </div>
          </div>
          <button
            onClick={handleDelivered}
            className="bg-gray-300 flex w-[100px] rounded-lg m-auto justify-center py-2 hover:bg-[#7da86b] mt-4 hover:text-wh"
          >
            delivered
          </button>
        </Box>
      </Modal>
    </div>
  );
}
