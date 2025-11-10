'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import { ArrowLeft } from "lucide-react";
import React from "react";

function Profile() {
  const getInitials = () => "KS";
  return (
    <AdminLayout>
      <div className="pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <button className="flex items-center gap-2 text-[#222] text-sm mb-8" onClick={() => window.history.back()}>
            <ArrowLeft />
            Back
          </button>
          <h1 className="text-2xl font-bold text-[#222] mb-2">Edit Profile</h1>
          <p className="text-[#666] mb-8">Keep your profile updated so you stand out and get noticed.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="border border-[#E8E8E8] rounded-2xl p-8 flex gap-4 mb-4">
                <div className="w-28 h-28 rounded-full bg-[#F4F4F4] border border-[#BFBFBF] flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-[#BFBFBF]">{getInitials()}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">Add Your Profile Photo</p>
                  <p className="text-xs text-[#666] mb-3 text-center">A clear photo helps scouts and fans recognize you.</p>
                  <button className="border border-primary text-primary rounded-full px-5 py-2 bg-white text-sm font-medium">Upload Photo</button>
             </div>
              </div>
            </div>
            <form className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[#222] mb-2">First Name</label>
                <input className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm" placeholder="Enter first name" />
              </div>
              <div>
                <label className="block text-[#222] mb-2">Last Name</label>
                <input className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm" placeholder="Enter last name" />
              </div>
              <div>
                <label className="block text-[#222] mb-2">Email Address</label>
                <input className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm" placeholder="Enter email address" />
              </div>
              <div>
                <label className="block text-[#222] mb-2">Phone Number</label>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 border border-[#E8E8E8] rounded-md bg-white text-xs text-[#222]">🇳🇬</span>
                  <input className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm" placeholder="Enter phone number" />
                </div>
              </div>
              <div>
                <label className="block text-[#222] mb-2">Gender</label>
                <select className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm">
                  <option>Select your gender</option>
                </select>
              </div>
              <div>
                <label className="block text-[#222] mb-2">Date of Birth</label>
                <div className="relative">
                  <input type="date" className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm pr-10" placeholder="Select your date of birth" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999]">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8h18M8 3v2m8-2v2m-9 9h6" /></svg>
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-[#222] mb-2">Nationality</label>
                <select className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm">
                  <option>Select</option>
                </select>
              </div>
              <div>
                <label className="block text-[#222] mb-2">Primary Position</label>
                <select className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm">
                  <option>Select</option>
                </select>
              </div>
              <div>
                <label className="block text-[#222] mb-2">Secondary Position</label>
                <select className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm">
                  <option>Select</option>
                </select>
              </div>
              <div>
                <label className="block text-[#222] mb-2">Preferred Foot</label>
                <select className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm">
                  <option>Select</option>
                </select>
              </div>
              <div>
                <label className="block text-[#222] mb-2">Height</label>
                <input className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm" placeholder="E.g 162 cm" />
              </div>
              <div>
                <label className="block text-[#222] mb-2">Weight</label>
                <input className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm" placeholder="E.g 80 kg" />
              </div>
              <div className="col-span-2 flex justify-end mt-4">
                <button type="submit" className="rounded-full w-full bg-primary text-white px-16 py-3 font-semibold text-base shadow-sm">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Profile;