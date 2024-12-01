import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, ICON_SIZES } from '../constants';
import { AnimatedCard } from './AnimatedCard';
import { ButtonBase } from './ui/button-base';

interface SocialLinksProps {
  className?: string;
  showDescriptions?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  className = '',
  showDescriptions = true 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto ${className}`}>
      {Object.entries(SOCIAL_LINKS).map(([key, value], index) => (
        <AnimatedCard 
          key={key}
          delay={index * 0.1}
          className="flex flex-col h-full bg-black/40 rounded-xl border border-orange-500/20 p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={value.icon}
              alt={`${value.name} icon`}
              width={ICON_SIZES.SOCIAL.width / 3}
              height={ICON_SIZES.SOCIAL.height / 3}
              className="w-12 h-12"
              unoptimized
              loading="lazy"
            />
            <h3 className="text-xl font-bold text-[#FF6B00]">{value.name}</h3>
          </div>
          
          {showDescriptions && (
            <p className="text-gray-400 flex-grow mb-4">
              {key === 'TWITTER' && 'Stay updated with the latest $SOBA news and engage with our community.'}
              {key === 'TELEGRAM' && 'Join our Telegram group for real-time discussions and community updates.'}
              {key === 'TIKTOK' && 'Watch our latest content and viral $SOBA moments.'}
            </p>
          )}
          
          <ButtonBase 
            className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] text-white mt-auto"
            onClick={() => window.open(value.url, '_blank', 'noopener,noreferrer')}
          >
            Follow Us
          </ButtonBase>
        </AnimatedCard>
      ))}
    </div>
  );
};