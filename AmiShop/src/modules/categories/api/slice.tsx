import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  data: null,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setData(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoading, setData, setError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
