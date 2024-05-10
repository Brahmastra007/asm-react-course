import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
  // Defining ref to connect to the 'dialog' element below
  const dialog = useRef();

  // To avoid writing logic for handling this component in other components, we can use the 'useImperativeHandle'
  // hook and expose an API which can be accessed in components which use this component. It is used
  // in conjunction with 'forwardRef'.
  // Now the ref passed in this modal component has a connection to the object returned below and can
  // use it to call functions.
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
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