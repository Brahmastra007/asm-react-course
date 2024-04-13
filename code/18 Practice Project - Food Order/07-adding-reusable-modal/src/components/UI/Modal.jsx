import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Defining a Modal component to be used anywhere
export default function Modal({ children, open, className = '' }) {
  // Creating a ref to the dialog element
  const dialog = useRef();

  // Using useEffect hook so that the modal is opened programatically whenever 'open' prop is changed
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
  }, [open]);

  // Using Portal to use this modal in any component but while inserting it in the DOM
  // in the element with ID 'modal'
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
