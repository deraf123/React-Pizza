import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice/slice';
import cartSlice from './slices/cartSlice/slice';
import pizzasSlice from './slices/pizzasSlice/slice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
