import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { categoryId, sortTypes, search, currentPage } = params;
  const { data } = await axios.get(
    `https://63622bc666f75177ea284f2e.mockapi.io/items?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }${search}&sortBy=${sortTypes}&order=desc`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.items = [];
      state.status = 'error';
    },
  },
});
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
