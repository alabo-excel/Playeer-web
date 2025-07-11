import React from 'react';
import { CopyrightIcon } from "lucide-react"


const FooterNav = () => {
  return (
    <footer className='max-w-7xl mx-auto px-4'>
      <div className='flex flex-col md:flex-row md:justify-between py-10 border-b border-b-[#B6B6B6] gap-6'>
        <div className='w-full md:w-[40%]'>
          <h2 className='text-lg md:text-xl font-bold'>Stay Updated With Our Latest News, Tips, and Success Stories</h2>
          <p className='text-sm'>Be the first to know about talent trials, new features, and scouting opportunities.</p>
        </div>
        <div className='w-full md:w-[40%] flex flex-col md:flex-row md:justify-between my-auto gap-4'>
          <input type="text" className='bg-[#F4F4F4] w-full rounded-md p-3 md:mr-10' placeholder='Email Address' />
          <button className='text-[#FCFCFC] p-3 bg-[#0095FF] rounded-full w-full md:w-52'>Send Message</button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:justify-between py-10 border-b border-b-[#B6B6B6] gap-6'>
        <div className='w-full md:w-[30%] mb-6 md:mb-0'>
          <img className='w-32 md:w-40' src="/images/logo-colored.png" alt="" />
          <p className='text-sm mt-4 text-[#6C6C6C]'>Bridging the gap between undiscovered football talent and the professionals.</p>
        </div>
        <div className='w-full md:w-[25%] flex text-sm justify-between gap-4'>
          <div className=''>
            <p className='text-[#6C6C6C] my-0 md:my-3'>Home</p>
            <p className='text-[#6C6C6C] my-0 md:my-3'>About Us</p>
            <p className='text-[#6C6C6C] my-0 md:my-3'>Testimonials</p>
            <p className='text-[#6C6C6C] my-0 md:my-3'>Players directory</p>
          </div>
          <div className=''>
            <p className='text-[#6C6C6C] my-0 md:my-3'>Pricing</p>
            <p className='text-[#6C6C6C] my-0 md:my-3'>Supports</p>
            <p className='text-[#6C6C6C] my-0 md:my-3'>Contact Us</p>
            <p className='text-[#6C6C6C] my-0 md:my-3'>FAQs</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row text-sm justify-between my-4 gap-2 md:gap-4 items-center'>
        <div className='w-full md:w-[30%] flex items-center justify-center md:justify-start mb-2 md:mb-0'>
          <CopyrightIcon className='text-[#6C6C6C]' />
          <p className='my-auto ml-2 text-[#6C6C6C] text-center md:text-left'>Copyright 2025 Playeer</p>
        </div>
        <div className='w-full md:w-[25%] flex flex-row justify-center md:justify-between gap-4'>
          <p className='text-[#6C6C6C]  underline-offset-2'>Terms of service</p>
          <p className='text-[#6C6C6C]  underline-offset-2'>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;