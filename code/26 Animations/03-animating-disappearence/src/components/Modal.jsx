import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      {/* Adding the Framer motion component for the 'dialog' element */}
      <motion.dialog
        // This is the animation to fade in and slide up the modal when it gets opened.
        // The initial properties for the element when it is rendered in the DOM
        initial={{ opacity: 0, y: 30 }}
        // These are the properties the element will animate to after it gets rendered
        animate={{ opacity: 1, y: 0 }}
        // The final properties the element will animate to when it is removed from the DOM
        exit={{ opacity: 0, y: 30 }}
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
