import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  // If remaining time is <= 0, then the user has lost
  const userLost = remainingTime <= 0;
  // Formatting remaining time to show only 2 decimal places
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  // Calculating score
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  // Using portal to show this dialog not in the normal layout flow, but in some other place
  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {/* Showing different info according to if the user won or lost */}
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      {/* On submitting the form, we reset the timer through the 'onReset' function received in props */}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    // Displaying the dialog in this element which is on the outermost level in the DOM
    document.getElementById('modal')
  );
});

export default ResultModal;
