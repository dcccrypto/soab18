import Link from 'next/link'
import { Flame } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-8 backdrop-blur-lg bg-black bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/burns-page" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">Burns</Link>
            <Link href="/3d-roadmap" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mr-4">Roadmap</Link>
            <Link href="/tokenomics-page" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Tokenomics</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
              <Flame size={24} />
            </Link>
            <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2h-19C1.67 2 1 2.67 1 3.5v17c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zM5 19.5v-13c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5v13c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5z" />
                <path d="M12 6l-4 4h3v4h2v-4h3l-4-4z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 
