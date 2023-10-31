import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../../styles/index.css";
import { useEffect } from "react";
import LexicalTextEditor from "../forms/LexicalEditor";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  width: 700,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

export default function AddEditProductModal({ onOpen, onClose }) {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [description, setDescription] = useState("");
  const [fileError, setFileError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (formData) => {
    const data = {
      name: formData.name,
      category: selectedCategory,
      description,
      images: imageFile,
      subcategory: selectedSubcategory,
      brand: formData.brand,
      price: formData.price,
      quantity: formData.quantity,
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

  return (
    <div className="font-secondary">
      <Modal
        open={onOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md font-secondary">
          <h1 className="mb-8 font-bold text-xl">Add products</h1>

          <form className="flex gap-10 justify-center">
            <div className="flex flex-col gap-5">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required!" }}
                render={({ field }) => (
                  <TextField
                    label="Name"
                    fullWidth
                    size="small"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="brand"
                control={control}
                defaultValue=""
                rules={{ required: "Brand is required!" }}
                render={({ field }) => (
                  <TextField
                    label="Brand"
                    fullWidth
                    size="small"
                    {...field}
                    error={!!errors.brand}
                    helperText={errors.brand?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                defaultValue=""
                rules={{ required: "price is required!" }}
                render={({ field }) => (
                  <TextField
                    label="Price"
                    fullWidth
                    size="small"
                    {...field}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                rules={{ required: "quantity is required!" }}
                render={({ field }) => (
                  <TextField
                    label="Quantity"
                    fullWidth
                    size="small"
                    {...field}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                )}
              />
              <Controller
                name="selectedCategory"
                control={control}
                defaultValue=""
                rules={{ required: "Category is required!" }}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={field.value}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      label="Category"
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
                rules={{ required: "Subcategory is required!" }}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">
                      Subcategory
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={field.value}
                      onChange={(e) => {
                        setSelectedSubcategory(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      label="Subcategory"
                      className="font-secondary"
                      required
                    >
                      {subcategory
                        .filter(
                          (subcategory) =>
                            subcategory.category === selectedCategory
                        )
                        .map((subcategory) => (
                          <MenuItem
                            key={subcategory._id}
                            value={subcategory._id}
                          >
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
            </div>

            <div className="flex flex-col gap-5">
              <LexicalTextEditor onChange={handleDescriptionChange} />

              <Upload
                listType="picture-card"
                required
                showUploadList={true}
                beforeUpload={(file) => {
                  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
                  const fileExtension = file.name
                    .split(".")
                    .pop()
                    .toLowerCase();
                  if (!allowedExtensions.includes(fileExtension)) {
                    setFileError(
                      "Please select a valid image file (jpg, jpeg, png, or gif)."
                    );
                    return false;
                  }
                  const maxSizeInBytes = 5 * 1024 * 1024;
                  if (file.size > maxSizeInBytes) {
                    setFileError("The selected image must be less than 5MB.");
                    return false;
                  }
                  setFileError("");
                  setImageFile(file);
                  return false;
                }}
                onChange={handleImage}
                type="file"
                name="file"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload image</div>
                </div>
              </Upload>

              {fileError && (
                <p className="text-red-600 text-[12px] font-light">
                  {fileError}
                </p>
              )}
            </div>
          </form>
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="font-secondary w-full flex justify-center items-center py-4 bg-[#141B2D] text-white hover:bg-transparent hover:text-white"
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
