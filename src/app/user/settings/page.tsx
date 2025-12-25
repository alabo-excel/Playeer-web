'use client';

import AdminLayout from '@/components/layouts/AdminLayout';
import Modal from '@/components/Modal';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import { toast } from 'react-toastify';

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
  const [activeTab, setActiveTab] = useState<'password' | 'account'>('password');
  const [confirming, setConfirming] = useState<{ action: 'deactivate' | 'delete' | null, open: boolean }>({ action: null, open: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warn('New passwords do not match');
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
      toast.error('An error occurred while changing the password');
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


        <div className="max-w-2xl">
          <div className="mb-6 border-b border-[#E6E6E6]">
            <nav className="flex gap-4">
              <button
                onClick={() => setActiveTab('password')}
                className={`px-4 py-2 -mb-px ${activeTab === 'password' ? 'border-b-2 border-primary font-semibold' : 'text-[#6C6C6C]'}`}
              >
                Change Password
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`px-4 py-2 -mb-px ${activeTab === 'account' ? 'border-b-2 border-primary font-semibold' : 'text-[#6C6C6C]'}`}
              >
                Manage Account
              </button>
            </nav>
          </div>

          {activeTab === 'password' && (
            <>
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
            </>
          )}

          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Manage Account</h2>
              <p className="text-gray-600 mb-6">Deactivate or delete your account. Deactivation can be reversed; deletion is permanent.</p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#FFF4F4] border border-[#FFE9E9]">
                  <h3 className="font-semibold">Deactivate account</h3>
                  <p className="text-sm text-[#6C6C6C] mb-3">Temporarily disable your account. You can reactivate by logging back in.</p>
                  <button onClick={() => setConfirming({ action: 'deactivate', open: true })} className="bg-[#FFD6D6] text-[#991616] px-4 py-2 rounded-full">Deactivate</button>
                </div>

                <div className="p-4 rounded-lg bg-[#FFF4F4] border border-[#FFE9E9]">
                  <h3 className="font-semibold">Delete account</h3>
                  <p className="text-sm text-[#6C6C6C] mb-3">Permanently delete your account and all data. This action cannot be undone.</p>
                  <button onClick={() => setConfirming({ action: 'delete', open: true })} className="bg-[#991616] text-white px-4 py-2 rounded-full">Delete Account</button>
                </div>
              </div>
            </div>
          )}
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

        {/* Confirmation modal for account actions */}
        {confirming.open && (
          <Modal width="420px" onClose={() => setConfirming({ action: null, open: false })}>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Confirm {confirming.action === 'delete' ? 'Delete' : 'Deactivate'}</h3>
              <p className="text-sm text-[#666] mb-6">Are you sure you want to {confirming.action === 'delete' ? 'permanently delete' : 'deactivate'} your account?</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirming({ action: null, open: false })} className="flex-1 bg-[#F2F2F2] p-3 rounded-full">Cancel</button>
                <button
                  onClick={async () => {
                    try {
                      if (confirming.action === 'delete') {
                        await api.patch('/users/me/soft-delete');
                        localStorage.clear();
                        // redirect to homepage
                        window.location.href = '/';
                      } else if (confirming.action === 'deactivate') {
                        await api.patch('/users/me/deactivate');
                        localStorage.clear();
                        window.location.href = '/';
                      }
                    } catch (err) {
                      console.error('Account action failed', err);
                      alert('Action failed. Please try again.');
                    }
                  }}
                  className={`flex-1 p-3 rounded-full ${confirming.action === 'delete' ? 'bg-[#991616] text-white' : 'bg-[#FFD6D6] text-[#991616]'}`}
                >
                  {confirming.action === 'delete' ? 'Delete Account' : 'Deactivate'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default Settings;