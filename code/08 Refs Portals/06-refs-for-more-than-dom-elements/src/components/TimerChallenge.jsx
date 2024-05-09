import { useState, useRef } from 'react';

// Such a variable defined outside the component would not be thrown away when the component rexecutes
// but it would be shared between all the 'TimerChallenge' component instances which is not what we
// want here as we want different timers for different component instances.
// let timer;

export default function TimerChallenge({ title, targetTime }) {
  // We cannot use just a variable to store the timer as it would be thrown away whenever the component
  // reexecutes, hence we need to use a ref. The ref's value will not be thrown away when the component
  // reexecutes but unlike state, changing its value doesn't reexecute the component also.
  const timer = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    // Storing the reference to the timer in a ref
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    // Clearing the timer by accessing it through the ref
    clearTimeout(timer.current);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        {/* Triggering stopping the timer if it has started and starting it if it has not started yet. */}
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
  );
}
