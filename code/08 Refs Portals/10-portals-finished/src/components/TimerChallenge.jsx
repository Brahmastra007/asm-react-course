import { useState, useRef } from 'react';

import ResultModal from './ResultModal.jsx';

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  // Store the time remaining before the timer expires in a state
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  // Determining if timer is active
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // Here the timer has expired before the user could click to stop the timer.
  if (timeRemaining <= 0) {
    // Clearing the interval and opening the result modal to show that the user has lost
    clearInterval(timer.current);
    dialog.current.open();
  }

  // Function to reset the timer
  function handleReset() {
    // To reset the timer, we reset the time remaining
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    // To keep track of remaining time, we have to use 'setInterval' instead of 'setTimeout' as it
    // performs some action repeatedly after some defined interval (here that interval is 10ms).
    timer.current = setInterval(() => {
      // Updating the remaining time
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  // Function to stop the timer and show the score
  function handleStop() {
    // Opening the dialog to show the score and clearing the interval
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        // Remaining time
        remainingTime={timeRemaining}
        // Function to reset the timer when the user closes the modal
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        {/* Changing conditions to use new variable 'timerIsActive' */}
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
