import { useNavigate } from "react-router-dom";
import React from "react";
import { Table } from "antd";
import { useContext } from "react";
import CartContext from "../../context/cart-context";
import { useState } from "react";
import deleteIcon from "../../assets/svg/deleteIcon.svg";
import DeleteModal from "../../components/UI/modal/DeleteModal";

function Cart() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const navigate = useNavigate();
  function shipping() {
    navigate("/shipping");
  }

  const cartCtx = useContext(CartContext);
  const totalAmount = `${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    if (item.amount < item.quantity) {
      cartCtx.addItem({ ...item, amount: 1 });
    }
  };

  const renderEditColumn = (record) => {
    const handleOpen = () => {
      console.log("Clicked item id:", record);
      setSelectedItem(record);
      setOpen(true);
    };
    return (
      <div className="flex gap-6 justify-center">
        <img src={deleteIcon} onClick={handleOpen} />
      </div>
    );
  };

  function handleConfirmDelete() {
    if (selectedItem) {
      cartCtx.clearCart(selectedItem);
      setOpen(false);
    }
  }

  const handleClose = () => setOpen(false);

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
      title: "ویرایش",
      dataIndex: "edit",
      key: "edit",
      className: "w-[150px] ",
      render: (record) => renderEditColumn(record),
    },
  ];

  const data = cartCtx.items.map((item) => ({
    key: item.id,
    name: item.name,
    price: item.price,
    edit: item.id,
    quantity: (
      <div>
        <button onClick={() => cartItemRemoveHandler(item.id)}> - </button>
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
      {open && (
        <DeleteModal
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirmDelete}
        />
      )}
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
