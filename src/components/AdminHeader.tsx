import { LogOut, Menu } from 'lucide-react';
import React from 'react';

const AdminHeader = ({ onSidebarToggle }: { onSidebarToggle?: () => void }) => {
  return (
    <header className='fixed top-0 w-full bg-[#FCFCFC] border-b border-gray p-6 flex justify-between lg:z-50'>
      <div className='flex items-center'>
        {/* Hamburger menu for mobile/tablet */}
        <button
          className="block md:hidden mr-4 p-2 rounded hover:bg-gray-100 focus:outline-none"
          onClick={onSidebarToggle}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <img className='w-32 my-auto lg:block hidden' src="/images/logo-colored.png" alt="" />
      </div>
      <div className='w-44 flex justify-between my-auto'>
        <img src="/images/player-2.jpg" className='w-8 my-auto h-8 rounded-full' alt="" />
        <button className='flex text-primary bg-[#E5F4FF] p-2 px-6 rounded-full justify-center'>
          <p className='text-sm mr-2'>Logout</p>
          <LogOut />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;