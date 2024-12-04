import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BaseAnimatedCardProps {
  className?: string;
  delay?: number;
}

interface IconAnimatedCardProps extends BaseAnimatedCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children?: never;
}

interface ChildrenAnimatedCardProps extends BaseAnimatedCardProps {
  children: ReactNode;
  icon?: never;
  title?: never;
  description?: never;
}

export type AnimatedCardProps = IconAnimatedCardProps | ChildrenAnimatedCardProps;

export const AnimatedCard: React.FC<AnimatedCardProps> = (props) => {
  const baseClassName = "p-6 bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300";
  
  return (
    <motion.div
      className={props.className || baseClassName}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: props.delay || 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {props.children ? (
        props.children
      ) : (
        <>
          <div className="flex items-center mb-4">
            {props.icon}
          </div>
          <h3 className="text-xl font-bold text-orange-400 mb-2">{props.title}</h3>
          <p className="text-gray-300">{props.description}</p>
        </>
      )}
    </motion.div>
  );
};
