"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
import { BadgeCheck, CloudUpload, CreditCard, PencilLine, Plus, SquarePen, SquarePlay, TriangleAlert } from "lucide-react";
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
import NewHighlights from "@/components/Modals/Highlights";

const dashboard = () => {
  const user = useAtomValue(userAtom);
  const [countries] = useState(Country.getAllCountries());
  const [activeTab, setActiveTab] = useState("highlights");

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState(null);
  const [certToEdit, setCertToEdit] = useState(null);
  const [modal, setShowModal] = useState(false)

  const [highlights, setHighlights] = useState([])
  const [certificates, setCertificates] = useState([])
  const [achievements, setAchievements] = useState([])

  const fetchHighlights = async () => {
    if (!user?._id) return;
    // setHighlightsLoading(true);
    try {
      const res = await api.get(`/highlights/user/${user._id}`);
      console.log(res.data?.data);
      setHighlights(res.data?.data || []);
    } catch (err) {
      // setHighlightsError("Failed to load highlights");
    } finally {
      // setHighlightsLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchHighlights();
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
        <div className="bg-[#F4F4F4] rounded-3xl p-8 mb-6">
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
                    </span> : <BadgeCheck fill='#1969FE' className='text-white my-auto' />}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-6 gap-6">
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
                <Link href={'/user/profile'}>
                  <button
                    className="flex w-full justify-center items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
                  >
                    <PencilLine size={16} />
                    Edit Profile
                  </button>
                </Link>

              </div>

              <div className="grid grid-cols-6 gap-6 mt-4 pt-4">
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
                <Link href={'/user/update-plan'}>
                  <button className="flex w-full items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-full text-sm font-medium hover:bg-[#E5F4FF] transition">
                    <CreditCard size={16} />
                    My Subscription
                  </button>
                </Link>
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
                : ""
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
            highlights.length >= 1 ? (
              <div>
                {/* TODO: Display highlights list */}
                {highlights.map((highlight, index) => (
                  <div key={index}>
                    {/* Highlight item component */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="flex justify-center mb-6">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-full">
                    <SquarePlay className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                  No highlights yet.
                </h3>
                <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                  Upload your best moments to showcase your talent and get noticed.
                </p>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
                  <Plus size={18} />
                  Upload Highlight Video
                </button>
              </div>
            )
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            achievements.length >= 1 ? (
              <div>
                {/* TODO: Display achievements list */}
                {achievements.map((achievement, index) => (
                  <div key={index}>
                    {/* Achievement item component */}
                  </div>
                ))}
              </div>
            ) : user?.plan === 'free' ? (
              // Free plan - show upgrade message
              <div className="flex flex-col items-center justify-center py-20">
                <div className="flex justify-center mb-6">
                  <img src="/images/icons/achievements-lo.png" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                  Show Your Achievements and Make Your Profile Stand Out
                </h3>
                <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                  Highlight your awards, tournament wins, MVP moments, or national selections to prove your competitive edge.                </p>

                <button className="text-[#FFE9E9] py-3 bg-[#EE9C2E] rounded-full px-4 flex items-center gap-2 text-sm mb-3">
                  <TriangleAlert />
                  Achievements can only be added on the Pro Plan.
                </button>
                <Link href="/user/update-plan">
                  <button className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
                    {/* <CreditCard size={18} /> */}
                    Upgrade Plan
                  </button>
                </Link>
              </div>
            ) : (
              // Premium plan - show add achievements message
              <div className="flex flex-col items-center justify-center py-20">
                <div className="flex justify-center mb-6">
                  <img src="/images/icons/achievements.png" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                  No achievements added yet.
                </h3>
                <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                  Showcase your career milestones whether it’s tournament wins, MVP awards, trials, or big moments on the pitch.                </p>

                <button
                  onClick={() => setShowAchievement(true)}
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
                >
                  <Plus size={18} />
                  Add Achievement
                </button>
              </div>
            )
          )}

          {/* Certifications Tab */}
          {activeTab === "certifications" && (
            certificates.length >= 1 ? (
              <div>
                {/* TODO: Display certificates list */}
                {certificates.map((certificate, index) => (
                  <div key={index}>
                    {/* Certificate item component */}
                  </div>
                ))}
              </div>
            ) : user?.plan === 'free' ? (
              // Free plan - show upgrade message
              <div className="flex flex-col items-center justify-center py-20">
                <div className="flex justify-center mb-6">
                  <img src="/images/icons/certification-lo.png" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                  Upload Your Certifications Unlock Credibility
                </h3>
                <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                  Showcase your training licenses, academy acceptance letters, or verified documents to boost your profile and gain trust from scouts and coaches.
                </p>
                <button className="text-[#FFE9E9] py-3 bg-[#EE9C2E] rounded-full px-4 flex items-center gap-2 text-sm mb-3">
                  <TriangleAlert />
                  Certification uploads are available only on the Pro Plan.
                </button>
                <Link href="/user/update-plan">
                  <button className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
                    {/* <CreditCard size={18} /> */}
                    Upgrade Plan
                  </button>
                </Link>
              </div>
            ) : (
              // Premium plan - show add certificates message
              <div className="flex flex-col items-center justify-center py-20">
                <div className="flex justify-center mb-6">
                  <img src="/images/icons/certification.png" alt="" />
                </div>
                <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                  No certification uploaded yet.
                </h3>
                <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                  Add your verified training certificates, academy licenses, or fitness test results to build credibility.                </p>
                <button
                  onClick={() => setShowCertModal(true)}
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
                >
                  <Plus size={18} />
                  Add Certification
                </button>
              </div>
            )
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

        <NewHighlights
          showModal={modal}
          onCLose={() => setShowModal(false)}
          fetchHighlights={() => fetchHighlights()}
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
