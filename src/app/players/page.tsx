'use client'

import ContactComp from '@/components/ContactComp';
import FooterNav from '@/components/FooterNav';
import HeaderNav from '@/components/HeaderNav';
import React from 'react';

const players = () => {
  return (
    <>
      <HeaderNav scroll={true} />
      <section className='p-4'>
        <div className=' mt-20 bg-[#E5F4FF] mx-auto p-6 md:p-12 rounded-3xl flex flex-col md:flex-row justify-between'>
          <div className='w-full md:w-[44%] my-auto'>
            <h1 className='text-3xl md:text-5xl font-bold'>Discover Football Talent Across the World</h1>
            <p className='text-[#6C6C6C] my-3 text-sm'>Browse profiles of rising footballers on Playeer — from grassroots players to semi-pro talents. Filter by position, country, age group, or performance to find standout profiles.</p>
          </div>
          <img src="/images/three-medal-set.png" className='w-full md:w-auto max-w-xs md:max-w-none mx-auto md:mx-0' alt="" />
        </div>
      </section>
      <section className='p-4 my-10  mx-auto'>

        <div className='flex flex-col md:flex-row justify-between gap-8'>
          <div className='w-full md:w-[30%] md:mr-10 mb-6 md:mb-0'>
            <p className='font-bold my-4'>Filter</p>
            <select className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Position</option>
            </select>
            <select className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Country</option>
            </select>
            <select className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Age Group</option>
            </select>
            <select className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Status</option>
            </select>
            <select className='p-3 rounded-md text-sm bg-[#F4F4F4] text-[#B6B6B6] focus:outline-none w-full my-2'>
              <option value="" className='hidden'>Gender</option>
            </select>
          </div>
          <div className='w-full'>
            <div className='flex w-full md:w-[25%] ml-auto mb-4 items-center bg-[#F4F4F4] rounded-md'>
              <input type="text" className='p-3 rounded-md text-sm bg-[#F4F4F4] focus:outline-none w-full' placeholder='Search' />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6C6C6C] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {[1, 2, 3, 4, 5, 6].map((single) => <div key={single} className='relative'>
                <img src="/images/player-2.jpg" className='object-cover h-80 w-full rounded-xl' alt="" />
                <div className='blur bg-[#000310] opacity-50 absolute right-0 left-0 rounded-b-xl bottom-0 h-20'></div>
                <div className='absolute right-0 left-0 bottom-0 p-4 z-10 '>
                  <div className='flex justify-between my-2 text-white'>
                    <p>Emmanuel Babalola</p>
                  </div>
                  <p className='text-xs text-[#D3D3D3]'>Central Midfielder</p>
                </div>
              </div>)}
            </div>
          </div>
        </div>

      </section>
      <ContactComp />
      <FooterNav />
    </>
  );
};

export default players;