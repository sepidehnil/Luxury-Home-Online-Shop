import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import moment from "jalali-moment";
import "moment/locale/fa";
import publicAxios from "../../../services/instances/publicAxios";

const ProgressingOrders = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await publicAxios.get("/orders", {
          params: { limit: 1000 },
        });
        const orders = response.data.data.orders;

        const deliveredOrders = orders.filter(
          (order) => order.deliveryStatus === true
        );

        const userIds = deliveredOrders.map((order) => order.user);

        const userDataPromises = userIds.map((userId) =>
          publicAxios.get(`/users/${userId}`)
        );
        const userDatas = await Promise.all(userDataPromises);
        const ordersWithUserData = deliveredOrders.map((order, index) => {
          const user = userDatas[index].data.data.user;
          const fullName = `${user.firstname} ${user.lastname}`;
          return {
            ...order,
            userName: fullName,
          };
        });

        setData(ordersWithUserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
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
  const setOrderTimeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "orderTime",
    });
  };
  const paginationConfig = {
    pageSize: 8,
  };
  const renderEditColumn = () => {
    return (
      <div className="text-center">
        <div>بررسی وضعیت</div>
      </div>
    );
  };
  const columns = [
    {
      title: "نام کاربر",
      dataIndex: "userName",
      key: "userName",
      className: "font-secondary text-center",
    },
    {
      title: "مجموع مبلغ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: "font-secondary text-center",
    },
    {
      title: "زمان ثبت سفارش",
      dataIndex: "orderTime",
      className: "font-secondary text-center",
      key: "orderTime",
      sorter: (a, b) =>
        moment(b.orderTime, "jYYYY/jMM/jDD").diff(
          moment(a.orderTime, "jYYYY/jMM/jDD")
        ),
      sortOrder: sortedInfo.columnKey === "orderTime" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "بررسی وضعت سفارش",
      render: renderEditColumn,
      className: "font-secondary text-center",
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setOrderTimeSort}>Sort by order time</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={paginationConfig}
        className="font-secondary text-center"
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
export default ProgressingOrders;
