import { motion } from 'framer-motion';

export default function Badge({ caption }) {
  return (
    <motion.span
      // Animating the badge to scale up and down whenever its caption gets changed. Please note
      // that we have not provided an initial property because we get it as '1' from the array for
      // the 'scale' property.
      animate={{ scale: [1, 1.2, 1] }}
      // Playing the animation for a duration of 0.3s
      transition={{ duration: 0.3 }}
      className="badge"
    >
      {caption}
    </motion.span>
  );
}
