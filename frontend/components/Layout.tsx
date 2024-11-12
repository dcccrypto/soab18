import React, { useState } from 'react';
import Header from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`backdrop-blur-md ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} min-h-screen`}>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
} 