
import React from 'react';
import AdminHeader from '../AdminHeader';
import SideNav from '../SideNav';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <AdminHeader />
      <section className='flex'>
        <SideNav />
        <section className='w-[80%] ml-auto p-4 mt-20'>
          {children}
        </section>
      </section>
    </main>
  );
};

export default AdminLayout;