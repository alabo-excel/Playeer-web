'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../AdminHeader';
import SideNav from '../SideNav';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <main>
      <AdminHeader onSidebarToggle={() => setSidebarOpen((v) => !v)} />
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <section className="flex">
        <SideNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <section className="w-full md:w-[80%] ml-auto p-4 mt-20 transition-all duration-300">
          {children}
        </section>
      </section>
    </main>
  );
};

export default AdminLayout;