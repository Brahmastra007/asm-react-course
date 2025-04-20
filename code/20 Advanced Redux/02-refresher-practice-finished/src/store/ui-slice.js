import { createSlice } from '@reduxjs/toolkit';

// Create the Redux state slice for the UI
const uiSlice = createSlice({
  name: 'ui',
  // Cart is visible or not
  initialState: { cartIsVisible: false },
  reducers: {
    // Reducer to toggle cart display
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    }
  }
});

// Export the UI actions
export const uiActions = uiSlice.actions;

export default uiSlice;