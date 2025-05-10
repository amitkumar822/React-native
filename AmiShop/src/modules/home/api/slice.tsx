import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
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

export const { setLoading, setData, setError } = homeSlice.actions;
export default homeSlice.reducer;





// import {createSlice} from '@reduxjs/toolkit';

// export const homeSlice = createSlice({
//     name: 'home',
//     initialState: {
//         data: null,
//         loading: false,
//         error: null
//     },
//     reducers: {
//         setLoading: (state) => {
//             state.loading = true
//         },
//         setData: (state, action) => {
//             state.loading=false;
//             state.data=action.payload;
//             state.error=null;
//         },
//         setError: (state, action) => {
//             state.loading=false,
//             state.error = action.payload;
//         }
//     }
// })

// export const {setLoading, setData, setError} = homeSlice.actions;
// export default homeSlice.reducer