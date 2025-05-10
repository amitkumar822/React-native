import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  user: null,
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setData(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoading, setData, setError } = accountSlice.actions;
export default accountSlice.reducer;
