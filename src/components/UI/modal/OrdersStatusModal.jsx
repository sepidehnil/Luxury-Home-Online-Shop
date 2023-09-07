import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "antd";
import "../../../styles/index.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

export default function OrdersStatusModal({ open, onClose, onConfirm }) {
  const handelDeleteItem = () => {
    onConfirm();
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="font-secondary">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="none rounded-md">
          <h1>نمایش سفارش</h1>
          <div>
            <div>نام مشتری: </div>
            <div>ادرس: </div>
            <div>تلفن: </div>
            <div>زمان تحویل: </div>
            <div>زمان سفارش: </div>
            <div></div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
