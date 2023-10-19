import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ItemState {
  names: string[];
}

const initialState: ItemState = {
  names: [],
};
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.names.push(action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<{index: number; updatedName: string}>,
    ) => {
      const {index, updatedName} = action.payload;
      if (index >= 0 && index < state.names.length) {
        state.names[index] = updatedName;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.names.length) {
        state.names.splice(index, 1);
      }
    },
  },
});

export const {addItem, updateItem, deleteItem} = itemsSlice.actions;
export default itemsSlice.reducer;
