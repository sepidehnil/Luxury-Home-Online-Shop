import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Upload } from "antd";
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
import privateAxios from "../../../services/instances/privateAxios";

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

export default function AddEditProductModal({ onOpen, onClose, isEditing }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");

  const handleSave = async () => {
    const data = {
      name,
      category: "64dd7f33b287bb94ddb72926",
      description,
      images: imageFile,
      subcategory: "64dd7f62b287bb94ddb7292d",
      brand,
      price,
      quantity,
    };
    const form = new FormData();
    for (const key in data) {
      const value = data[key];
      if (Array.isArray(value)) {
        value.forEach((v) => {
          form.append(key, v);
        });
      } else {
        form.append(key, value);
      }
    }

    const response = await privateAxios.post("/products", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    onClose();
    window.location.reload();
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  const handleCancel = () => {
    onClose();
  };
  function handleImage(e) {
    console.log(e.target.files);
    setImageFile([e.target.files[0]]);
  }

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
          <TextField
            label="برند کالا"
            fullWidth
            size="small"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            label="قیمت کالا "
            fullWidth
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="تعداد کالا "
            fullWidth
            size="small"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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

          <Upload
            listType="picture-card"
            showUploadList={true}
            beforeUpload={(file) => {
              setImageFile(file);
              return false; // Prevent default behavior (uploading)
            }}
            onChange={handleImage}
            type="file"
            name="file"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>آپلود عکس</div>
            </div>
          </Upload>

          <Button onClick={handleSave} className="font-secondary">
            ذخیره
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
