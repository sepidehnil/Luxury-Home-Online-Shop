import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../../styles/index.css";
import closeBtn from "../../../assets/svg/closeBtn.svg";
import LexicalTextEditor from "../forms/LexicalEditor";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";

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

export default function BasicModal({ onOpen, onClose, onSave, isEditing }) {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSaveBtn = () => {
    onSave();
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="font-secondary">
      <Modal
        isEditing={isEditing}
        open={onOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md">
          <img src={closeBtn} onClick={handleCancel} />
          <Typography>{isEditing ? "Edit Product" : "Add Product"}</Typography>
          <TextField label="نام کالا" fullWidth size="small" />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">دسته بندی</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={category}
              label="دسته بندی"
              onChange={handleChange}
              className="font-secondary"
            >
              <MenuItem value={10}>اتاق خواب</MenuItem>
              <MenuItem value={20}>آشپزخانه</MenuItem>
              <MenuItem value={30}>سرویس بهداشتی</MenuItem>
              <MenuItem value={40}>سالن پذیرایی</MenuItem>
            </Select>
          </FormControl>
          <LexicalTextEditor />
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>آپلود عکس</div>
              </div>
            </Upload>
          </Form.Item>
          <Button onClick={handleSaveBtn} className="font-secondary">
            ذخیره
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
