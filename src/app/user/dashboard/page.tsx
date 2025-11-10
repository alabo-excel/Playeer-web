"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
import { BadgeCheck, CloudUpload, Plus, SquarePen } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user";
import api from "@/utils/api";
import EditProfile from "@/components/Modals/EditProfile";
import AchievementModal from "@/components/Modals/Achievement";
import CertificateModal from "@/components/Modals/Certificate";
import { positions } from "@/utils/positions";
import { Country } from "country-state-city";
import Link from "next/link";

const dashboard = () => {
  const user = useAtomValue(userAtom);
  const [countries] = useState(Country.getAllCountries());
  const [activeTab, setActiveTab] = useState("highlights");

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState(null);
  const [certToEdit, setCertToEdit] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const getInitials = () => {
    if (!user?.fullName) return "U";
    const names = user.fullName.split(" ");
    return (names[0][0] + (names[1]?.[0] || "")).toUpperCase();
  };

  const userPosition =
    positions.find((pos: any) => pos.value === user?.mainPosition)?.label || "-";

  const secondaryPosition =
    positions.find((pos: any) => pos.value === user?.secondaryPosition)?.label ||
    "-";

  const countryObj = countries.find((c: any) => c.isoCode === user?.country);
  const countryName = countryObj?.name || "-";

  return (
    <AdminLayout>
      <div className="pt-3 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-8 mb-6 border border-[#E8E8E8]">
          <div className="flex gap-6 mb-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-2 border-[#DFDFDF] bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-[#BFBFBF]">
                  {getInitials()}
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <h1 className="text-2xl font-bold text-[#1F1F1F] mb-1">
                    {user?.fullName || "User"}
                  </h1>
                  {user?.plan === "free" ?
                    <span className="inline-block my-auto bg-[#E8F4E8] text-[#0F973D] px-3 py-1 rounded-full text-xs font-medium">
                      {user?.plan === "free" ? "Free" : user?.plan || "Free"}
                    </span> : <BadgeCheck fill='#1969FE' className='text-white' />}
                </div>
                <div className="flex gap-2">
                  <Link href={'/user/profile'}>
                    <button
                      className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                    >
                      <SquarePen size={16} />
                      Edit Profile
                    </button>
                  </Link>
                  <Link href={'/user/update-plan'}>
                    <button className="flex items-center gap-2 border border-primary text-primary px-6 py-2 rounded-full text-sm font-medium hover:bg-[#E5F4FF] transition">
                      My Subscription
                    </button>
                  </Link>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-5 gap-6">
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">Email address</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {user?.email || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">Phone Number</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {user?.phone || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">Gender</p>
                  <p className="text-sm font-medium text-[#1F1F1F] capitalize">
                    {user?.gender || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">Age</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">-</p>
                </div>
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">Nationality</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {countryName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-6 mt-4 pt-4 border-t border-[#E8E8E8]">
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">
                    Preferred Position
                  </p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {userPosition}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">
                    Secondary Position
                  </p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {secondaryPosition}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">Preferred foot</p>
                  <p className="text-sm font-medium text-[#1F1F1F] capitalize">
                    {user?.dominantFoot || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">Height</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {user?.height || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6C6C6C] mb-1">Weight</p>
                  <p className="text-sm font-medium text-[#1F1F1F]">
                    {user?.weight || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-[#DFDFDF] mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("highlights")}
              className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "highlights"
                  ? "text-[#1F1F1F]"
                  : "text-[#6C6C6C] hover:text-[#1F1F1F]"
                }`}
            >
              Highlight Videos
              {activeTab === "highlights" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>
              )}
            </button>
            {user?.plan !== "free" && (
              <>
                <button
                  onClick={() => setActiveTab("achievements")}
                  className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "achievements"
                      ? "text-[#1F1F1F]"
                      : "text-[#6C6C6C] hover:text-[#1F1F1F]"
                    }`}
                >
                  Achievements
                  {activeTab === "achievements" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("certifications")}
                  className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "certifications"
                      ? "text-[#1F1F1F]"
                      : "text-[#6C6C6C] hover:text-[#1F1F1F]"
                    }`}
                >
                  Certifications
                  {activeTab === "certifications" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Highlights Tab */}
          {activeTab === "highlights" && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="flex justify-center mb-6">
                <div className="bg-primary bg-opacity-10 p-4 rounded-full">
                  <svg
                    className="w-12 h-12 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                No highlights yet.
              </h3>
              <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                Upload your best moments to showcase your talent and get noticed.
              </p>
              <button className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
                <Plus size={18} />
                Upload Highlight Video
              </button>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && user?.plan !== "free" && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="flex justify-center mb-6">
                <div className="bg-[#FFF8E6] p-4 rounded-full">
                  <svg
                    className="w-12 h-12 text-[#FBBC05]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                No achievements yet.
              </h3>
              <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                Add your accomplishments to highlight your success and achievements.
              </p>
              <button
                onClick={() => setShowAchievement(true)}
                className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
              >
                <Plus size={18} />
                Add First Achievement
              </button>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === "certifications" && user?.plan !== "free" && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="flex justify-center mb-6">
                <div className="bg-[#E8F5E9] p-4 rounded-full">
                  <CloudUpload className="w-12 h-12 text-[#0F973D]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                No certificates yet.
              </h3>
              <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                If you've completed a football program, trial, camp, or training, upload proof here.
              </p>
              <button
                onClick={() => setShowCertModal(true)}
                className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
              >
                <CloudUpload size={18} />
                Upload Certificate
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <EditProfile
          show={showEditProfile}
          onClose={() => setShowEditProfile(false)}
        />

        <AchievementModal
          show={showAchievement}
          onClose={() => {
            setShowAchievement(false);
            setAchievementToEdit(null);
          }}
          onSuccess={() => fetchProfile()}
          achievementToEdit={achievementToEdit}
        />

        <CertificateModal
          showModal={showCertModal}
          setShowModal={() => {
            setShowCertModal(false);
            setCertToEdit(null);
          }}
          onSuccess={() => fetchProfile()}
          certificateToEdit={certToEdit}
        />
      </div>
    </AdminLayout>
  );
};

export default dashboard;
