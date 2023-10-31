import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Table, Image } from "antd";
import { useContext } from "react";
import CartContext from "../../context/cart-context";
import { useState } from "react";
import deleteIcon from "../../assets/svg/deleteIcon.svg";
import DeleteModal from "../../components/UI/modal/DeleteModal";
import PagesHeader from "../../components/UI/header/PagesHeader";
import minus from "../../assets/svg/minus.svg";
import plus from "../../assets/svg/plus.svg";

function Cart() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const navigate = useNavigate();
  function shipping() {
    navigate("/shipping");
  }

  const cartCtx = useContext(CartContext);
  let totalAmount = `${cartCtx.totalAmount.toLocaleString()}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
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
      title: "image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Image
          src={`http://localhost:8000/images/products/images/${images}`}
          width={200}
          height={150}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      className: "font-secondary text-md w-[500px] text-center",
    },
    {
      title: "Price",
      dataIndex: "price",
      className: "font-secondary text-md w-[180px] text-center",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
      render: (price) => <span>$ {price.toLocaleString()}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      className: "font-secondary text-md w-[180px] text-center",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      className: "w-[150px] font-secondary text-md text-center",
      render: (record) => renderEditColumn(record),
    },
  ];

  const data = cartCtx.items.map((item) => ({
    key: item.id,
    name: item.name,
    price: item.price,
    edit: item.id,
    images: item.imageUrl[0],
    quantity: (
      <div className="flex items-center gap-4 justify-center">
        <button
          onClick={() => cartItemRemoveHandler(item.id)}
          className="py-[5px] px-3 border-2 border-[#FDD263] rounded-lg hover:border-[#7AA668]"
          disabled={item.amount <= 1}
        >
          <img src={minus} />
        </button>
        <div className="text-md"> {item.amount}</div>
        <button
          onClick={() => cartItemAddHandler(item)}
          className="py-[5px] px-3 border-2 border-[#FDD263] rounded-lg hover:border-[#7AA668]"
        >
          <img src={plus} />
        </button>
      </div>
    ),
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const paginationConfig = {
    pageSize: 3,
  };

  const footerContent = (
    <tfoot>
      <tr className="flex items-center justify-between">
        <td className="font-secondary text-lg">
          {hasItems ? (
            <div>Total amount : $ {totalAmount.toLocaleString()}</div>
          ) : (
            <div>Total amount : 0</div>
          )}
        </td>
        <td>
          {hasItems && (
            <button
              onClick={shipping}
              className="bg-[#141B2D] p-2 rounded-lg font-secondary text-white"
            >
              Place order
            </button>
          )}
        </td>
      </tr>
    </tfoot>
  );

  return (
    <div>
      {open && (
        <DeleteModal
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirmDelete}
        />
      )}
      <PagesHeader />
      <div className="font-secondary rounded-lg">
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={paginationConfig}
          className="font-secondary flex justify-center items-center mt-14"
          components={{
            header: {
              cell: ({ children }) => (
                <th
                  style={{
                    background: "#141B2D",
                    borderTop: "none",
                    fontSize: "1rem",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {children}
                </th>
              ),
            },
          }}
          footer={() => footerContent}
        />
      </div>
    </div>
  );
}
export default Cart;
