import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import moment from "jalali-moment";
import "moment/locale/fa";

const data2 = [
  {
    id: 13,
    userName: "مهدی علیزاده",
    totalPrice: "۴۵۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۸/۲۰",
    address: "تهران - خیابان ونک - خیابان شهرآرا - پلاک ۷",
    deliveredTime: "۱۴۰۲/۰۸/۲۲",
  },
  {
    id: 14,
    userName: "سارا محمدی",
    totalPrice: "۳۸۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۸/۲۳",
    address: "تهران - خیابان ولنجک - خیابان ولیعصر - پلاک ۲۵",
    deliveredTime: "۱۴۰۲/۰۸/۲۵",
  },
  {
    id: 15,
    userName: "علی احمدی",
    totalPrice: "۵۶۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۹/۰۳",
    address: "تهران - خیابان اندرزگو - خیابان کاوه - پلاک ۱۴",
    deliveredTime: "۱۴۰۲/۰۹/۰۵",
  },
  {
    id: 16,
    userName: "نازنین رجبی",
    totalPrice: "۷۵۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۹/۰۸",
    address: "تهران - خیابان میرداماد - خیابان نیکبخت - پلاک ۹",
    deliveredTime: "۱۴۰۲/۰۹/۱۰",
  },
  {
    id: 17,
    userName: "مصطفی کریمی",
    totalPrice: "۶۴۰,۰۰۰",
    orderTime: "۱۴۰۲/۱۰/۱۱",
    address: "تهران - خیابان شریعتی - خیابان شهید سعیدی - پلاک ۳",
    deliveredTime: "۱۴۰۲/۱۰/۱۳",
  },
  {
    id: 18,
    userName: "فاطمه عبدالهی",
    totalPrice: "۳۲۰,۰۰۰",
    orderTime: "۱۴۰۲/۱۰/۱۵",
    address: "تهران - خیابان جمهوری - خیابان آفریقا - پلاک ۱۰",
    deliveredTime: "۱۴۰۲/۱۰/۱۷",
  },
  {
    id: 19,
    userName: "رامین رحمانی",
    totalPrice: "۵۸۰,۰۰۰",
    orderTime: "۱۴۰۲/۱۱/۰۵",
    address: "تهران - خیابان ولیعصر - خیابان نیاوران - پلاک ۲۲",
    deliveredTime: "۱۴۰۲/۱۱/۰۷",
  },
  {
    id: 20,
    userName: "ناهید اکبری",
    totalPrice: "۷۴۰,۰۰۰",
    orderTime: "۱۴۰۲/۱۱/۱۱",
    address: "تهران - خیابان شهید بهشتی - خیابان انقلاب - پلاک ۴",
    deliveredTime: "۱۴۰۲/۱۱/۱۳",
  },
  {
    id: 21,
    userName: "حمیدرضا خسروی",
    totalPrice: "۵۵۰,۰۰۰",
    orderTime: "۱۴۰۲/۱۲/۱۵",
    address: "تهران - خیابان انقلاب - خیابان کارگر شمالی - پلاک ۴۴",
    deliveredTime: "۱۴۰۲/۱۲/۱۷",
  },
  {
    id: 22,
    userName: "سحر محمدی",
    totalPrice: "۶۶۰,۰۰۰",
    orderTime: "۱۴۰۲/۱۲/۲۲",
    address: "تهران - خیابان ولیعصر - خیابان جمهوری - پلاک ۶",
    deliveredTime: "۱۴۰۲/۱۲/۲۴",
  },
  {
    id: 23,
    userName: "سارا حسینی",
    totalPrice: "۴۲۰,۰۰۰",
    orderTime: "۱۴۰۳/۰۱/۱۱",
    address: "تهران - خیابان ونک - خیابان کریمی - پلاک ۱۷",
    deliveredTime: "۱۴۰۳/۰۱/۱۳",
  },
  {
    id: 24,
    userName: "علی جعفری",
    totalPrice: "۳۸۰,۰۰۰",
    orderTime: "۱۴۰۳/۰۲/۱۵",
    address: "تهران - خیابان شهید بهشتی - خیابان شریعتی - پلاک ۲۲",
    deliveredTime: "۱۴۰۳/۰۲/۱۷",
  },
  {
    id: 25,
    userName: "نازنین میرزایی",
    totalPrice: "۵۶۰,۰۰۰",
    orderTime: "۱۴۰۳/۰۳/۰۳",
    address: "تهران - خیابان میرداماد - خیابان شهرآرا - پلاک ۱۰",
    deliveredTime: "۱۴۰۳/۰۳/۰۵",
  },
  {
    id: 26,
    userName: "علی رضایی",
    totalPrice: "۷۵۰,۰۰۰",
    orderTime: "۱۴۰۳/۰۴/۰۸",
    address: "تهران - خیابان جمهوری - خیابان نیکبخت - پلاک ۲۵",
    deliveredTime: "۱۴۰۳/۰۴/۱۰",
  },
  {
    id: 27,
    userName: "لیلا محمدی",
    totalPrice: "۶۴۰,۰۰۰",
    orderTime: "۱۴۰۳/۰۵/۱۴",
    address: "تهران - خیابان انقلاب - خیابان کارگر شمالی - پلاک ۱۴",
    deliveredTime: "۱۴۰۳/۰۵/۱۶",
  },
];

const ProgressingOrders = () => {
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
      className: "font-secondary",
    },
    {
      title: "مجموع مبلغ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: "font-secondary",
    },
    {
      title: "زمان ثبت سفارش",
      dataIndex: "orderTime",
      className: "font-secondary",
      key: "orderTime",
      sorter: (a, b) =>
        moment(b.orderTime, "jYYYY/jMM/jDD").diff(
          moment(a.orderTime, "jYYYY/jMM/jDD")
        ),
      sortOrder: sortedInfo.columnKey === "orderTime" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "مجموع مبلغ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: "font-secondary",
    },
    {
      title: "بررسی وضعت سفارش",
      render: renderEditColumn,
      className: "font-secondary",
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
        dataSource={data2}
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
