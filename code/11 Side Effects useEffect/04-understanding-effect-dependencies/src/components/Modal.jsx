import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  // Using 'useEffect' to open or close this modal programmatically to get a backdrop when the modal
  // is opened
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
    // Adding all the dependencies that should cause this hook to run again. Basically all the state,
    // props or functions and contexts depending on state and props. So here, whenever the 'open' state
    // changes in the parent component, this hook will rerun.
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
