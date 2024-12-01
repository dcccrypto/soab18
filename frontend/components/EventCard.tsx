import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { formatDateNew } from '@/lib/utils';

interface EventCardProps {
  name: string;
  description: string;
  date: string;
}

export const EventCard = ({ name, description, date }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 15
        }
      }}
      className="p-6 rounded-xl bg-black/40 border border-orange-500/20 hover:border-orange-500/40 hover:bg-black/60 transition-all duration-300 transform-gpu hover:shadow-[0_20px_25px_-5px_rgba(255,107,0,0.1)]"
    >
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-6 h-6 text-[#FF6B00]" />
        <h3 className="text-xl font-semibold text-[#FF6B00]">{name}</h3>
      </div>
      <p className="text-white/90 leading-relaxed mb-2">{description}</p>
      <p className="text-sm text-white/80">{formatDateNew(date)}</p>
    </motion.div>
  );
};
