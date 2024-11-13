import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, NAV_LINKS, ASSETS, ICON_SIZES } from '../constants';

export const Footer: React.FC = () => {
  const footerLinks = [
    { name: 'Whitepaper', href: NAV_LINKS.WHITEPAPER },
    { name: 'Community', href: NAV_LINKS.COMMUNITY },
    { name: 'Burns', href: NAV_LINKS.BURNS },
    { name: 'Tokenomics', href: NAV_LINKS.TOKENOMICS },
    { name: 'Roadmap', href: NAV_LINKS.ROADMAP },
  ];

  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-orange-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image 
              src={ASSETS.LOGO}
              alt="SOBA Logo"
              width={ASSETS.LOGO_DIMENSIONS.width}
              height={ASSETS.LOGO_DIMENSIONS.height}
              className="w-36 h-36"
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
              {Object.entries(SOCIAL_LINKS).map(([key, value]) => (
                <a 
                  key={key}
                  href={value.url}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-400 hover:text-orange-300 transition-colors duration-300 flex items-center gap-2"
                >
                  <Image
                    src={value.icon}
                    alt={`${key.toLowerCase()} icon`}
                    width={ICON_SIZES.SOCIAL.width}
                    height={ICON_SIZES.SOCIAL.height}
                    className="transition-transform hover:scale-110"
                  />
                </a>
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
