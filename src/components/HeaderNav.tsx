import React, { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react"

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed mx-auto right-0 left-0 top-0  transition-colors duration-300 z-50 ${scrolled ? 'bg-white rounded-full md:w-[80%] !mx-auto mt-10 text-black shadow-lg' : 'w-full bg-transparent text-[#FBFBFB]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">

            <img src={scrolled ? '/images/logo-colored.png' : '/images/logo.png'} alt="logo" className='w-32 my-auto' />
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <p>Home</p>
              <p>About</p>
              <p>Player directory</p>
              <p>Pricing</p>
              <p>FAQ</p>
            </div>
          </div>

          <div className="hidden md:block">
            <button className={`${scrolled ? 'bg-[#E5F4FF]' : 'bg-white'} mr-6 px-8 py-2 rounded-full text-[#0095FF]`}>
              Sign up
            </button>
            <button className="bg-[#0095FF] px-8 py-2 rounded-full text-white">
              Login
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-white">
              Home
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300">
              About
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300">
              Services
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300">
              Contact
            </a>
            <button className="w-full text-left bg-blue-600 px-3 py-2 rounded-lg mt-2">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderNav;