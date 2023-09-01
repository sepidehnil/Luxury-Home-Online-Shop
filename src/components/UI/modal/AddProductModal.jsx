import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../../styles/index.css";
import closeBtn from "../../../assets/svg/closeBtn.svg";
import { useEffect } from "react";
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

export default function AddEditProductModal({ onOpen, onClose }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      name,
      category: selectedCategory,
      description,
      images: imageFile,
      subcategory: selectedSubcategory,
      brand,
      price,
      quantity,
    };
    console.log(data);
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
    privateAxios.post("/products", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    onClose();
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleCancel = () => {
    onClose();
  };
  function handleImage(e) {
    console.log(e.target.files);
    setImageFile([e.target.files[0]]);
  }

  useEffect(() => {
    privateAxios.get("/categories").then((res) => {
      setCategory(res.data.data.categories);
    });
    privateAxios.get("/subcategories").then((response) => {
      setSubCategory(response.data.data.subcategories);
    });
  }, []);
  return (
    <div className="font-secondary">
      <Modal
        open={onOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="rounded-md font-secondary flex flex-col gap-3"
        >
          <Typography>اضافه کردن کالا</Typography>
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
          {/* <FormControl fullWidth size="small">
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
          </FormControl> */}
          {/* <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">دسته بندی</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={subcategory}
              label="دسته بندی"
              className="font-secondary"
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <MenuItem value="اتاق خواب">اتاق خواب</MenuItem>
              <MenuItem value="آشپزخانه">آشپزخانه</MenuItem>
              <MenuItem value="سرویس بهداشتی">سرویس بهداشتی</MenuItem>
              <MenuItem value="سالن پذیرایی">سالن پذیرایی</MenuItem>
            </Select>
          </FormControl> */}
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">دسته بندی</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedCategory}
              label="دسته بندی"
              className="font-secondary"
              onChange={(e) => {
                setSelectedCategory(e.target.value),
                  console.log(e.target.value);
              }}
            >
              {category.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">زیربخش</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedSubcategory}
              label="زیربخش"
              className="font-secondary"
              onChange={(e) => {
                setSelectedSubcategory(e.target.value);
                console.log(e.target.value);
              }}
            >
              {subcategory
                .filter(
                  (subcategory) => subcategory.category === selectedCategory
                )
                .map((subcategory) => (
                  <MenuItem key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <LexicalTextEditor onChange={handleDescriptionChange} />

          <Upload
            listType="picture-card"
            showUploadList={true}
            beforeUpload={(file) => {
              setImageFile(file);
              return false;
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
