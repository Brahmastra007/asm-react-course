// Defining a modal here to show if the timer expires
export default function ResultModal({ result, targetTime }) {
  return (
    // Using the built-in modal HTML element to display a modal
    <dialog className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      {/* This form with method 'dialog' will automatically close the modal when the button is clicked. */}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
