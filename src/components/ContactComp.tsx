import { Mail, MapPin } from 'lucide-react';
import React from 'react';

const ContactComp = () => {
  return (
    <section className='bg-[#F6F6F6]'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between p-6 md:p-20 gap-8'>
        <div className='w-full md:w-auto'>
          <div className='bg-[#E5F4FF] w-40 text-center rounded-full p-3 mb-4 mx-auto md:mx-0'>
            <p className='!text-[#0095FF] font-semibold'>CONTACT US</p>
          </div>
          <h2 className='text-2xl md:text-3xl'>Have Questions? Let’s Talk.</h2>
          <p className='text-[#6C6C6C] my-3'>Whether you're a player or a talent seeker, we’re here to support you.</p>
          <div className='flex items-center'>
            {/* <img src="/images/icons/location.png" alt="" className="" /> */}
            <div className='bg-[#0095FF] text-white rounded-xl text-center w-14 h-14 flex items-center justify-center'>
              <MapPin className='w-4 h-4' />
            </div>
            <p className='text-[#232323] font-bold text-lg md:text-xl my-auto ml-2'>Lagos, Nigeria</p>
          </div>
          <div className='flex items-center my-4'>
            {/* <img src="/images/icons/mail.svg" alt="" className="" /> */}
            <div className='bg-[#0095FF] text-white rounded-xl text-center w-14 h-14 flex items-center justify-center'>
              <Mail className='w-4 h-4' />
            </div>
            <p className='text-[#232323] font-bold text-lg md:text-xl my-auto ml-2'>support@playeer.africa</p>
          </div>
        </div>
        <div className='bg-white rounded-xl p-4 md:p-6 w-full md:w-[40%]'>
          <div className='my-3'>
            <label className='text-sm font-semibold' htmlFor="name">Full Name</label>
            <input type="text" placeholder='Enter full name' className='bg-[#F4F4F4] p-3 text-sm rounded-md w-full' />
          </div>
          <div className='my-3'>
            <label className='text-sm font-semibold' htmlFor="email">Email Address</label>
            <input type="text" placeholder='Email Address' className='bg-[#F4F4F4] p-3 text-sm rounded-md w-full' />
          </div>
          <div className='my-3'>
            <label className='text-sm font-semibold' htmlFor="message">Message</label>
            <textarea className='bg-[#F4F4F4] p-3 text-sm rounded-md h-32 w-full' placeholder='Message'></textarea>
          </div>
          <div className='my-3'>
            <button className='p-3 rounded-full text-white bg-[#0095FF] w-full'>Send Message</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactComp;