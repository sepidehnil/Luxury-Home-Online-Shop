import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import productsReducer from "./productsSlice";
import subCategoryReducer from "./subCategory";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    subcategories: subCategoryReducer,
  },
});
export default store;
