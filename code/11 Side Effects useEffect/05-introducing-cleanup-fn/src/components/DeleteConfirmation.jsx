import { useEffect } from 'react';

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // Using 'useEffect' to set a timeout which will confirm the modal automatically after 3s and initiate
  // removing the place.
  useEffect(() => {
    console.log('TIMER SET');
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    // Here we can provide a cleanup function which will run immediately before the next 'useEffect'
    // execution or before the component dismounts. Therefore this timeout will be cleared before this
    // component dismounts (i.e. removed from the DOM), and would not go off and remove the place.
    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
  }, []);

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
