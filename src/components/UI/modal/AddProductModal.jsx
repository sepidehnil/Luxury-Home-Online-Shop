import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "antd";
import "../../../styles/index.css";
import closeBtn from "../../../assets/svg/closeBtn.svg";
import LexicalTextEditor from "../forms/LexicalEditor";

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

export default function BasicModal({ onOpen, onClose, onSave }) {
  const handleSaveBtn = () => {
    onSave();
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="font-secondary">
      <Modal
        open={onOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className=" rounded-md">
          <img src={closeBtn} onClick={handleCancel} />
          <LexicalTextEditor />
          <Button onClick={handleSaveBtn}>ذخیره</Button>
        </Box>
      </Modal>
    </div>
  );
}
