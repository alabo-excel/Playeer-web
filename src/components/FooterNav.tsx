import React from 'react';
import { CopyrightIcon, Mail } from "lucide-react"
import Link from 'next/link';


const FooterNav = () => {
  return (
    <footer className='max-w-7xl mx-auto px-4'>
      <div className='flex flex-col md:flex-row md:justify-between py-10 border-b border-b-[#B6B6B6] gap-6'>
        <div className='w-full md:w-[40%]'>
          <h2 className='text-lg md:text-xl font-bold'>Stay Updated With Our Latest News, Tips, and Success Stories</h2>
          <p className='text-sm'>Be the first to know about talent trials, new features, and scouting opportunities.</p>
        </div>
        <div className='w-full md:w-[40%] flex flex-col md:flex-row md:justify-between my-auto gap-4'>
          <div className='flex items-center bg-[#F4F4F4] w-full rounded-md md:mr-10'>
            <Mail className="h-5 w-5 text-[#6C6C6C] ml-3" />
            <input type="text" className='bg-[#F4F4F4] w-full rounded-md p-3 focus:outline-none ml-2' placeholder='Email Address' />
          </div>
          <button className='text-[#FCFCFC] p-3 bg-[#0095FF] rounded-full w-full md:w-52'>Submit</button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:justify-between py-10 border-b border-b-[#B6B6B6] gap-6'>
        <div className='w-full md:w-[30%] mb-6 md:mb-0'>
          <img className='w-32 md:w-40' src="/images/logo-colored.svg" alt="" />
          <p className='text-sm mt-4 text-[#6C6C6C]'>Bridging the gap between undiscovered football talent and the professionals.</p>
        </div>
        <div className='w-full md:w-[25%] flex text-sm justify-between gap-4'>
          <div className=''>
            <Link href={"/"}>
              <p className='text-[#6C6C6C] my-0 md:my-3'>Home</p>
            </Link>
            <Link href={"/#about"}>
              <p className='text-[#6C6C6C] my-0 md:my-3'>About Us</p>
            </Link>
            <Link href={"/#testimonials"}>
              <p className='text-[#6C6C6C] my-0 md:my-3'>Testimonials</p>
            </Link>
            <Link href={"/players"}>
              <p className='text-[#6C6C6C] my-0 md:my-3'>Player directory</p>
            </Link>
          </div>
          <div className=''>
            <Link href={"/#pricing"}>
              <p className='text-[#6C6C6C] my-0 md:my-3'>Pricing</p>
            </Link>
            <Link href={"/#contact"}>
              <p className='text-[#6C6C6C] my-0 md:my-3'>Contact Us</p>
            </Link>
            <Link href={"/#faqs"}>
              <p className='text-[#6C6C6C] my-0 md:my-3'>FAQs</p>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row text-sm justify-between my-4 gap-2 md:gap-4 items-center'>
        <div className='w-full md:w-[30%] flex items-center justify-center md:justify-start mb-2 md:mb-0'>
          <CopyrightIcon className='text-[#6C6C6C]' />
          <p className='my-auto ml-2 text-[#6C6C6C] text-center md:text-left'>© 2025 All rights reserved | Playeer</p>
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