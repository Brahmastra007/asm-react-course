import { forwardRef } from 'react';

// To use refs forwarded from parent components, we have to wrap our component with 'forwardRef'.
// Then we will get the ref as the second parameter in our component.
const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
  return (
    // Adding ref here to establish a connection to this dialog
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
})

export default ResultModal;