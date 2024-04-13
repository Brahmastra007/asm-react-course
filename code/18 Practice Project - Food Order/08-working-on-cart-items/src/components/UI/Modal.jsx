import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    // We define a variable for the modal here as the next time the cleanup function runs,
    // the ref's value could have been changed. So basically to lock in the current value
    // in this const variable.
    const modal = dialog.current;
    
    if (open) {
      modal.showModal();
    }

    // This return function is the cleanup function, i.e. it is run before whenever the
    // next time this useEffect hook runs. This will close the modal.
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
