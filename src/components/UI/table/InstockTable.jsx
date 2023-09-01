import * as React from "react";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InstockTable() {
  const [data, setData] = useState([]);
  const [editedRows, setEditedRows] = useState(new Set());
  const [editedCells, setEditedCell] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const loadUserData = async () => {
    const resposeProducts = await axios.get(
      "http://localhost:8000/api/products",
      {
        params: { limit: 1000 },
      }
    );
    const responseCategories = await axios.get(
      "http://localhost:8000/api/categories"
    );
    const products = resposeProducts.data.data.products;
    const categories = responseCategories.data.data.categories;
    const alldatas = products.map((product) => ({
      ...product,
      category: categories.find((category) => category._id === product.category)
        ?.name,
      price: product.price,
      __original: { ...product },
    }));
    return alldatas;
  };

  useEffect(() => {
    loadUserData().then((alldatas) => {
      setData(alldatas);
    });
  }, []);

  const getRowId = (row) => row._id;

  const handleCellEditStart = (params) => {
    setEditedRows((prevEditedRows) => new Set(prevEditedRows.add(params.id)));
    setIsEditing(true);
  };

  const handleCellEditStop = (params, event) => {
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveChanges = async () => {
    const editedPrices = [];
    const editedQuantities = [];
    editedCells.forEach((cell) => {
      if (cell.field === "price") {
        editedPrices.push({
          id: cell.id,
          value: cell.value,
        });
      } else if (cell.field === "quantity") {
        editedQuantities.push({
          id: cell.id,
          value: cell.value,
        });
      }
    });
    console.log("Edited Prices:", editedPrices);
    console.log("Edited Quantities:", editedQuantities);

    const updatePromises = [];

    editedPrices.forEach(async (editedPrice) => {
      const itemId = editedPrice.id;
      const price = editedPrice.value;

      try {
        const response = await axios.patch(
          `http://localhost:8000/api/products/${itemId}`,
          { price } // Send only the changed price
        );
        console.log("Price updated:", response.data);
        updatePromises.push(itemId);
      } catch (error) {
        console.error("Error updating price:", error);
      }
    });

    editedQuantities.forEach(async (editedQuantity) => {
      const itemId = editedQuantity.id;
      const quantity = editedQuantity.value;

      try {
        const response = await axios.patch(
          `http://localhost:8000/api/products/${itemId}`,
          { quantity }
        );
        console.log("Quantity updated:", response.data);
        updatePromises.push(itemId);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    });

    await Promise.all(updatePromises);
    setIsEditing(false);
    window.location.reload();
  };

  const handlekeyCahnge = (key, event) => {
    const isExist = editedCells.find((item) => item.id === key.id);
    if (!!isExist) {
      setTimeout(() => {
        setEditedCell(
          editedCells.map((item) => {
            if (item.id === isExist.id) {
              item.value = event.target.value;
              return item;
            }
            return item;
          })
        );
      }, 500);
    } else {
      setTimeout(() => {
        setEditedCell([
          ...editedCells,
          {
            id: key.id,
            field: key.field,
            value: event.target.value,
          },
        ]);
      }, 500);
    }
    setIsEditing(true);
  };

  console.log(editedCells);
  const headerCellStyle = "bg-[#ff8e8e] font-secondary";
  const rowCellStyle = "bg-white font-secondary";
  return (
    <div style={{ width: "100%", height: 500 }} className="font-secondary">
      <DataGrid
        rows={data.map((row) => ({
          ...row,
          rowClassName: rowCellStyle,
        }))}
        columns={columns.map((column) => ({
          ...column,
          headerClassName: headerCellStyle,
        }))}
        getRowId={getRowId}
        onCellKeyDown={handlekeyCahnge}
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        autoPageSize
      />
      <button
        onClick={handleSaveChanges}
        disabled={!isEditing || editedRows.size === 0}
        style={{ marginTop: "10px" }}
        className={`p-2 rounded-lg ${
          !isEditing || editedRows.size === 0
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-red-100 text-black"
        }`}
      >
        ذخیره تغییرات
      </button>
    </div>
  );
}

const columns = [
  { field: "name", headerName: "نام کالا", width: 598, editable: true },
  {
    field: "price",
    headerName: "قیمت",
    type: "number",
    editable: true,
    align: "center",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "quantity",
    headerName: "موجودی",
    type: "number",
    editable: true,
    align: "center",
    headerAlign: "center",
    width: 200,
  },
];
