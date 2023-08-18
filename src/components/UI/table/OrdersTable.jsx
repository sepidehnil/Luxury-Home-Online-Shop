import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import moment from "moment-jalaali"; // Import the jalali version of Moment.js
import "moment/locale/fa"; // Import the Persian (Farsi) locale for Moment.js

const data = [
  // Your data here...
];

const OrdersTable = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});

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

  const renderEditColumn = () => {
    return (
      <div className="text-center">
        <div>بررسی وضعیت</div>
      </div>
    );
  };

  const columns = [
    // Your other columns...
    {
      title: "زمان ثبت سفارش",
      dataIndex: "orderTime",
      key: "orderTime",
      sorter: (a, b) =>
        moment(b.orderTime, "jYYYY/jMM/jDD").diff(
          moment(a.orderTime, "jYYYY/jMM/jDD")
        ),
      sortOrder: sortedInfo.columnKey === "orderTime" ? sortedInfo.order : null,
      ellipsis: true,
    },
    // Your other columns...
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
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default OrdersTable;
