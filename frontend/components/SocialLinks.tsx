import React from 'react';
import Image from 'next/image';
import { SOCIAL_LINKS, ICON_SIZES } from '../constants';

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {Object.entries(SOCIAL_LINKS).map(([key, value]) => (
        <a
          key={key}
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
        >
          <Image
            src={value.icon}
            alt={`${key.toLowerCase()} icon`}
            width={ICON_SIZES.SOCIAL.width}
            height={ICON_SIZES.SOCIAL.height}
            className="w-5 h-5"
          />
        </a>
      ))}
    </div>
  );
}; 