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
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};

const columns = [
  {
    title: "کالا",
    dataIndex: "product",
    key: "product",
    className: "font-secondary text-center w-[280px]",
  },
  {
    title: "قیمت",
    dataIndex: "price",
    key: "price",
    className: "font-secondary text-center w-[100px]",
  },
  {
    title: "تعداد",
    dataIndex: "count",
    key: "count",
    className: "font-secondary text-center w-[100px]",
  },
];

export default function DeliveredStatusModal({ open, onClose, selectedUser }) {
  const [userData, setUserData] = useState({});
  const [getUserTable, setGetUserTable] = useState([]);
  const { products } = useProduct();

  useEffect(() => {
    async function fetchData() {
      try {
        const userDataPromises = publicAxios.get(`/users/${selectedUser.user}`);
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
          price: productDetails[index].price.toLocaleString("fa-IR"),
          count: item.count.toLocaleString("fa-IR"),
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
    const jalaliDate = moment(dateString, "YYYY-MM-DD").locale("fa");
    return jalaliDate.format("jYYYY/jMM/jDD");
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
          <div className="text-right flex flex-col gap-4">
            <h1 className="font-secondary text-lg">نمایش سفارش</h1>
            <div className="border-b-2 border-gray-500"></div>
            <div className="flex flex-col gap-3">
              <div>نام مشتری: {selectedUser.userName}</div>
              <div>ادرس: {userData.address}</div>
              <div>تلفن: {userData.phoneNumber}</div>
              <div>
                زمان تحویل:
                {formatPersianDate(selectedUser.deliveryDate).toLocaleString(
                  "fa-IR"
                )}
              </div>
              <div>زمان سفارش: {formatPersianDate(selectedUser.createdAt)}</div>
            </div>

            <div className="font-secondary border-2 border-gray-400 rounded-lg">
              <Table
                columns={columns}
                dataSource={getUserTable}
                components={{
                  header: {
                    cell: ({ children }) => (
                      <th
                        style={{
                          fontSize: "1rem",
                          textAlign: "center",
                          background: "#c4c4c4",
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
          <div>
            زمان تحویل:{" "}
            {formatPersianDate(selectedUser.deliveryDate).toLocaleString(
              "fa-IR"
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
