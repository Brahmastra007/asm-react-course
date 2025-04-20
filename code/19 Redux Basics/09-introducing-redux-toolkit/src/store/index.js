// Install '@reduxjs/toolkit'
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

// Create a state slice which is a part of the overall app state
const counterSlice = createSlice({
  // Add a unique slice name
  name: 'counter',
  // Assign the initial state
  initialState,
  // Add all the reducers / actions that can be called to update this state slice
  reducers: {
    increment(state) {
      /* Here, the state can be mutated directly. (Although we are not actually mutating the state directly. Redux toolkit performs
      this action in an immutable way internally by copying the current state and performing changes on the copy.) */
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // Get the 'payload' with the action
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});

// Configure the Redux store and pass the reducers from all the different state slices
const store = configureStore({
  // This reducer is a combined reducer from all the reducers / actions defined above
  reducer: counterSlice.reducer
});

// Export the actions
export const counterActions = counterSlice.actions;

export default store;
