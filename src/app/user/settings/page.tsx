'use client';

import AdminLayout from '@/components/layouts/AdminLayout';
import Modal from '@/components/Modal';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

// Password Input Component
const PasswordInput = React.memo(({
  value,
  onChange,
  show,
  onToggleShow,
  placeholder
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  onToggleShow: () => void;
  placeholder: string;
}) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-lg pr-10 outline-none focus:border-blue-500"
      placeholder={placeholder}
      required
    />
    <button
      type="button"
      onClick={onToggleShow}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
    >
      {show ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
));

PasswordInput.displayName = 'PasswordInput';

const Settings = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement API call to change password
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setShow(true)
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('An error occurred while changing the password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mt-8 lg:px-8 p-4">
        <button onClick={() => router.back()} className='flex gap-3 text-[#1F1F1F] my-4'>
          <ArrowLeft />
          <span>Back</span>
        </button>
        <div className='border-b border-b-[#DFDFDF] pb-6 mb-6'>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your Playeer account preferences and security.
          </p>
        </div>


        <div className="max-w-sm">
          <h2 className="text-xl font-semibold mb-2">Change Password</h2>
          <p className="text-gray-600 mb-6">
            For your protection, choose a strong password that you haven't used elsewhere.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <PasswordInput
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                show={showCurrentPassword}
                onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                show={showNewPassword}
                onToggleShow={() => setShowNewPassword(!showNewPassword)}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                show={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary text-white py-3 px-4 rounded-full font-medium
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
                                transition-colors duration-200`}
            >
              {isLoading ? <div className="w-6 h-6 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                : 'Change password'}
            </button>
          </form>
        </div>

        {show && <Modal width="400px">
          <div className="text-center">
            <img src="/images/icons/success-1.svg" className="mx-auto" alt="" />
            <h2 className="font-bold my-4 text-xl">Password updated successfully</h2>
            <p className="text-[#5A5A5A] mb-3">Your account security has been refreshed.</p>
            <button onClick={() => setShow(false)} className="bg-[#F2F2F2] p-3 w-full rounded-full">
              Close
            </button>
          </div>
        </Modal>}
      </div>
    </AdminLayout>
  );
};

export default Settings;