import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Table, Image } from "antd";
import { useContext } from "react";
import CartContext from "../../context/cart-context";
import { useState } from "react";
import deleteIcon from "../../assets/svg/deleteIcon.svg";
import DeleteModal from "../../components/UI/modal/DeleteModal";
import PagesHeader from "../../components/UI/header/PagesHeader";

function Cart() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const navigate = useNavigate();
  function shipping() {
    navigate("/shipping");
  }

  const cartCtx = useContext(CartContext);
  let totalAmount = `${cartCtx.totalAmount}`;
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
      title: "عکس کالا",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Image
          src={`http://localhost:8000/images/products/images/${images}`}
          width={120}
          height={120}
        />
      ),
    },
    {
      title: "نام کالا",
      dataIndex: "name",
      className: "font-secondary text-md w-[300px] text-center",
    },
    {
      title: "قیمت",
      dataIndex: "price",
      className: "font-secondary text-md w-[180px] text-center",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
      render: (price) => (
        <span>
          {price.toLocaleString("fa-IR")} {/* Format with commas */}
        </span>
      ),
    },
    {
      title: "تعداد",
      dataIndex: "quantity",
      className: "font-secondary text-md w-[180px] text-center",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "ویرایش",
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
          className="py-[1px] px-2 text-lg border-2 border-[#FDD263] rounded-lg hover:border-[#7AA668]"
        >
          -
        </button>
        <div className="text-md"> {item.amount.toLocaleString("fa-IR")}</div>
        <button
          onClick={() => cartItemAddHandler(item)}
          className="py-[1px] px-2 text-lg border-2 border-[#FDD263] rounded-lg hover:border-[#7AA668]"
        >
          +
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

  function latinToPersianNumber(number) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return number.toString().replace(/\d/g, (digit) => {
      return persianDigits[digit];
    });
  }
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formattedTotalAmount = latinToPersianNumber(
    formatNumberWithCommas(Number(totalAmount))
  );

  const footerContent = (
    <tfoot>
      <tr className="flex items-center gap-[700px]">
        <td colSpan="4" className="font-secondary text-lg">
          {hasItems ? (
            <div> جمع کل :{formattedTotalAmount.toLocaleString("fa-IR")}</div>
          ) : (
            (totalAmount = 0)
          )}
        </td>
        <td>
          {hasItems && (
            <button
              onClick={shipping}
              className="bg-[#141B2D] p-2 rounded-lg font-secondary text-white"
            >
              نهایی کردن سبد خرید
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
          // Render the custom footer
          footer={() => footerContent}
        />
      </div>
    </div>
  );
}
export default Cart;
