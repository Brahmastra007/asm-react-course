import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  // const hiddenAnimationState = { opacity: 0, y: 30 };
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        // We can declare variants to reuse them. They are also useful in applying animations to
        // the child components also. So when the modal gets opened, we will see an animation effect
        // in the child components also.
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        // Setting different animation properties using variants
        initial="hidden"
        animate="visible"
        exit="hidden"
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
