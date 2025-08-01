"use client";

import React, { useState } from "react";
import { Spin } from "antd";
import Modal from "./Modal";
import api from "@/utils/api";
import { userAtom } from "@/store/user";
import { useAtomValue } from "jotai";

const NotificationPreferencesTab = () => {
  const notificationOptions = [
    { key: "profileViewsByScouts", label: "Profile Views by Scouts" },
    { key: "newsAnnouncements", label: "Playeer News & Announcements" },
    { key: "videoUploadSuccess", label: "Video Upload Success" },
    { key: "profileActivityAlerts", label: "Profile Activity Alerts" },
  ] as const;
  type ToggleKey = (typeof notificationOptions)[number]["key"];
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    profileViewsByScouts: false,
    newsAnnouncements: false,
    videoUploadSuccess: false,
    profileActivityAlerts: false,
  });

  const handleToggle = (key: ToggleKey) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#F4F4F4] mx-auto md:w-[40%] p-4 rounded-xl">
      <p className="text-center text-sm mb-4">
        Stay informed without the noise. Manage when and how you receive updates
        from Playeer.
      </p>
      <div className="bg-[#FCFCFC] rounded-xl p-3">
        <p className="font-bold text-sm">Email Notifications</p>
        {notificationOptions.map((option) => (
          <div
            className="flex justify-between items-center my-3"
            key={option.key}
          >
            <p className="text-sm">{option.label}</p>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${toggles[option.key] ? "bg-primary" : "bg-gray-300"
                }`}
              onClick={() => handleToggle(option.key)}
              aria-pressed={toggles[option.key]}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${toggles[option.key] ? "translate-x-5" : "translate-x-1"
                  }`}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="text-white bg-primary p-3 rounded-full w-44 mx-auto mt-4">
          Save
        </button>
      </div>
    </div>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const user = useAtomValue(userAtom);

  const [showModal, setShowModal] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [visibility, setVisibility] = useState<any>(user?.visibility);

  const toggleVisibility = async () => {
    setToggle(!toggle);
    try {
      await api.patch(`/users/${user?._id}/visibility`, {
        visibility: visibility
      });

    } catch {

    } finally {
      setToggle(false);
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await api.patch("/users/me/soft-delete");
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }, 1200);
    } catch (err) {
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeactivate = async () => {
    setDeactivateLoading(true);
    try {
      await api.patch("/users/me/deactivate");
      // Log out and redirect to login page after short delay
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }, 1200);
    } catch (err) {
    } finally {
      setDeactivateLoading(false);
    }
  };

  // Move the tabData array inside the Tabs component to access showModal/setShowModal
  const tabData = [
    {
      label: "Privacy & Visibility Settings",
      content: (
        <div className="bg-[#F4F4F4] mx-auto md:w-[40%] p-4 rounded-xl">
          <p className="text-center text-sm mb-4">
            Take control of your visibility. Decide who gets access to your
            football journey and how your videos are viewed by others.
          </p>
          <div className="bg-[#FCFCFC] rounded-xl p-3">
            <div className="my-4">
              <label className="text-sm font-bold mb-2">
                Who Can View Your Profile?
              </label>
              <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="bg-[#F4F4F4] text-sm p-3 w-full rounded-md">
                <option value="" className="hidden">
                  Select
                </option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            {/* <div className="my-4">
              <label className="text-sm font-bold mb-2">
                Default Setting for New Videos
              </label>
              <select className="bg-[#F4F4F4] text-sm p-3 w-full rounded-md">
                <option value="" className="hidden">
                  Select
                </option>
              </select>
            </div> */}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => toggleVisibility()}
              className={`w-44 rounded-full p-3 my-4 min-h-[48px] transition-colors duration-200 mx-auto
                ${toggle ? 'border border-primary bg-[#E5F4FF] text-primary' : 'bg-primary text-[#FCFCFC]'}
              `}
              disabled={toggle}
            >
              {toggle ? (
                <span className="flex items-center justify-center">
                  <Spin size="small" style={{ color: '#0095FF' }} />
                </span>
              ) : (
                <span className="my-auto">Save</span>
              )}
            </button>
          </div>
        </div>
      ),
    },
    // {
    //   label: "Notification Preferences",
    //   content: <NotificationPreferencesTab />,
    // },
    // {
    //   label: "Language & Regional Preferences",
    //   content: (
    //     <div className="bg-[#F4F4F4] mx-auto md:w-[40%] p-4 rounded-xl">
    //       <p className="text-center text-sm mb-4">
    //         Choose how content is displayed to you, including language and
    //         regional settings.
    //       </p>
    //       <div className="bg-[#FCFCFC] rounded-xl p-3">
    //         <div className="my-4">
    //           <label className="text-sm font-bold mb-2">Language</label>
    //           <select className="bg-[#F4F4F4] text-sm p-3 w-full rounded-md">
    //             <option value="" className="hidden">
    //               Select
    //             </option>
    //           </select>
    //         </div>
    //         <div className="my-4">
    //           <label className="text-sm font-bold mb-2">Timezone</label>
    //           <select className="bg-[#F4F4F4] text-sm p-3 w-full rounded-md">
    //             <option value="" className="hidden">
    //               Select
    //             </option>
    //           </select>
    //         </div>
    //       </div>
    //       <div className="text-center">
    //         <button className="text-white bg-primary p-3 rounded-full w-44 mx-auto mt-4">
    //           Save
    //         </button>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      label: "Account & App Behavior",
      content: (
        <div className="bg-[#F4F4F4] mx-auto md:w-[40%] p-4 rounded-xl">
          <p className="text-center text-sm mb-4">
            Adjust how your profile and data behave on Playeer.
          </p>
          <div className="bg-[#FCFCFC] rounded-xl p-3 mb-4">
            <p className="font-bold text-sm">
              Deactivate Profile (Temporarily)
            </p>
            <p className="text-sm text-[#6C6C6C] my-4">
              Hide your profile temporarily. Your data will remain saved, but
              your page and videos won't be publicly accessible.
            </p>
            <button
              type="button"
              className={`w-full rounded-full p-3 my-4 min-h-[48px] transition-colors duration-200
                ${deactivateLoading ? 'border border-primary bg-[#E5F4FF] text-primary' : 'bg-primary text-[#FCFCFC]'}
              `}
              onClick={handleDeactivate}
              disabled={deactivateLoading}
            >
              {deactivateLoading ? (
                <span className="flex items-center justify-center">
                  <Spin size="small" style={{ color: '#0095FF' }} />
                </span>
              ) : (
                <span className="my-auto">Deactivate My Profile</span>
              )}
            </button>
            {/* {deactivateSuccess && (
              <p className="text-green-600 text-sm mt-2">{deactivateSuccess}</p>
            )}
            {deactivateError && (
              <p className="text-red-600 text-sm mt-2">{deactivateError}</p>
            )} */}
          </div>
          <div className="bg-[#FCFCFC] rounded-xl p-3">
            <p className="font-bold text-sm">Request Account Deletion</p>
            <p className="text-sm text-[#6C6C6C] my-4">
              This action is permanent. All your profile data, videos, and
              history will be erased from Playeer.
            </p>
            <button
              className="w-full p-3 rounded-full text-white bg-[#E82728] "
              onClick={() => setShowModal(true)}
            >
              Delete Account
            </button>
          </div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)} width="400px">
              <div className="text-center p-3">
                <img
                  src="/images/male-memojis.svg"
                  className="mx-auto w-44"
                  alt=""
                />

                <p className="text-2xl font-bold mb-4">
                  Are you sure you want to delete your account?
                </p>
                <p className="mb-6 text-sm text-[#6C6C6C]">
                  This action is permanent. All your profile data, videos, and
                  history will be erased from Playeer.
                </p>
                {/* {deleteSuccess && (
                  <p className="text-green-600 text-sm mb-2">{deleteSuccess}</p>
                )}
                {deleteError && (
                  <p className="text-red-600 text-sm mb-2">{deleteError}</p>
                )} */}
                <div className="flex justify-center gap-4 text-sm">
                  <button
                    className="px-6 w-full py-3 rounded-full bg-[#E5F4FF] text-primary"
                    onClick={() => setShowModal(false)}
                    disabled={deleteLoading}
                  >
                    No
                  </button>
                  <button
                    className="px-6 w-full py-3 rounded-full bg-[#E82728] text-white"
                    onClick={handleDeleteAccount}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "Deleting..." : "Yes"}
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 bg-transparent rounded-t-xl overflow-x-auto">
        {tabData.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-6 py-3 text-sm font-semibold focus:outline-none transition-colors duration-200 relative ${activeTab === idx ? "border-b-2 border-primary" : ""
              }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="md:p-6 bg-[#FCFCFC] rounded-b-xl min-h-[120px] mt-4">
        {tabData[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
