// import React, { useState, useEffect } from "react";
// import { Button, Space, Table, Input } from "antd";
// import editLogo from "../../../assets/svg/editIcon.svg";
// import deleteIcon from "../../../assets/svg/deleteIcon.svg";
// import axios from "axios";

// // const data = [
// //   {
// //     key: "1",
// //     name: "John Brown",
// //     age: 32,
// //     address: "New York No. 1 Lake Park",
// //   },
// //   {
// //     key: "2",
// //     name: "Jim Green",
// //     age: 42,
// //     address: "London No. 1 Lake Park",
// //   },
// //   {
// //     key: "3",
// //     name: "Joe Black",
// //     age: 32,
// //     address: "Sydney No. 1 Lake Park",
// //   },
// //   {
// //     key: "4",
// //     name: "Jim Red",
// //     age: 32,
// //     address: "London No. 2 Lake Park",
// //   },
// // ];
// const InstockTable = () => {
//   const [data, setData] = useState([]);
//   const [filteredInfo, setFilteredInfo] = useState({});
//   const [editingKey, setEditingKey] = useState(""); //

//   const loadUserData = async () => {
//     const resposeProducts = await axios.get(
//       "http://localhost:8000/api/products",
//       {
//         params: { limit: 34 },
//       }
//     );
//     const responseCategories = await axios.get(
//       "http://localhost:8000/api/categories"
//     );
//     const products = resposeProducts.data.data.products;
//     const categories = responseCategories.data.data.categories;
//     const alldatas = products.map((product) => ({
//       ...product,
//       category: categories.find((category) => category._id === product.category)
//         ?.name,
//       price: product.price,
//     }));
//     return alldatas;
//   };
//   useEffect(() => {
//     loadUserData().then((alldatas) => {
//       setData(alldatas);
//     });
//   }, []);

//   const handleChange = (pagination, filters) => {
//     console.log("Various parameters", pagination, filters);
//     setFilteredInfo(filters);
//   };
//   const clearFilters = () => {
//     setFilteredInfo({});
//   };

//   const handleCellEditChange = (value, record, dataIndex) => {
//     const newData = [...data];
//     const target = newData.find((item) => item.key === record.key);

//     if (target) {
//       target[dataIndex] = value;
//       setData(newData);
//     }
//   };

//   const handleCellEditSave = async (record) => {
//     if (!editingKey) {
//       return;
//     }

//     try {
//       // Perform your save/update logic here
//       // For example, update the record using an API request
//       const response = await axios.put(
//         `http://localhost:8000/api/products/${record.key}`,
//         record
//       );

//       if (response.status === 200) {
//         message.success("تغییرات با موفقیت ذخیره شد.");
//       } else {
//         message.error("خطا در ذخیره تغییرات.");
//       }
//     } catch (error) {
//       message.error("خطا در ذخیره تغییرات.");
//     }

//     setEditingKey("");
//   };

//   const isEditing = (record) => record.key === editingKey;

//   const edit = (record) => {
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey("");
//   };

//   const columns = [
//     {
//       title: "نام کالا",
//       dataIndex: "name",
//       key: "name",
//       className: "font-secondary text-center",
//     },
//     {
//       title: "دسته بندی",
//       dataIndex: "category",
//       key: "category",
//       className: "font-secondary text-center",
//       filters: [
//         {
//           text: "اتاق خواب",
//           value: "اتاق خواب",
//         },
//         {
//           text: "سالن نشیمن",
//           value: "سالن نشیمن",
//         },
//         {
//           text: "آشپزخانه",
//           value: "آشپزخانه",
//         },
//         {
//           text: "سزویس بهداشتی",
//           value: "سزویس بهداشتی",
//         },
//       ],
//       filteredValue: filteredInfo.category || null,
//       onFilter: (value, record) => record.category.includes(value),
//       ellipsis: true,
//     },
//     {
//       title: "قیمت",
//       dataIndex: "price",
//       key: "price",
//       editable: true,
//       className: "font-secondary text-center",
//       render: (text, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <Input
//             value={text}
//             onChange={(e) =>
//               handleCellEditChange(e.target.value, record, "price")
//             }
//             onPressEnter={() => handleCellEditSave(record)}
//             onBlur={() => handleCellEditSave(record)}
//           />
//         ) : (
//           <div onClick={() => edit(record)}>{text}</div>
//         );
//       },
//     },
//     {
//       title: "موجودی",
//       dataIndex: "quantity",
//       key: "quantity",
//       editable: true,
//       className: "w-[150px] text-center",
//       render: (text, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <Input
//             value={text}
//             onChange={(e) =>
//               handleCellEditChange(e.target.value, record, "quantity")
//             }
//             onPressEnter={() => handleCellEditSave(record)}
//             onBlur={() => handleCellEditSave(record)}
//           />
//         ) : (
//           <div onClick={() => edit(record)}>{text}</div>
//         );
//       },
//     },
//   ];
//   const paginationConfig = {
//     pageSize: 8,
//   };

//   return (
//     <>
//       <Space
//         style={{
//           marginBottom: 12,
//         }}
//       >
//         <Button
//           onClick={clearFilters}
//           className="bg-white text-black font-secondary"
//         >
//           حذف فیلرها
//         </Button>
//         <Button className="bg-white text-black font-secondary">ذخیره</Button>
//       </Space>
//       <Table
//         columns={columns}
//         dataSource={data}
//         onChange={handleChange}
//         pagination={paginationConfig}
//         className="font-secondary"
//         components={{
//           header: {
//             cell: ({ children }) => (
//               <th
//                 style={{
//                   background: "#ff8e8e",
//                   borderTop: "none",
//                   fontSize: "1rem",
//                   textAlign: "center",
//                 }}
//               >
//                 {children}
//               </th>
//             ),
//           },
//         }}
//       />
//     </>
//   );
// };
// export default InstockTable;

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridCellModes } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
// } from "@mui/x-data-grid-generator";

function EditToolbar(props) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
    props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === "edit") {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        p: 1,
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        variant="outlined"
      >
        {cellMode === "edit" ? "Save" : "Edit"}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === "view"}
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default function InstockTable() {
  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});
  const [data, setData] = useState([]);

  const handleCellFocus = React.useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === "edit") {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  const handleCellEditStop = React.useCallback((params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  const loadUserData = async () => {
    const resposeProducts = await axios.get(
      "http://localhost:8000/api/products",
      {
        params: { limit: 1000 },
      }
    );
    const products = resposeProducts.data.data.products;
    return products;
  };
  useEffect(() => {
    const fetchData = async () => {
      const products = await loadUserData();
      const alldatasWithIds = products.map((data) => ({
        ...data,
        id: data._id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      }));
      setData(alldatasWithIds);
    };
    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <DataGrid
        rows={data}
        columns={columns}
        onCellKeyDown={handleCellKeyDown}
        cellModesModel={cellModesModel}
        pageSize={4}
        onCellEditStop={handleCellEditStop}
        onCellModesModelChange={(model) => setCellModesModel(model)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel,
          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
        autoPageSize
      />
    </div>
  );
}

const columns = [
  { field: "name", headerName: "نام کالا", width: 180, editable: true },
  {
    field: "price",
    headerName: "قیمت",
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "quantity",
    headerName: "موجودی",
    type: "number",
    width: 180,
    editable: true,
  },
];
