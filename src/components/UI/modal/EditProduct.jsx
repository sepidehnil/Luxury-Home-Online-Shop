import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../../styles/index.css";
import LexicalTextEditor from "../forms/LexicalEditor";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import privateAxios from "../../../services/instances/privateAxios";
import "react-toastify/dist/ReactToastify.css";
import { useForm, Controller } from "react-hook-form";

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

export async function convertImage(value) {
  if (typeof value === "string") {
    try {
      const url = `http://localhost:8000/images/products/images/${value}`;
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      console.log(file);
      return file;
    } catch (error) {
      throw new Error("can not convert that image to file");
    }
  } else {
    return value;
  }
}

export async function handleMedias(images) {
  let isAllString = images.find((item) => typeof item !== "string")
    ? false
    : true;

  const medias = [];

  if (!isAllString) {
    for (let index = 0; index < images.length; index++) {
      const mediaFile = await convertImage(images[index]);
      medias.push(mediaFile);
    }
    return medias;
  } else {
    return undefined;
  }
}

export default function EditProduct({ open, onClose, product }) {
  const [categoryy, setCategory] = useState([]);
  const [subcategoryy, setSubCategory] = useState([]);
  const [name, setName] = useState(product ? product.name : "");
  const [imageFile, setImageFile] = useState(product ? product.images : []);
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [price, setPrice] = useState(product ? product.price : "");
  const [quantity, setQuantity] = useState(product ? product.quantity : "");
  const [brand, setBrand] = useState(product ? product.brand : "");
  const [selectedCategory, setSelectedCategory] = useState(
    product ? product.category : ""
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    product ? product.subcategory : ""
  );

  // const onRemove = (file) => {
  //   const updatedImageFile = imageFile.filter((item) => item !== file.name);
  //   setImageFile(updatedImageFile);
  // };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (e) => {
    console.log(imageFile);
    console.log(product);

    const media = await handleMedias(imageFile);

    const updatedData = {
      name,
      description,
      brand,
      price,
      quantity,
      category: selectedCategory,
      subcategory: selectedSubcategory,
    };

    const form = new FormData();
    for (const key in updatedData) {
      const value = updatedData[key];
      if (Array.isArray(value)) {
        value.forEach((v) => {
          form.append(key, v);
        });
      } else {
        form.append(key, value);
      }
    }

    if (media) {
      media.forEach((m) => {
        form.append("images", m);
      });
    }
    console.log(updatedData);

    privateAxios
      .patch(`/products/${product._id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };
  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  useEffect(() => {
    privateAxios.get("/categories").then((res) => {
      setCategory(res.data.data.categories);
      const matchedCategory = res.data.data.categories.find(
        (category) => category.name === product.category
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory._id);
      }
    });
    privateAxios.get("/subcategories").then((response) => {
      setSubCategory(response.data.data.subcategories);
    });
  }, [product.category]);

  return (
    <div className="font-secondary ">
      <Modal
        open={open}
        onClose={onClose}
        product={product}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="rounded-md flex flex-col gap-3 font-secondary"
        >
          <h1 className="mb-8 font-bold text-xl">Edit products</h1>
          <form className="flex gap-10 justify-center">
            <div className="flex flex-col gap-5">
              <Controller
                name="name"
                control={control}
                defaultValue={name}
                rules={{ required: "Name is required!" }}
                render={({ field }) => (
                  <TextField
                    label="Name"
                    fullWidth
                    size="small"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setName(e.target.value); // Update the name state
                    }}
                  />
                )}
              />
              <Controller
                name="brand"
                control={control}
                defaultValue={brand}
                rules={{ required: "Brand is required!" }}
                render={({ field }) => (
                  <TextField
                    label="Brand"
                    fullWidth
                    size="small"
                    {...field}
                    error={!!errors.brand}
                    helperText={errors.brand?.message}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setBrand(e.target.value); // Update the name state
                    }}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                defaultValue={price}
                rules={{ required: "price is required!" }}
                render={({ field }) => (
                  <TextField
                    label="Price"
                    fullWidth
                    size="small"
                    {...field}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPrice(e.target.value);
                    }}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                defaultValue={quantity}
                rules={{ required: "quantity is required!" }}
                render={({ field }) => (
                  <TextField
                    label="Quantity"
                    fullWidth
                    size="small"
                    {...field}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setQuantity(e.target.value);
                    }}
                  />
                )}
              />
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small-label">Category</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedCategory}
                  label="Category"
                  className="font-secondary"
                  onChange={(e) => {
                    setSelectedCategory(e.target.value),
                      console.log(e.target.value);
                  }}
                >
                  {categoryy.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small-label">
                  Subcategory
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedSubcategory}
                  label="Subcategory"
                  className="font-secondary"
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {subcategoryy
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
            </div>

            <div className="flex flex-col gap-5">
              <LexicalTextEditor
                onChange={handleDescriptionChange}
                defaultText={description}
              />
              <Upload
                listType="picture-card"
                showUploadList={true}
                beforeUpload={(file) => {
                  setImageFile((data) => [...data, file]);
                  return false;
                }}
                type="file"
                name="file"
                defaultFileList={product.images.map((image, index) => ({
                  uid: index,
                  name: image,
                  status: "done",
                  url: `http://localhost:8000/images/products/images/${image}`,
                }))}
                // onRemove={onRemove}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Image</div>
                </div>
              </Upload>
            </div>
          </form>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="font-secondary w-full flex justify-center items-center py-4 bg-[#141B2D] text-white hover:bg-transparent hover:text-white mt-8"
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
