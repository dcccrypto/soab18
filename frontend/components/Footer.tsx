import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Telegram', icon: '/images/assets/icons/telegram_logo.png', href: '#' },
    { name: 'Twitter', icon: '/images/assets/icons/x_com_logo.png', href: '#' },
    { name: 'TikTok', icon: '/images/assets/icons/tiktok_logo.png', href: '#' },
  ];

  const footerLinks = [
    { name: 'Whitepaper', href: '/soba-whitepaper' },
    { name: 'Community', href: '/community-page' },
    { name: 'Burns', href: '/burns-page' },
    { name: 'Tokenomics', href: '/tokenomics-page' },
    { name: 'Roadmap', href: '/3d-roadmap' },
  ];

  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-orange-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image 
              src="/images/assets/icons/mainlogo.svg"
              alt="SOBA Logo"
              width={120}
              height={120}
              className="w-24 h-24"
            />
            <p className="text-orange-400/80 text-sm text-center md:text-left">
              Join the most rebellious, community-driven memecoin on Solana
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-orange-400 font-bold text-lg">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-orange-400/80 hover:text-orange-300 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-orange-400 font-bold text-lg">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-orange-500/10 p-2 rounded-full hover:bg-orange-500/20 transition-colors duration-300"
                >
                  <Image
                    src={social.icon}
                    alt={`${social.name} logo`}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-orange-500/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-orange-400/60 text-sm">
              © 2024 SOBA Token. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-orange-400/60 hover:text-orange-300 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-orange-400/60 hover:text-orange-300 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
