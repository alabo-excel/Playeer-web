"use client";

import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import {
  Achievement,
  Certificate,
  FootballJourneyEntry,
  User,
} from "@/store/user";
import { formatDate } from "@/utils/formatDate";
import { getAge } from "@/utils/ageConverter";
import { Country } from "country-state-city";
import { positions } from "@/utils/positions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "../Card";
import api from "@/utils/api";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, ChevronDown, ChevronUp, SquarePlay } from "lucide-react";
import HeaderNav from "../HeaderNav";
import PlayerEnquiry from "./PlayerEnquiry";
const PlayerModal = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data?: User | null;
}) => {
  const countries = Country.getAllCountries();
  const countryObj = countries.find((c: any) => c.isoCode === data?.country);
  const [highlights, setHighlights] = useState<any[]>([]);
  const userPosition = positions;
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("highlights");

  const positionLabel = userPosition.find(
    (pos: any) => pos.value === data?.mainPosition
  )?.label;

  const secondLabe = userPosition.find(
    (pos: any) => pos.value === data?.secondaryPosition
  )?.label;

  const fetchHighlights = async () => {
    const res = await api.get(`/highlights/user/${data?._id}`);
    console.log(res.data?.data);
    setHighlights(res.data?.data || []);
  };

  useEffect(() => {
    fetchHighlights();
  }, [data]);

  useEffect(() => {
    if (open) {
      // Save the current scroll position
      const scrollY = window.scrollY;

      // Apply styles to prevent scrolling and cover scrollbar
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position and styles
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [open]);


  const getInitials = () => {
    if (!data?.fullName) return "U";
    const names = data.fullName.split(" ");
    return (names[0][0] + (names[1]?.[0] || "")).toUpperCase();
  };

  // Search state and filtered lists used by the tabs
  const [searchQuery, setSearchQuery] = useState("");

  const achievements = data?.achievements || [];
  const certificates = data?.certificates || [];

  const filteredHighlights = highlights.filter((h: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return ((h.title || "").toLowerCase().includes(q) || (h.description || "").toLowerCase().includes(q));
  });

  const filteredAchievements = achievements.filter((a: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return ((a.title || "").toLowerCase().includes(q) || (a.description || "").toLowerCase().includes(q));
  });

  const filteredCertificates = certificates.filter((c: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return ((c.certificateTitle || "").toLowerCase().includes(q) || (c.description || "").toLowerCase().includes(q));
  });

  // helper used by Card components to refresh profile-ish data
  const fetchProfile = async () => {
    try {
      if (!data?._id) return;
      // attempt to re-fetch profile (caller may ignore returned value)
      await api.get(`/users/view/${data._id}`);
      // also refresh highlights list
      await fetchHighlights();
    } catch (error) {
      console.error("fetchProfile error:", error);
    }
  };

  return (
    <>
      {open && (
        // <Modal width="100%" onClose={onClose}>
        <div
          className="fixed inset-0 z-[9999] bg-white overflow-y-auto"
          style={{ right: 0, left: 0, top: 0, bottom: 0 }}
        >
          <div className="p-6">
            <HeaderNav scroll={true} />

            <div className="max-w-7xl mx-auto">
              <button onClick={onClose} className="flex gap-3 mt-20">
                <ArrowLeft />
                <span>Back</span>
              </button>
              <div className="lg:flex justify-between items-center my-4">
                <h1 className="my-auto text-3xl">Profile Details</h1>

                {/* <Link href={"#contact"} onClick={onClose}> */}
                <button onClick={() => setEnquiryModalOpen(true)} className="my-auto bg-[#0095FF] text-white py-3 rounded-full px-8">
                  Player Inquiry
                </button>
                {/* </Link> */}
              </div>
              <div className="bg-[#F4F4F4] rounded-3xl p-4 sm:p-6 lg:p-8 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[#DFDFDF] bg-[#F5F5F5] flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    {data?.profilePicture ? (
                      <img
                        src={data.profilePicture}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#BFBFBF]">
                        {getInitials()}
                      </span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div className="flex sm:gap-4 justify-center items-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F1F1F] mb-2 sm:mb-1">
                          {data?.fullName || "User"}
                        </h1>
                        {data?.plan === "free" ?
                          <span className="inline-block bg-[#E8F4E8] text-[#0F973D] px-3 py-1 rounded-full text-xs font-medium">
                            {data?.plan === "free" ? "Free" : data?.plan || "Free"}
                          </span> : <BadgeCheck fill='#1969FE' className='text-white' />}
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">Email address</p>
                        <p className="text-sm font-bold text-[#1F1F1F] break-all">
                          {data?.email || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">Phone Number</p>
                        <p className="text-sm font-bold text-[#1F1F1F]">
                          {data?.phone || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">Gender</p>
                        <p className="text-sm font-bold text-[#1F1F1F] capitalize">
                          {data?.gender || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">Age</p>
                        <p className="text-sm font-bold text-[#1F1F1F]">
                          {data?.dateOfBirth ? getAge(data.dateOfBirth) : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">Nationality</p>
                        <p className="text-sm font-bold text-[#1F1F1F]">
                          {countryObj && countryObj?.name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">
                          Preferred Position
                        </p>
                        <p className="text-sm font-bold text-[#1F1F1F]">
                          {positionLabel}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">
                          Secondary Position
                        </p>
                        <p className="text-sm font-bold text-[#1F1F1F]">
                          {secondLabe}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">Preferred foot</p>
                        <p className="text-sm font-bold text-[#1F1F1F] capitalize">
                          {data?.dominantFoot || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">Height</p>
                        <p className="text-sm font-bold text-[#1F1F1F]">
                          {data?.height || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6C6C6C] mb-1">Weight</p>
                        <p className="text-sm font-bold text-[#1F1F1F]">
                          {data?.weight || "-"}
                        </p>
                      </div>

                    </div>


                  </div>
                </div>
              </div>


              <div className="border-b border-[#DFDFDF] mb-6">
                <div className="flex flex-wrap gap-4 sm:gap-8 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("highlights")}
                    className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === "highlights"
                      ? "text-[#1F1F1F]"
                      : ""
                      }`}
                  >
                    <span className="hidden sm:inline">Highlight Videos</span>
                    <span className="sm:hidden">Highlights</span>
                    {activeTab === "highlights" && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>
                    )}
                  </button>
                  {(
                    <>
                      <button
                        onClick={() => setActiveTab("achievements")}
                        className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === "achievements"
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
                        className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === "certifications"
                          ? "text-[#1F1F1F]"
                          : "text-[#6C6C6C] hover:text-[#1F1F1F]"
                          }`}
                      >
                        <span className="hidden sm:inline">Certifications</span>
                        <span className="sm:hidden">Certificates</span>
                        {activeTab === "certifications" && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="min-h-[400px]">
                {/* Highlights Tab */}
                {activeTab === "highlights" && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                      <div className="relative flex-1 max-w-full sm:max-w-md">
                        <input
                          type="text"
                          placeholder="Search highlights..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-[#DFDFDF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        </span>
                      </div>

                    </div>

                    {highlights.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <div className="flex justify-center mb-6">
                          <div className="bg-primary bg-opacity-10 p-4 rounded-full">
                            <SquarePlay className="text-white" />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                          No highlights yet.
                        </h3>

                      </div>
                    ) : filteredHighlights.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <div className="flex justify-center mb-6">
                          <div className="bg-gray-100 p-4 rounded-full">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="11" cy="11" r="8" />
                              <path d="M21 21l-4.35-4.35" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                          No highlights found
                        </h3>
                        <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                          No highlights match your search "{searchQuery}". Try different keywords or clear your search.
                        </p>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredHighlights.map((highlight, index) => (
                          <Card key={index} data={highlight} fetchData={fetchHighlights} type="highlight" />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                      <div className="relative flex-1 max-w-full sm:max-w-md">
                        <input
                          type="text"
                          placeholder="Search Achievements..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-[#DFDFDF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        </span>
                      </div>

                    </div>

                    {(!data?.achievements || data.achievements.length === 0) ? (

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
                      </div>

                    ) : filteredAchievements.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <div className="flex justify-center mb-6">
                          <div className="bg-gray-100 p-4 rounded-full">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="11" cy="11" r="8" />
                              <path d="M21 21l-4.35-4.35" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                          No achievements found
                        </h3>
                        <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                          No achievements match your search "{searchQuery}". Try different keywords or clear your search.
                        </p>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredAchievements.map((achievement, index) => (
                          <Card key={index} data={achievement} fetchData={fetchProfile} type="achievement" />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Certifications Tab */}
                {activeTab === "certifications" && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                      <div className="relative flex-1 max-w-full sm:max-w-md">
                        <input
                          type="text"
                          placeholder="Search Certificates..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-[#DFDFDF] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        </span>
                      </div>
                    </div>

                    {(!data?.certificates || data.certificates.length === 0) ? (

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

                      </div>

                    ) : filteredCertificates.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <div className="flex justify-center mb-6">
                          <div className="bg-gray-100 p-4 rounded-full">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="11" cy="11" r="8" />
                              <path d="M21 21l-4.35-4.35" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">
                          No certificates found
                        </h3>
                        <p className="text-sm text-[#6C6C6C] text-center mb-6 max-w-md">
                          No certificates match your search "{searchQuery}". Try different keywords or clear your search.
                        </p>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredCertificates.map((certificate, index) => (
                          <div key={index}>
                            <Card key={index} data={certificate} fetchData={fetchProfile} type="certificate" />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <PlayerEnquiry isOpen={enquiryModalOpen} playerId={data?._id} onClose={() => setEnquiryModalOpen(false)} />
    </>
  );
};

export default PlayerModal;
