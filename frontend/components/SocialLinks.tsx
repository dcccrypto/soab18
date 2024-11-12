import React from 'react';
import Image from 'next/image';

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
  const socialLinks = [
    {
      name: 'Telegram',
      icon: '/images/assets/icons/telegram_logo.png',
      url: 'https://t.me/SOBAtoken'
    },
    {
      name: 'Twitter',
      icon: '/images/assets/icons/x_com_logo.png',
      url: 'https://x.com/SOBAtoken'
    },
    {
      name: 'TikTok',
      icon: '/images/assets/icons/tiktok_logo.png',
      url: 'https://tiktok.com/@sobatoken'
    }
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map(link => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
        >
          <Image
            src={link.icon}
            alt={link.name}
            width={24}
            height={24}
            className="w-5 h-5"
          />
        </a>
      ))}
    </div>
  );
}; 