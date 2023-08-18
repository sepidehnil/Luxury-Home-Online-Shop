import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import moment from "jalali-moment";
import "moment/locale/fa";
import { useParams } from "react-router-dom";
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
  {
    id: 9,
    userName: "زهرا رحمانی",
    totalPrice: "۳۰۰,۰۰۰",
    orderTime: "۱۴۰۲/۰۶/۱۱",
    address: "تهران - خیابان انقلاب - خیابان کارگر شمالی - پلاک ۲۲",
    deliveredTime: "۱۴۰۲/۰۶/۱۲",
  },
];

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
  const paginationConfig = {
    pageSize: 8,
  };
  if (condition) {
    
  }
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
export default OrdersTable;
