import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const dashboard = () => {
  return (
    <AdminLayout>
      <div className='pt-3'>
        <div className='lg:w-[35%]'>
          <p className='text-2xl font-bold'>Welcome back, John!</p>
          <p className='text-sm my-3 text-[#6C6C6C]'>Keep pushing forward every upload, every stat brings you closer to getting noticed.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default dashboard;