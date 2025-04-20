// First install 'redux' and 'react-redux'
import { createStore } from 'redux';

/* Define the reducer that will handle all the actions dispatched by various components and update the Redux state. We also provide
an initial state (counter: 0) which is set up when this reducer is run the first time, i.e. when the Redux store is initialised. */
const counterReducer = (state = { counter: 0 }, action) => {
  // Increments the counter
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  // Decrements the counter
  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  // Returns the initial default state
  return state;
};

// Create the Redux store for handling the global state and pass the reducer
const store = createStore(counterReducer);

export default store;