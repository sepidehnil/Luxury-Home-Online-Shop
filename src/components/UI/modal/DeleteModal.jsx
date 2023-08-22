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

export default function BasicModal({ open, onClose, onConfirm }) {
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
          <div className="font-secondary mb-6">
            ایا مطمئن به حذف این کالا هستید؟
          </div>
          <div className="flex gap-5 justify-center">
            <Button
              className="font-secondary bg-[#191D88] text-[#FFC436] hover:px-5"
              onClick={handelDeleteItem}
            >
              بله
            </Button>
            <Button
              className="font-secondary bg-[#FFC436] text-[#191D88] hover:px-5"
              onClick={handleCancel}
            >
              خیر
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
