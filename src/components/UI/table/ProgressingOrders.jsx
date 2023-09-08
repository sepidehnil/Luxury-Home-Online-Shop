import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import moment from "jalali-moment";
import "moment/locale/fa";
import publicAxios from "../../../services/instances/publicAxios";
import OrdersStatusModal from "../modal/OrdersStatusModal";
import "moment/locale/fa";

const ProgressingOrders = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await publicAxios.get("/orders", {
          params: { limit: 1000 },
        });
        const orders = response.data.data.orders;
        const progressingOrders = orders.filter(
          (order) => order.deliveryStatus === true
        );
        console.log(progressingOrders);
        const userIds = progressingOrders.map((order) => order.user);
        const userDataPromises = userIds.map((userId) =>
          publicAxios.get(`/users/${userId}`)
        );
        const userDatas = await Promise.all(userDataPromises);
        const ordersWithUserData = progressingOrders.map((order, index) => {
          const user = userDatas[index].data.data.user;
          console.log(user.createdAt);
          const fullName = `${user.firstname} ${user.lastname}`;
          const createdAt = user.createdAt;
          return {
            ...order,
            userName: fullName,
            date: createdAt,
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

  const renderDateColumn = (record) => {
    const formattedDate = moment(record.date)
      .locale("fa")
      .format("jYYYY/jMM/jDD");
    return (
      <div className="text-center">
        <div>{formattedDate}</div>
      </div>
    );
  };

  console.log(data);
  const renderEditColumn = (record) => {
    function handelOpen() {
      console.log("Clicked item id:", record);
      setSelectedUser(record);
      setOpen(true);
    }
    return (
      <div className="text-center">
        <div onClick={handelOpen}>بررسی وضعیت</div>
      </div>
    );
  };
  function handleClose() {
    setOpen(false);
  }

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
      render: (totalPrice) => (
        <span>
          {totalPrice.toLocaleString("fa-IR")} {/* Format with commas */}
        </span>
      ),
    },
    {
      title: "زمان ثبت سفارش",
      dataIndex: "date",
      className: "font-secondary text-center",
      key: "date",
      sorter: (a, b) =>
        moment(b.orderTime, "jYYYY/jMM/jDD").diff(
          moment(a.orderTime, "jYYYY/jMM/jDD")
        ),
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
      ellipsis: true,
      render: renderDateColumn,
    },
    {
      title: "بررسی وضعت سفارش",
      className: "font-secondary text-center",
      render: (record) => renderEditColumn(record),
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
      {open && (
        <OrdersStatusModal
          open={open}
          onClose={handleClose}
          selectedUser={selectedUser}
        />
      )}
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
