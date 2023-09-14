import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { subcategories: [] };

export const fetchsubcategories = createAsyncThunk(
  "subcategories/fetchsubcategories",
  async () => {
    const response = await axios.get("http://localhost:8000/api/subcategories");
    return response.data;
  }
);

const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchsubcategories.fulfilled, (state, action) => {
      state.subcategories = action.payload;
    });
  },
});

export default subcategoriesSlice.reducer;
