import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "antd";
import "../../../styles/index.css";
import closeBtn from "../../../assets/svg/closeBtn.svg";

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
      <Modal open={open} onClose={onClose}>
        <div className="modal-container">
          <Typography variant="h6">
            {isEditing ? "Edit Product" : "Add Product"}
          </Typography>
          <TextField
            label="Product Name"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
              {/* Add more categories */}
            </Select>
          </FormControl>
          {/* Add other input fields for product details */}
          <Button onClick={handleSave}>
            {isEditing ? "Save Changes" : "Add Product"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
