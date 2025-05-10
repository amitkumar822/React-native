import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';
import {categoryApi} from '@modules/categories/apis/categoriesApi';
import {productsApi} from '@modules/products/api/productsApi';

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productsApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
