import { categoryApi } from "@modules/categories/apis/categoriesApi";
import { productsApi } from "@modules/products/api/productsApi";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
});

