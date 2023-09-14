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

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import { DataGrid, GridCellModes } from "@mui/x-data-grid";
// import { useEffect, useState } from "react";
// import axios from "axios";
// // import {
// //   randomCreatedDate,
// //   randomTraderName,
// //   randomUpdatedDate,
// // } from "@mui/x-data-grid-generator";

// function EditToolbar(props) {
//   const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
//     props;

//   const handleSaveOrEdit = () => {
//     if (!selectedCellParams) {
//       return;
//     }
//     const { id, field } = selectedCellParams;

//     if (cellMode === "edit") {
//       const updatedValue = cellModesModel[id]?.[field]?.value;
//       if (updatedValue !== undefined) {
//         const updatedData = data.map((item) =>
//           item.id === id ? { ...item, [field]: updatedValue } : item
//         );
//         setData(updatedData);
//       }

//       setCellModesModel({
//         ...cellModesModel,
//         [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
//       });
//     } else {
//       setCellModesModel({
//         ...cellModesModel,
//         [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
//       });
//     }
//   };

//   const handleMouseDown = (event) => {
//     event.preventDefault();
//   };
//   return (
//     <Box
//       sx={{
//         borderBottom: 1,
//         borderColor: "divider",
//         p: 1,
//       }}
//     >
//       <Button
//         onClick={handleSaveOrEdit}
//         onMouseDown={handleMouseDown}
//         disabled={!selectedCellParams}
//         variant="outlined"
//       >
//         {cellMode === "edit" ? "Save" : "Edit"}
//       </Button>
//     </Box>
//   );
// }

// export default function InstockTable() {
//   const [selectedCellParams, setSelectedCellParams] = useState(null);
//   const [cellModesModel, setCellModesModel] = useState({});
//   const [data, setData] = useState([]);

//   const handleCellFocus = React.useCallback((event) => {
//     const row = event.currentTarget.parentElement;
//     const id = row.dataset.id;
//     const field = event.currentTarget.dataset.field;
//     setSelectedCellParams({ id, field });
//   }, []);

//   const cellMode = React.useMemo(() => {
//     if (!selectedCellParams) {
//       return "view";
//     }
//     const { id, field } = selectedCellParams;
//     return cellModesModel[id]?.[field]?.mode || "view";
//   }, [cellModesModel, selectedCellParams]);

//   const handleCellEditStop = React.useCallback((params, event) => {
//     event.defaultMuiPrevented = true;
//   }, []);

//   const saveEditedItems = async () => {
//     // Implement your AJAX logic to save edited items
//     const editedItems = Object.entries(cellModesModel)
//       .filter(([_, fields]) => fields.some((field) => field.mode === "edit"))
//       .map(([id, fields]) => ({
//         id,
//         ...fields.reduce((acc, field) => {
//           acc[field.field] = field.value;
//           return acc;
//         }, {}),
//       }));

//     if (editedItems.length > 0) {
//       await Promise.all(
//         editedItems.map(async (item) => {
//           try {
//             await axios.put(
//               `http://localhost:8000/api/products/${item.id}`,
//               item
//             );
//           } catch (error) {
//             console.error("Error saving item:", error);
//           }
//         })
//       );
//     }
//   };

//   const loadUserData = async () => {
//     const resposeProducts = await axios.get(
//       "http://localhost:8000/api/products",
//       {
//         params: { limit: 1000 },
//       }
//     );
//     const products = resposeProducts.data.data.products;
//     return products;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const products = await loadUserData();
//       const alldatasWithIds = products.map((data) => ({
//         ...data,
//         id: data._id,
//         name: data.name,
//         price: data.price,
//         quantity: data.quantity,
//       }));
//       setData(alldatasWithIds);
//     };
//     fetchData();
//   }, []);

//   const handleCancel = () => {
//     if (!selectedCellParams) {
//       return;
//     }
//     const { id, field } = selectedCellParams;
//     setCellModesModel({
//       ...cellModesModel,
//       [id]: {
//         ...cellModesModel[id],
//         [field]: { mode: GridCellModes.View, ignoreModifications: true },
//       },
//     });
//   };

//   return (
//     <div style={{ width: "100%", height: 500 }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         onCellEditStop={handleCellEditStop}
//         cellModesModel={cellModesModel}
//         onKeyDown={(event) => {
//           console.log("Key pressed:", event.key);
//           if (event.key === "Escape") {
//             console.log("Escape key pressed");
//             if (selectedCellParams) {
//               console.log("Selected cell params exist");
//               if (cellMode === "edit") {
//                 console.log("In edit mode");
//                 saveEditedItems(); // Save changes before canceling
//                 handleCancel();
//               }
//             }
//           }
//         }}
//         pageSize={4}
//         onCellModesModelChange={(model) => setCellModesModel(model)}
//         slots={{
//           toolbar: EditToolbar,
//         }}
//         slotProps={{
//           toolbar: {
//             cellMode,
//             selectedCellParams,
//             setSelectedCellParams,
//             cellModesModel,
//             setCellModesModel,
//           },
//           cell: {
//             onFocus: handleCellFocus,
//           },
//         }}
//         autoPageSize
//       />
//     </div>
//   );
// }

// const columns = [
//   { field: "name", headerName: "نام کالا", width: 180, editable: true },
//   {
//     field: "price",
//     headerName: "قیمت",
//     type: "number",
//     editable: true,
//     align: "left",
//     headerAlign: "left",
//   },
//   {
//     field: "quantity",
//     headerName: "موجودی",
//     type: "number",
//     width: 180,
//     editable: true,
//   },
// ];

//////////////
// import * as React from "react";
// import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function DisableStopEditModeOnFocusOut() {
//   const [data, setData] = useState([]);
//   const [editedRows, setEditedRows] = useState(new Set());

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

//   const getRowId = (row) => row._id;

//   const handleCellEditStart = (params) => {
//     setEditedRows((prevEditedRows) => new Set(prevEditedRows.add(params.id)));
//   };

//   const handleCellEditStop = (params, event) => {
//     if (params.reason === GridCellEditStopReasons.cellFocusOut) {
//       setEditedRows((prevEditedRows) => {
//         const updatedEditedRows = new Set(prevEditedRows);
//         updatedEditedRows.delete(params.id);
//         return updatedEditedRows;
//       });
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleSaveChanges = async () => {
//     const editedItems = data.filter((row) => editedRows.has(row._id));

//     await Promise.all(
//       editedItems.map(async (item) => {
//         try {
//           const response = await axios.put(
//             `http://localhost:8000/api/products/${item._id}`,
//             item
//           );
//           console.log("Item saved:", response.data);
//         } catch (error) {
//           console.error("Error saving item:", error);
//         }
//       })
//     );

//     setEditedRows(new Set());
//   };

//   return (
//     <div style={{ width: "100%", height: 500 }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         getRowId={getRowId}
//         onCellEditStart={handleCellEditStart}
//         onCellEditStop={handleCellEditStop}
//         autoPageSize
//       />
//       <button
//         onClick={handleSaveChanges}
//         disabled={editedRows.size === 0}
//         style={{ marginTop: "10px" }}
//       >
//         ذخیره تغییرات
//       </button>
//     </div>
//   );
// }
// const columns = [
//   { field: "name", headerName: "نام کالا", width: 180, editable: true },
//   {
//     field: "price",
//     headerName: "قیمت",
//     type: "number",
//     editable: true,
//     align: "left",
//     headerAlign: "left",
//   },
//   {
//     field: "quantity",
//     headerName: "موجودی",
//     type: "number",
//     width: 180,
//     editable: true,
//   },
// ];

////////////
// import * as React from "react";
// import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function InstockTable() {
//   const [data, setData] = useState([]);
//   const [editedRows, setEditedRows] = useState(new Set());

//   const loadUserData = async () => {
//     const resposeProducts = await axios.get(
//       "http://localhost:8000/api/products",
//       {
//         params: { limit: 34 },
//       }
//     );
//     // Load categories and map them to products as needed
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
//       __original: { ...product }, // Store original data for comparison
//     }));
//     return alldatas;
//   };

//   useEffect(() => {
//     loadUserData().then((alldatas) => {
//       setData(alldatas);
//     });
//   }, []);

//   const getRowId = (row) => row._id;

//   const handleCellEditStart = (params) => {
//     setEditedRows((prevEditedRows) => new Set(prevEditedRows.add(params.id)));
//   };

//   const handleCellEditStop = (params, event) => {
//     if (params.reason === GridCellEditStopReasons.cellFocusOut) {
//       setEditedRows((prevEditedRows) => {
//         const updatedEditedRows = new Set(prevEditedRows);
//         updatedEditedRows.delete(params.id);
//         return updatedEditedRows;
//       });
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleSaveChanges = async () => {
//     const editedItems = [...editedRows].map((itemId) => {
//       return data.find((item) => item._id === itemId);
//     });

//     console.log("Edited Items:", editedItems);

//     const updatePromises = editedItems.map(async (item) => {
//       const changedFields = {};

//       columns.forEach((column) => {
//         if (item[column.field] !== item.__original[column.field]) {
//           changedFields[column.field] = item[column.field];
//         }
//       });

//       console.log("Changed Fields:", changedFields);

//       try {
//         const response = await axios.patch(
//           `http://localhost:8000/api/products/${item._id}`,
//           changedFields
//         );
//         console.log("Item saved:", response.data);
//         return item._id; // Return the ID of the successfully updated item
//       } catch (error) {
//         console.error("Error saving item:", error);
//       }
//     });

//     await Promise.all(updatePromises);

//     setEditedRows(new Set());
//   };

//   return (
//     <div style={{ width: "100%", height: 500 }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         getRowId={getRowId}
//         onCellEditStart={handleCellEditStart}
//         onCellEditStop={handleCellEditStop}
//         autoPageSize
//       />
//       <button
//         onClick={handleSaveChanges}
//         disabled={editedRows.size === 0}
//         style={{ marginTop: "10px" }}
//       >
//         Save Changes
//       </button>
//     </div>
//   );
// }

// const columns = [
//   { field: "name", headerName: "Product Name", width: 180, editable: true },
//   {
//     field: "price",
//     headerName: "Price",
//     type: "number",
//     editable: true,
//     align: "left",
//     headerAlign: "left",
//   },
//   {
//     field: "quantity",
//     headerName: "Quantity",
//     type: "number",
//     width: 180,
//     editable: true,
//   },
// ];

// import React, { useState, useEffect } from "react";
// import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
// import axios from "axios";

// const columns = [
//   { field: "name", headerName: "Product Name", width: 180, editable: true },
//   {
//     field: "price",
//     headerName: "Price",
//     type: "number",
//     editable: true,
//     align: "left",
//     headerAlign: "left",
//   },
//   {
//     field: "quantity",
//     headerName: "Quantity",
//     type: "number",
//     width: 180,
//     editable: true,
//   },
// ];

// export default function InstockTable() {
//   const [data, setData] = useState([]);
//   const [editedRows, setEditedRows] = useState(new Set());
//   const [editedCells, setEditedCell] = useState([]);
//   const [selectionModel, setSelectionModel] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/products", {
//         params: { limit: 34 },
//       });

//       const products = response.data.data.products;

//       const alldatas = products.map((product) => ({
//         ...product,
//         __original: { ...product },
//       }));

//       setData(alldatas);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelectionModelChange = (newSelectionModel) => {
//     setSelectionModel(newSelectionModel);
//   };
//   const handleCellEditStart = (params) => {
//     setEditedRows((prevEditedRows) => new Set(prevEditedRows.add(params.id)));
//   };

//   const handleCellEditStop = (params) => {
//     if (params.reason === GridCellEditStopReasons.cellBlur) {
//       setEditedRows((prevEditedRows) => {
//         const updatedEditedRows = new Set(prevEditedRows);
//         updatedEditedRows.delete(params.id);
//         return updatedEditedRows;
//       });
//     }
//   };
//   const handlekeyCahnge = (key, event) => {
//     console.log(key, event);
//     setTimeout(() => {
//       setEditedCell({
//         ...editedCells,
//         id: key.id,
//         field: key.field,
//         value: event.target.value,
//       });
//       console.log(event.target.value);
//     }, 500);
//   };

//   const handleSaveChanges = async () => {
//     const updatePromises = [];
//     const editedItemsList = [];
//     console.log("Edited Rows:", editedRows);

//     editedRows.forEach((itemId) => {
//       const editedItem = data.find((item) => item._id === itemId);
//       const changedFields = {};

//       columns.forEach((column) => {
//         const originalValue = editedItem.__original[column.field];
//         const editedValue = editedItem[column.field];

//         console.log("Field:", column.field);
//         console.log("Original Value:", originalValue);
//         console.log("Edited Value:", editedValue);

//         if (originalValue !== editedValue) {
//           console.log("Change detected!");
//           changedFields[column.field] = editedValue;
//         }
//       });

//       if (Object.keys(changedFields).length > 0) {
//         editedItemsList.push({ _id: itemId, changes: changedFields });
//         updatePromises.push(
//           axios.patch(
//             `http://localhost:8000/api/products/${itemId}`,
//             changedFields
//           )
//         );
//       }
//     });

//     console.log("Edited Items List:", editedItemsList);

//     try {
//       await Promise.all(updatePromises);
//       console.log("Items saved successfully");
//       setEditedRows(new Set());
//     } catch (error) {
//       console.error("Error saving items:", error);
//     }
//   };

//   return (
//     <div style={{ width: "100%", height: 500 }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         getRowId={(row) => row._id}
//         onCellEditStart={handleCellEditStart}
//         onCellEditStop={handleCellEditStop}
//         onCellKeyDown={handlekeyCahnge}
//         selectionModel={selectionModel}
//         onSelectionModelChange={handleSelectionModelChange}
//         autoPageSize
//       />
//       <button
//         onClick={handleSaveChanges}
//         disabled={editedRows.size === 0}
//         style={{ marginTop: "10px" }}
//       >
//         Save Changes
//       </button>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
// import axios from "axios";

// const columns = [
//   { field: "name", headerName: "Product Name", width: 180, editable: true },
//   {
//     field: "price",
//     headerName: "Price",
//     type: "number",
//     editable: true,
//     align: "left",
//     headerAlign: "left",
//   },
//   {
//     field: "quantity",
//     headerName: "Quantity",
//     type: "number",
//     width: 180,
//     editable: true,
//   },
// ];

// export default function InstockTable() {
//   const [data, setData] = useState([]);
//   const [editedRows, setEditedRows] = useState(new Set());

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/products", {
//         params: { limit: 34 },
//       });

//       const products = response.data.data.products;

//       const alldatas = products.map((product) => ({
//         ...product,
//         __original: { ...product },
//       }));

//       setData(alldatas);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleCellEditStart = (params) => {
//     setEditedRows((prevEditedRows) => new Set(prevEditedRows.add(params.id)));
//   };

//   const handleCellEditStop = (params, event) => {
//     if (params.reason === GridCellEditStopReasons.cellBlur) {
//       setEditedRows((prevEditedRows) => {
//         const updatedEditedRows = new Set(prevEditedRows);
//         updatedEditedRows.delete(params.id);
//         return updatedEditedRows;
//       });
//     }
//   };

//   const handleSaveChanges = async () => {
//     const updatePromises = [];
//     const changedCells = [];

//     console.log("Edited Rows:", editedRows);

//     editedRows.forEach((itemId) => {
//       const editedItem = data.find((item) => item._id === itemId);
//       console.log("Edited Item:", editedItem);

//       const changedFields = {};

//       columns.forEach((column) => {
//         const originalValue = editedItem.__original[column.field];
//         const editedValue = editedItem[column.field];

//         console.log("Row ID:", itemId);
//         console.log("Field:", column.field);
//         console.log("Original Value Type:", typeof originalValue);
//         console.log("Original Value:", originalValue);
//         console.log("Edited Value Type:", typeof editedValue);
//         console.log("Edited Value:", editedValue);

//         if (originalValue !== editedValue) {
//           changedFields[column.field] = editedValue;

//           changedCells.push({
//             rowId: itemId,
//             field: column.field,
//             oldValue: originalValue,
//             newValue: editedValue,
//           });
//         }
//       });

//       if (Object.keys(changedFields).length > 0) {
//         updatePromises.push(
//           axios.patch(
//             `http://localhost:8000/api/products/${itemId}`,
//             changedFields
//           )
//         );
//       }
//     });

//     console.log("Changed Cells:", changedCells);

//     try {
//       await Promise.all(updatePromises);
//       console.log("Items saved successfully");
//       setEditedRows(new Set());
//     } catch (error) {
//       console.error("Error saving items:", error);
//     }
//   };

//   return (
//     <div style={{ width: "100%", height: 500 }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         getRowId={(row) => row._id} // Specify the property to use as the row id
//         onCellEditStart={handleCellEditStart}
//         onCellEditStop={handleCellEditStop}
//         autoPageSize
//       />
//       <button
//         onClick={handleSaveChanges}
//         disabled={editedRows.size === 0}
//         style={{ marginTop: "10px" }}
//       >
//         Save Changes
//       </button>
//     </div>
//   );
// }

import * as React from "react";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InstockTable() {
  const [data, setData] = useState([]);
  const [editedRows, setEditedRows] = useState(new Set());
  const [editedCells, setEditedCell] = useState([]);

  const loadUserData = async () => {
    const resposeProducts = await axios.get(
      "http://localhost:8000/api/products",
      {
        params: { limit: 1000 },
      }
    );
    // Load categories and map them to products as needed
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
      __original: { ...product }, // Store original data for comparison
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
          { quantity } // Send only the changed quantity
        );
        console.log("Quantity updated:", response.data);
        updatePromises.push(itemId);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    });

    await Promise.all(updatePromises);
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
  };

  console.log(editedCells);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={getRowId}
        onCellKeyDown={handlekeyCahnge}
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        autoPageSize
      />
      <button
        onClick={handleSaveChanges}
        disabled={editedRows.size === 0}
        style={{ marginTop: "10px" }}
      >
        Save Changes
      </button>
    </div>
  );
}

const columns = [
  { field: "name", headerName: "Product Name", width: 180, editable: true },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 180,
    editable: true,
  },
];
