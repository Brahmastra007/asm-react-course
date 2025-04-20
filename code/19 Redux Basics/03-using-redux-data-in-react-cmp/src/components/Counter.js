import { useSelector } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  /* Use the 'useSelector' hook to setup a subscription to the Redux store. This will reexecute this component whenever the Redux
  state changes. Here, slice the state to obtain only the counter. */
  const counter = useSelector(state => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/* Add the counter */}
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
