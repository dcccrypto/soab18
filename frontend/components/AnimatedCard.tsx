import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedCard = ({ children, className = '', delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 15
        }
      }}
      className={`transform-gpu hover:shadow-[0_20px_25px_-5px_rgba(255,107,0,0.1)] ${className}`}
    >
      {children}
    </motion.div>
  );
};
