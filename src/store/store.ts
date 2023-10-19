import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../itemSlice';

export interface RootState {
  items: {
    names: string[]; 
  };
}

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

export default store;
