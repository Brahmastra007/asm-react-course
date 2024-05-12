import { useEffect, useState } from 'react';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // State for the remaining time before timer expires
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    // Using the 'setInterval' to display progress bar for remaining time
    const interval = setInterval(() => {
      console.log('INTERVAL');
      // Decreasing the time remaining by 10ms
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    // Clearing the interval before the component is dismounted so that timer is deactivated
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log('TIMER SET');
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* Adding a progress bar for the time remaining before the timer expires and the modal is
      confirmed automatically. */}
      <progress value={remainingTime} max={TIMER} />
    </div>
  );
}
