import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import productsReducer from "./productsSlice";
import subCategoryReducer from "./subCategorySlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    subcategories: subCategoryReducer,
  },
});
export default store;
