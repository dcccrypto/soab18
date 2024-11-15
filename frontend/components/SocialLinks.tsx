import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, ICON_SIZES } from '../constants';

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {Object.entries(SOCIAL_LINKS).map(([key, value]) => (
        <motion.a
          key={key}
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={value.icon}
            alt={`${key.toLowerCase()} icon`}
            width={ICON_SIZES.SOCIAL.width}
            height={ICON_SIZES.SOCIAL.height}
            className="w-16 h-16"
            unoptimized
            loading="lazy"
          />
        </motion.a>
      ))}
    </div>
  );
}; 