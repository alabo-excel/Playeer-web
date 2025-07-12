"use client"

import AuthLayout from '@/components/layouts/AuthLayout';
import { EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <>
        <div className='lg:w-[70%] mx-auto border border-gray rounded-3xl p-6'>
          <button className={`bg-[#E5F4FF] px-4 mb-2 py-2 rounded-full text-[#0095FF] transition-colors`}>Join Playeer</button>

          <p className='text-3xl font-bold text-[#232323]'>Your Football Journey Starts Here</p>
          <p className='text-[#6C6C6C] my-3'>Build your profile, upload your highlights, and start getting noticed by scouts, agents, and clubs.</p>

          <div className='flex justify-between mb-4'>
            <button className='flex justify-center text-[#202426] p-3 border border-gray rounded-full w-[48%]'>
              <img className='mr-2' src="/images/icons/google.png" alt="" />
              <span className='my-auto'>Google</span>
            </button>
            <button className='flex p-3 border justify-center text-[#202426] border-gray rounded-full w-[48%]'>
              <img src="/images/icons/apple.png" className='mr-2' alt="" />
              <span className='my-auto'>Apple</span>
            </button>
          </div>
          <div className='border-b border-gray mb-6'>
            <p className='text-center -mb-3 bg-white w-10 mx-auto'>or</p>
          </div>

          <div className='my-4'>
            <label htmlFor="" className='font-bold mb-2'>Full name</label>
            <input type="text" className='w-full rounded-md text-sm p-3 bg-[#F4F4F4]' placeholder='Enter Fullname' />
          </div>
          <div className='my-4'>
            <label htmlFor="" className='font-bold mb-2'>Username</label>
            <input type="text" className='w-full rounded-md text-sm p-3 bg-[#F4F4F4]' placeholder='Enter Username' />
          </div>
          <div className='my-4'>
            <label htmlFor="" className='font-bold mb-2'>Email Address</label>
            <input type="text" className='w-full rounded-md text-sm p-3 bg-[#F4F4F4]' placeholder='Email Address' />
          </div>
          <div className='my-4'>
            <label htmlFor="" className='font-bold mb-2'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                className='w-full text-sm rounded-md p-3 bg-[#F4F4F4] pr-12'
                placeholder='Enter Password'
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-[#6C6C6C]" />
                ) : (
                  <Eye className="h-5 w-5 text-[#6C6C6C]" />
                )}
              </button>
            </div>
          </div>

          <div className='flex my-2'>
            <input type="checkbox" className='mr-3 border p-2 mb-auto border-primary' />
            <p className='text-[#6C6C6C] text-sm'>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>

          <div className='p-2 border border-[#FBBC05] bg-[#FFF8E6] text-[#644B02] rounded-md'>
            <p>Password must be at least 8 characters, include a number and a special character.</p>
          </div>

          <Link href={'/auth/onboarding'}>
            <button className='bg-primary w-full rounded-full text-[#FCFCFC] p-3 my-4'>
              Create Account
            </button>
          </Link>

          <div className='flex justify-center'>
            <p className='text-[#6C6C6C] mr-2'>Already have an account?</p>
            <Link href={'/auth/login'}><span className='text-primary'>Login</span></Link>
          </div>
        </div>
      </>
    </AuthLayout>
  );
};

export default signup;