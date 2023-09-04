import { useNavigate } from "react-router-dom";
import React from "react";
import { Table } from "antd";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

function Cart() {
  const navigate = useNavigate();
  function shipping() {
    navigate("/shipping");
  }

  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {};

  const cartItemAddHandler = (item) => {
    if (item.amount < item.quantity) {
      cartCtx.addItem({ ...item, amount: 1 });
    }
  };

  const columns = [
    {
      title: "نام کالا",
      dataIndex: "name",
    },
    {
      title: "قیمت",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "تعداد",
      dataIndex: "quantity",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "",
      dataIndex: "edit",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];
  const data = cartCtx.items.map((item) => ({
    key: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    quantity: (
      <div>
        <button onClick={() => cartItemRemoveHandler(item)}> - </button>
        {item.amount}
        <button onClick={() => cartItemAddHandler(item)}> + </button>
      </div>
    ),
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />;
      <div>جمع کل:{totalAmount}</div>
      {hasItems && (
        <button onClick={shipping} className="border-2 border-rose-600 ">
          نهایی کردن سبد خرید
        </button>
      )}
    </div>
  );
}
export default Cart;
