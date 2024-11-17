import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS, NAV_LINKS, ICON_SIZES } from '@/constants'
import { ButtonBase } from './ui/button-base'

// Convert objects to arrays with proper typing
const navLinksArray = Object.entries(NAV_LINKS).map(([key, href]) => ({
  label: key,
  href
}))

const socialLinksArray = Object.values(SOCIAL_LINKS)

export function Footer() {
  return (
    <footer className="bg-black/40 border-t border-orange-500/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <Image
              src="/images/assets/icons/logo.svg"
              alt="SOBA Logo"
              width={32}
              height={32}
              className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <span className="text-orange-500 font-bold">$SOBA</span>
          </div>

          <nav className="flex gap-6">
            {navLinksArray.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinksArray.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={social.icon}
                  alt={`${social.name} Icon`}
                  width={24}
                  height={24}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
