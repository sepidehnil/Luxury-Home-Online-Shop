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
import { useForm, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";

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

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
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
    const response = await privateAxios.post("/products", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const newProduct = response.data.data.product;
    console.log(newProduct);
    onClose(newProduct);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
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

  console.log(subcategory);
  console.log(name);
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
            // {...register("name", { required: "نام کالا الزامی است." })}
            // error={!!errors.name}
            // helperText={errors.name?.message}
          />
          <TextField
            label="برند کالا"
            fullWidth
            size="small"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            // {...register("brand", { required: "نام برند کالا الزامی است." })}
            // error={!!errors.brand}
            // helperText={errors.brand?.message}
          />
          <TextField
            label="قیمت کالا "
            fullWidth
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            // {...register("price", { required: "قیمت کالا الزامی است." })}
            // error={!!errors.price}
            // helperText={errors.price?.message}
          />
          <TextField
            label="تعداد کالا "
            fullWidth
            size="small"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            // {...register("quantity", { required: "تعداد کالا الزامی است." })}
            // error={!!errors.quantity}
            // helperText={errors.quantity?.message}
          />
          <Controller
            name="selectedCategory"
            control={control}
            defaultValue=""
            rules={{ required: "دسته بندی الزامی است." }}
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small-label">دسته بندی</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={field.value}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    field.onChange(e.target.value);
                  }}
                  label="دسته بندی"
                  className="font-secondary"
                  required
                >
                  {category.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors.selectedCategory}>
                  {errors.selectedCategory?.message}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="selectedSubcategory"
            control={control}
            defaultValue=""
            rules={{ required: "زیربخش الزامی است." }}
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small-label">زیربخش</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={field.value}
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value);
                    field.onChange(e.target.value);
                  }}
                  label="زیربخش"
                  className="font-secondary"
                  required
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
                <FormHelperText error={!!errors.selectedSubcategory}>
                  {errors.selectedSubcategory?.message}
                </FormHelperText>
              </FormControl>
            )}
          />

          <LexicalTextEditor onChange={handleDescriptionChange} />

          <Upload
            listType="picture-card"
            required
            showUploadList={true}
            beforeUpload={(file) => {
              // Check if the file is an image (you can add more checks here)
              // if (!file.type.startsWith("image/")) {
              //   message.error("لطفاً یک تصویر انتخاب کنید.");
              //   return false; // Prevent the upload
              // }

              // // Check the file size (in bytes)
              // const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
              // if (file.size > maxSizeInBytes) {
              //   message.error("تصویر انتخابی باید کمتر از 5 مگابایت باشد.");
              //   return false; // Prevent the upload
              // }

              setImageFile(file);
              return false; // Prevent the default behavior of the Upload component
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

          <Button onClick={handleSubmit(onSubmit)} className="font-secondary">
            ذخیره
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
