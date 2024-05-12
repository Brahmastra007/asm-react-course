import { useEffect } from 'react';

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log('TIMER SET');
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
    // Adding 'onConfirm' as a dependency here as it is a prop whose value could change. Although it
    // is a function defined in 'App' component which does not change, but its value changes whenever
    // 'App' component rerenders, as functions are objects. This could lead to infinite loops if
    // 'onConfirm' has state changes in it.
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
    </div>
  );
}
