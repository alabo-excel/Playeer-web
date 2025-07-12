import AdminLayout from '@/components/layouts/AdminLayout';
import React from 'react';

const profile = () => {
  return (
    <AdminLayout>
      <div className='pt-3'>
        <p>Welcome back, John!</p>
      </div>
    </AdminLayout>
  );
};

export default profile;