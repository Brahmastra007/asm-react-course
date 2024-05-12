import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* Rendering the children only if modal is open so that the timeout is not started in the
      background if the modal is not open. */}
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
