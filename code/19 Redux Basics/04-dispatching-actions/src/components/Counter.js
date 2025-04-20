import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  // Hook used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);

  // Dispatch the 'increment' action
  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

  // Dispatch the 'decrement' action
  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        {/* Attach the counter handlers */}
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
