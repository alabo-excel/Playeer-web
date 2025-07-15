'use client'

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/layouts/AuthLayout';
import Link from 'next/link';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <>
        <div className='lg:w-[70%] mx-auto border border-gray rounded-3xl p-6'>
          <p className='text-3xl font-bold text-[#232323]'>Welcome Back to Playeer</p>
          <p className='text-[#6C6C6C] my-3'>Log in to your dashboard to update your profile, upload videos, and connect with scouts and clubs ready to discover talent like yours.</p>

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

          <div>
            <Link href={'/auth/forgot-password'}><p className='text-right text-[#6C6C6C] text-sm'>Forgot Password?</p>
            </Link>
          </div>

          <Link href={'/user/dashboard'}>
            <button className='bg-primary w-full rounded-full text-[#FCFCFC] p-3 my-4'>
              Login
            </button>
          </Link>
          <div className='border-b border-gray mb-6'>
            <p className='text-center -mb-3 bg-[#F8F8F8] w-10 mx-auto'>or</p>
          </div>
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
          <div className='flex justify-center'>
            <p className='text-[#6C6C6C] mr-2'>Don’t have an account?</p>
            <Link href={'/auth/signup'}><span className='text-primary'>Create one now</span>            </Link>
          </div>
        </div>
      </>
    </AuthLayout>
  );
};

export default LoginPage;