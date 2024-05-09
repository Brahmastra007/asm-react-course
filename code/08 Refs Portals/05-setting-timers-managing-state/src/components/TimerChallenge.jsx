import { useState } from 'react';

export default function TimerChallenge({ title, targetTime }) {
  // Defining states to determine if timer has started or expired
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    // Setting the timer to expire after the target time
    setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);

    // Starting the timer immediately after setting its expiry above
    setTimerStarted(true);
  }

  function handleStop() {
    
  }

  return (
    // Setting different data on the UI according to the timer status, i.e. if it has started or expired
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        {/* Clicking this button will start the timer */}
        <button onClick={handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
  );
}
