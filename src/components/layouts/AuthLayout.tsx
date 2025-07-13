import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return (
    <section className='relative mx-auto'>
      <div className='flex p-4'>
        <div className='relative lg:block hidden w-1/2'>
          <img className='rounded-3xl' src="/images/auth-img.png" alt="" />
          <div className='flex justify-between absolute top-6 left-5 right-5'>
            <button onClick={() => router.back()} className='bg-primary rounded-full p-3 flex text-[#FCFCFC]'>
              <ArrowLeft />
              <span>Back</span>
            </button>
            <img src="/images/logo.png" className='my-auto' alt="" />
          </div>
          <div className='absolute bottom-10 left-5 right-5'>
            <h2 className='text-5xl !text-[#FCFCFC] font-bold'>Talent is nothing without the platform to shine.</h2>
            <div className='flex justify-between mt-4'>
              <div>
                <p className='text-[#FCFCFC]'>🎯 Playeer helps you:</p>
                <ul className='ml-6 text-sm mt-2 text-[#E5E5E5]'>
                  <li>Build a powerful online football profile</li>
                  <li>Upload match videos & skills clips</li>
                  <li>Get seen by professional scouts and agents</li>
                  <li>Track your performance and opportunities</li>
                  <li>Apply for local and international trials</li>
                </ul>
              </div>
              <div className='mt-auto'>
                <p className='text-[#FCFCFC]'>💡 Tip</p>
                <p className='text-[#E5E5E5] mt-2 text-sm'>A complete profile gets 3× more scout views.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:w-1/2 w-full my-auto h-screen flex flex-col'>
          <div className='flex lg:absolute mb-4 top-0 lg:w-[22%] right-5 top-6 justify-between ml-auto p-4'>
            <Link href={'/auth/signup'}>
              <button className={`bg-[#E5F4FF] mr-6 px-8 py-2 rounded-full text-[#0095FF] transition-colors`}>Sign up</button>
            </Link>
            <Link href={'/auth/login'}>
              <button className="bg-[#0095FF] px-8 py-2 rounded-full text-white transition-colors">Login</button>
            </Link>
          </div>
          <div className='flex-1 text-sm flex items-center justify-center'>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;