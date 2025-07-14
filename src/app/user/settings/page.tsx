import AdminLayout from '@/components/layouts/AdminLayout';
import Tabs from '@/components/Tabs';
import React from 'react';

const settings = () => {
  return (
    <AdminLayout>
      <div className='pt-3'>
        <div className='lg:w-[45%]'>
          <p className='text-2xl font-bold'>Settings</p>
          <p className='text-sm my-3 text-[#6C6C6C]'>Customize your experience on Playeer. Control who sees your profile, how you get notifications, and how your content behaves across the platform.</p>
        </div>
        <div className='p-3 bg-[#FCFCFC] rounded-2xl'>
          <Tabs />
        </div>
      </div>
    </AdminLayout>
  );
};

export default settings;