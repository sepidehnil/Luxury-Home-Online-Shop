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
            Are you sure to delete this item?
          </div>
          <div className="flex gap-5 justify-center">
            <Button
              className="font-secondary bg-[#141B2D] hover:px-5 border-2 border-gray-300 text-white"
              onClick={handleCancel}
            >
              No
            </Button>
            <Button
              className="font-secondary  hover:px-5"
              onClick={handelDeleteItem}
            >
              Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
