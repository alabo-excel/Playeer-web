import { LogOut } from 'lucide-react';
import React from 'react';

const AdminHeader = () => {
  return (
    <header className='fixed top-0 w-full bg-[#FCFCFC] border-b border-gray p-6 flex justify-between z-10'>
      <img className='w-32 my-auto' src="/images/logo-colored.png" alt="" />
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