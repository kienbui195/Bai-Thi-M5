import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice'
import flagReducer from '../features/flagSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    flag: flagReducer
  },
});
