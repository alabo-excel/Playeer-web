import React, { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react"
import Link from 'next/link';

const HeaderNav = ({ scroll }: { scroll?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`fixed max-w-7xl mx-auto right-0 left-0 top-0 transition-all duration-300 transition-discrete z-50 ${scrolled ?
      'bg-white rounded-full md:w-[80%] !mx-auto mt-10  shadow-lg' :
      'w-full bg-transparent  py-4'} ${scroll || scrolled ? "text-black" : "text-[#FBFBFB]"}`}>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={scrolled || scroll ? '/images/logo-colored.png' : '/images/logo.png'} alt="logo" className='w-32 my-auto' />
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link className="hover:text-[#0095FF] transition-colors" href={'/'}>
                Home
              </Link>
              <Link href="/#about" className="hover:text-[#0095FF] transition-colors">About</Link>
              <Link className="hover:text-[#0095FF] transition-colors" href="/players">
                Player directory
              </Link>
              <Link href="/#pricing" className="hover:text-[#0095FF] transition-colors">Pricing</Link>
              <Link href="/#" className="hover:text-[#0095FF] transition-colors">FAQ</Link>
            </div>
          </div>

          <div className="hidden md:block">
            <Link href={'/auth/signup'}>
              <button className={`bg-[#E5F4FF] mr-6 px-8 py-2 rounded-full text-[#0095FF] transition-colors`}>Sign up</button>
            </Link>
            <Link href={'/auth/login'}>
              <button className="bg-[#0095FF] px-8 py-2 rounded-full text-white transition-colors">Login</button>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-40 bg-transparent bg-opacity-20 transition-opacity duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`} style={{ background: '#fff' }}>
        <div className="flex justify-between items-center h-16 px-4 border-b border-[#E5F4FF]">
          <img src={scrolled ? '/images/logo-colored.png' : '/images/logo.png'} alt="logo" className='w-32 my-auto' />
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X className="h-7 w-7 text-[#232323]" />
          </button>
        </div>
        <div className="px-4 pt-4 pb-6 flex flex-col space-y-2">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-[#232323] hover:bg-[#E5F4FF] hover:text-[#0095FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/#about" className="block px-3 py-2 rounded-md text-base font-medium text-[#232323] hover:bg-[#E5F4FF] hover:text-[#0095FF] transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/players" className="block px-3 py-2 rounded-md text-base font-medium text-[#232323] hover:bg-[#E5F4FF] hover:text-[#0095FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Player directory</Link>
          <Link href="/#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-[#232323] hover:bg-[#E5F4FF] hover:text-[#0095FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link href="/#faq" className="block px-3 py-2 rounded-md text-base font-medium text-[#232323] hover:bg-[#E5F4FF] hover:text-[#0095FF] transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</Link>

          <Link href={'/auth/signup'}>
            <button className="w-full text-[#0095FF] bg-[#E5F4FF] px-3 py-2 rounded-full mt-4 font-semibold transition-colors hover:bg-[#0095FF] hover:text-white border border-[#0095FF]" onClick={() => setIsMenuOpen(false)}>Sign up</button>
          </Link>
          <Link href={'/auth/login'}>
            <button className="w-full text-white bg-[#0095FF] px-3 py-2 rounded-full mt-2 font-semibold transition-colors hover:bg-[#0077cc]" onClick={() => setIsMenuOpen(false)}>Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;