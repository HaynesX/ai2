import { motion } from 'framer-motion';

const variants = {
  enter: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.4, ease: 'easeInOut' } // Smooth fade-in using easeInOut for a natural feel
    }
  },
  center: {
    opacity: 1,
    transition: {
      opacity: { duration: 0.4, ease: 'easeInOut' } // Consistent ease and duration for both entering and centering
    }
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.4, ease: 'easeInOut' } // Consistent fade-out with the same ease and duration
    }
  },
};





export const TransitionWrapper = ({ children }: {
    children: React.ReactNode;
}) => (
  <motion.div
  className='sm:w-full sm:h-full flex flex-col sm:items-center sm:justify-center'
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: {type: "spring", stiffness: 300, damping: 30},
      opacity: {duration: 0.2},
    }}
  >
    {children}
  </motion.div>
);
