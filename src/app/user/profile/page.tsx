"use client";
import Card from "@/components/Card";
import AdminLayout from "@/components/layouts/AdminLayout";
import UserComp from "@/components/UserComp";
import { CloudUpload, Plus, SquarePen, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import api from "@/utils/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Achievement,
  Certificate,
  FootballJourneyEntry,
  userAtom,
} from "@/store/user";
import { useAtomValue } from "jotai";
import { getAge } from "@/utils/ageConverter";
import EditProfile from "@/components/Modals/EditProfile";
import { formatDate } from "@/utils/formatDate";
import { positions } from "@/utils/positions";
import { Country } from "country-state-city";
import JourneyModal from "@/components/Modals/Journey";
import AchievementModal from "@/components/Modals/Achievement";
import CertificateModal from "@/components/Modals/Certificate";
import { Spin } from "antd";

const profile = () => {
  const user = useAtomValue(userAtom);
  const [countries] = useState(Country.getAllCountries());
  const [editJourney, setEditJourney] = useState<FootballJourneyEntry | null>(
    null
  );

  const userPosition = positions;
  const positionLabel = userPosition.find(
    (pos: any) => pos.value === user?.mainPosition
  )?.label;

  const secondLabe = userPosition.find(
    (pos: any) => pos.value === user?.secondaryPosition
  )?.label;

  const countryObj = countries.find((c: any) => c.isoCode === user?.country);

  // State for fetched profile data
  const [profileData, setProfileData] = useState({
    journey: [],
    achievements: [],
    certificates: [],
  });
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementToEdit, setAchievementToEdit] =
    useState<Achievement | null>(null);
  const [certToEdit, setCertToEdit] = useState<Certificate | null>(null);

  // Fetch user profile (journey, achievements, certificates)

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await api.get("/users/profile");
      const data = res.data?.data || {};
      setProfileData({
        journey: data.footballJourney || [],
        achievements: data.achievements || [],
        certificates: data.certificates || [],
      });
    } catch (err) {
      setProfileData({ journey: [], achievements: [], certificates: [] });
    } finally {
      setLoadingProfile(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleDeleteJourney = async (id: string) => {
    try {
      await api.delete(`/onboarding/journey/${id}`);
      fetchProfile();
    } catch (err) {}
  };
  // File upload refs

  return (
    <AdminLayout>
      {loadingProfile ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="pt-3">
          <div className="md:flex justify-between">
            <div className="lg:w-[45%]">
              <p className="text-2xl font-bold">Your Football Profile</p>
              <p className="text-sm my-3 text-[#6C6C6C]">
                This is what scouts and clubs see. Make it count. The more
                detailed and authentic your profile, the higher your chances of
                getting discovered.
              </p>
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="text-primary my-auto p-2 flex gap-3 rounded-full px-6 bg-[#E5F4FF]"
            >
              <SquarePen size={15} className="my-auto" />
              <span>Edit Profile</span>
            </button>
          </div>
          <section className="bg-[#FCFCFC] md:flex gap-4 p-3 rounded-3xl">
            <div className="md:w-[35%]">
              <UserComp />
            </div>
            <div className="md:w-[65%]">
              <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">Personal Information</p>
                  {/* <button className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary">
                  <SquarePen size={15} className="my-auto" />
                  <span className="text-sm my-auto">Edit</span>
                </button> */}
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Full Name</p>
                    <p className="font-bold text-base">{user?.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Date of Birth</p>
                    <p className="font-bold text-base">
                      {user?.dateOfBirth && formatDate(user?.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Age</p>
                    <p className="font-bold text-base">
                      {user?.dateOfBirth && getAge(user.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Gender</p>
                    <p className="font-bold capitalize text-base">{user?.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Nationality</p>
                    <p className="font-bold text-base">{countryObj?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">City</p>
                    <p className="font-bold text-base">{user?.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Contact Email</p>
                    <p className="font-bold text-base">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">Football Information</p>
                  {/* <button className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary">
                  <SquarePen size={15} className="my-auto" />
                  <span className="text-sm my-auto">Edit</span>
                </button> */}
                </div>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Main Position</p>
                    <p className="font-bold text-bse">{positionLabel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">
                      Secondary Position
                    </p>
                    <p className="font-bold text-base">{secondLabe}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Dominant Foot</p>
                    <p className="font-bold capitalize text-base">{user?.dominantFoot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">Jersey Number</p>
                    <p className="font-bold text-base">{user?.jerseyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">
                      Years of Expreience
                    </p>
                    <p className="font-bold text-base">
                      {user?.yearsOfExperience} years
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-2">
                      Current Club/Academy
                    </p>
                    <p className="font-bold text-base">{user?.currentTeam}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xl font-bold">Football Journey</p>
                    <p className="text-sm text-[#6C6C6C]">
                      List past clubs, academies, or events you’ve been part of.
                    </p>
                  </div>
                  {profileData.journey.length >= 1 ? (
                    <button
                      onClick={() => setShowJourney(true)}
                      className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary"
                    >
                      <Plus size={15} className="my-auto" />
                      <span className="text-sm my-auto">Add</span>
                    </button>
                  ) : null}
                </div>
                {profileData.journey.length >= 1 ? (
                  <div>
                    {profileData.journey.map((single: FootballJourneyEntry) => (
                      <div className="my-3" key={single._id}>
                        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 items-center">
                          <p className="font-bold text-base break-words max-w-[120px] md:max-w-none">
                            {single.teamName}
                          </p>
                          <span className="text-[#232323] text-sm whitespace-nowrap">
                            ({formatDate(single.from)} – {formatDate(single.to)})
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setEditJourney(single);
                              setShowJourney(true);
                            }}
                            className="p-1"
                            title="Edit"
                          >
                            <SquarePen
                              size={15}
                              className="my-auto text-[#0095FF]"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteJourney(single._id)}
                            className="p-1"
                            title="Delete"
                          >
                            <Trash2
                              size={15}
                              className="my-auto text-red-500"
                            />
                          </button>
                        </div>
                        <p className="text-sm text-[#6C6C6C] mt-1 md:mt-0">
                          {
                            userPosition.find(
                              (pos: any) => pos.value === single?.position
                            )?.label
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="lg:w-[55%] my-4 mx-auto text-center">
                    <p className="text-lg font-bold"> No Journey Entries Yet</p>
                    <p className="text-sm my-2 text-[#6C6C6C]">
                      You haven’t added any clubs, academies, or competitions to
                      your profile.
                    </p>
                    <button
                      onClick={() => setShowJourney(true)}
                      className="bg-primary text-sm text-white flex justify-evenly p-2 rounded-full w-52 mx-auto"
                    >
                      <Plus size={15} className="my-auto" />
                      <span> Add First Experience</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {user?.plan !== "free" && (
            <>
              <div className="bg-[#F4F4F4] p-3 rounded-2xl my-3">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">Achievements</p>
                  {profileData.achievements.length >= 1 ? (
                    <button
                      onClick={() => setShowAchievement(true)}
                      className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary"
                    >
                      <Plus size={15} className="my-auto" />
                      <span className="text-sm my-auto">Add</span>
                    </button>
                  ) : null}
                </div>
                {profileData.achievements.length >= 1 ? (
                  <div className="mt-4">
                    <Swiper
                      modules={[Navigation]}
                      navigation
                      spaceBetween={10}
                      slidesPerView={1.2}
                      breakpoints={{
                        640: {
                          slidesPerView: 2.2,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 3.2,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 4.4,
                          spaceBetween: 10,
                        },
                      }}
                    >
                      {profileData.achievements.map(
                        (achievement: Achievement) => (
                          <SwiperSlide key={achievement._id}>
                            <Card
                              data={achievement}
                              type={"achievement"}
                              fetchData={() => fetchProfile()}
                              editAction={() => {
                                setAchievementToEdit(achievement);
                                setShowAchievement(true);
                              }}
                            />
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  </div>
                ) : (
                  <div className="lg:w-[55%] my-16 mx-auto text-center">
                    <p className="text-lg font-bold">
                      {" "}
                      No Achievements Entries Yet
                    </p>
                    <p className="text-sm my-2 text-[#6C6C6C]">
                      Have you ever won a tournament, earned a “Man of the
                      Match,” or been recognized by your team or coach? This is
                      the place to showcase your football milestones big or
                      small.
                    </p>
                    <button
                      onClick={() => setShowAchievement(true)}
                      className="bg-primary text-sm text-white flex justify-evenly p-2 rounded-full w-52 mx-auto"
                    >
                      <Plus size={15} className="my-auto" />
                      <span> Add First Achievements</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-[#F4F4F4] p-3 rounded-2xl">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">Certificates</p>
                  {profileData.certificates.length >= 1 ? (
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary"
                    >
                      <Plus size={15} className="my-auto" />
                      <span className="text-sm my-auto">Add</span>
                    </button>
                  ) : null}
                </div>
                {profileData.certificates.length >= 1 ? (
                  <div className="mt-4">
                    <Swiper
                      modules={[Navigation]}
                      navigation
                      spaceBetween={10}
                      slidesPerView={1.2}
                      breakpoints={{
                        640: {
                          slidesPerView: 2.2,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 3.2,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 4.4,
                          spaceBetween: 10,
                        },
                      }}
                    >
                      {profileData.certificates.map(
                        (certificate: Certificate) => (
                          <SwiperSlide key={certificate._id}>
                            <Card
                              data={certificate}
                              fetchData={() => fetchProfile()}
                              editAction={() => {
                                setCertToEdit(certificate);
                                setShowModal(true);
                              }}
                            />
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  </div>
                ) : (
                  <div className="lg:w-[55%] my-16 mx-auto text-center">
                    <p className="text-lg font-bold">
                      {" "}
                      No Certificates Entries Yet
                    </p>
                    <p className="text-sm my-2 text-[#6C6C6C]">
                      If you’ve completed a football program, trial, camp, or
                      training upload proof here. Certificates help verify your
                      experience and show you're serious about development.
                    </p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-primary text-sm text-white flex justify-evenly p-2 rounded-full w-52 mx-auto"
                    >
                      <CloudUpload size={15} className="my-auto" />
                      <span> Upload Certificate</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <CertificateModal
            showModal={showModal}
            setShowModal={() => {
              setShowModal(false);
              setCertToEdit(null);
            }}
            onSuccess={() => fetchProfile()}
            certificateToEdit={certToEdit}
          />
          <JourneyModal
            show={showJourney}
            onClose={() => {
              setShowJourney(!showJourney);
              setEditJourney(null);
            }}
            onSuccess={() => fetchProfile()}
            journeyToEdit={editJourney}
          />
          <AchievementModal
            show={showAchievement}
            onClose={() => {
              setShowAchievement(!showAchievement);
              setAchievementToEdit(null);
            }}
            onSuccess={() => fetchProfile()}
            achievementToEdit={achievementToEdit}
          />

          <EditProfile
            show={showEditProfile}
            onClose={() => setShowEditProfile(false)}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default profile;
