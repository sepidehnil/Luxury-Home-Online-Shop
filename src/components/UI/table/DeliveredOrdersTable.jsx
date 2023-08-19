import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import moment from "jalali-moment";
import "moment/locale/fa";

const data = [
  {
    id: 1,
    userName: "محمد رضایی",
    totalPrice: "۷۵۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۳/۰۵",
    address: "تهران - خیابان ولیعصر - خیابان کریمی - پلاک ۲۰",
    deliveredTime: "۱۴۰۲/۰۳/۰۶",
  },
  {
    id: 2,
    userName: "نگین حسینی",
    totalPrice: "۶۲۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۳/۱۰",
    address: "تهران - خیابان شهید بهشتی - خیابان سعدی - پلاک ۱۵",
    deliveredTime: "۱۴۰۲/۰۳/۱۱",
  },
  {
    id: 3,
    userName: "علی میرزایی",
    totalPrice: "۸۵۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۳/۱۴",
    address: "تهران - خیابان انقلاب - خیابان کارگر شمالی - پلاک ۱۰",
    deliveredTime: "۱۴۰۲/۰۳/۱۵",
  },
  {
    id: 4,
    userName: "سمانه کاظمی",
    totalPrice: "۳۵۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۴/۱۳",
    address: "تهران - خیابان شریعتی - خیابان وحید دستگردی - پلاک ۸",
    deliveredTime: "۱۴۰۲/۰۴/۱۵",
  },
  {
    id: 5,
    userName: "رضا محمدی",
    totalPrice: "۱۲۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۴/۲۱",
    address: "تهران - خیابان جمهوری - خیابان انقلاب - پلاک ۳",
    deliveredTime: "۱۴۰۲/۰۴/۲۲",
  },

  {
    id: 7,
    userName: "مریم عبداللهی",
    totalPrice: "۸۷۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۵/۱۳",
    address: "تهران - خیابان ولیعصر - خیابان کریمی - پلاک ۳۰",
    deliveredTime: "۱۴۰۲/۰۵/۱۵",
  },
  {
    id: 8,
    userName: "حسین موسوی",
    totalPrice: "۴۲۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۶/۰۵",
    address: "تهران - خیابان شهید بهشتی - خیابان سعدی - پلاک ۲۰",
    deliveredTime: "۱۴۰۲/۰۶/۰۶",
  },
  {
    id: 9,
    userName: "زهرا رحمانی",
    totalPrice: "۳۰۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۶/۱۱",
    address: "تهران - خیابان انقلاب - خیابان کارگر شمالی - پلاک ۲۲",
    deliveredTime: "۱۴۰۲/۰۶/۱۲",
  },
  {
    id: 10,
    userName: "امیر حسینی",
    totalPrice: "۶۷۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۷/۱۵",
    address: "تهران - خیابان ولیعصر - خیابان نیاوران - پلاک ۱۰",
    deliveredTime: "۱۴۰۲/۰۷/۱۶",
  },
  {
    id: 6,
    userName: "فاطمه صادقی",
    totalPrice: "۵۶۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۵/۰۱",
    address: "تهران - خیابان ولیعصر - خیابان فاطمی - پلاک ۱۲",
    deliveredTime: "۱۴۰۲/۰۵/۰۲",
  },
  {
    id: 11,
    userName: "سجاد میرزایی",
    totalPrice: "۱۱۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۸/۰۱",
    address: "تهران - خیابان جمهوری - خیابان انقلاب - پلاک ۳۵",
    deliveredTime: "۱۴۰۲/۰۸/۰۲",
  },
  {
    id: 12,
    userName: "فرزانه اسماعیلی",
    totalPrice: "۵۸۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۸/۱۵",
    address: "تهران - خیابان ولیعصر - خیابان نیاوران - پلاک ۱۰",
  },
];

const DeliveredOrdersTable = () => {
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
        moment(a.orderTime, "jYYYY/jMM/jDD").unix() -
        moment(b.orderTime, "jYYYY/jMM/jDD").unix(), // مقایسه تاریخ‌ها بر اساس تایم‌استمپ یونیکس
      sortOrder: sortedInfo.columnKey === "orderTime" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "مجموع مبلغ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: "font-secondary text-center",
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
export default DeliveredOrdersTable;
