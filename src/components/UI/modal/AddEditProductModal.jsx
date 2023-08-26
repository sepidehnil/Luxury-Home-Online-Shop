import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../../styles/index.css";
import closeBtn from "../../../assets/svg/closeBtn.svg";
import LexicalTextEditor from "../forms/LexicalEditor";
import axios from "axios";
import Cookies from "js-cookie";
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
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", imageFile);

    console.log("Form Data:", formData);

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    axios
      .post("http://localhost:8000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          // Other headers if required
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        onSave(); // Optional: Trigger any necessary updates after saving
        onClose();
        console.log("Form Data:", formData);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
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
          <TextField
            label="نام کالا"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">دسته بندی</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={category}
              label="دسته بندی"
              className="font-secondary"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="اتاق خواب">اتاق خواب</MenuItem>
              <MenuItem value="آشپزخانه">آشپزخانه</MenuItem>
              <MenuItem value="سرویس بهداشتی">سرویس بهداشتی</MenuItem>
              <MenuItem value="سالن پذیرایی">سالن پذیرایی</MenuItem>
            </Select>
          </FormControl>
          <LexicalTextEditor onChange={handleDescriptionChange} />
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              showUploadList={true}
              beforeUpload={(file) => {
                setImageFile(file);
                return false; // Prevent default behavior (uploading)
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>آپلود عکس</div>
              </div>
            </Upload>
          </Form.Item>
          <Button onClick={handleSave} className="font-secondary">
            ذخیره
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
