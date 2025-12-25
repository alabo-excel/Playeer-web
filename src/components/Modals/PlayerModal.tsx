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
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import HeaderNav from "../HeaderNav";
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
  const [achievementsExpanded, setAchievementsExpanded] = useState(true);
  const [certificatesExpanded, setCertificatesExpanded] = useState(true);
  const [highlightsExpanded, setHighlightsExpanded] = useState(true);
  const userPosition = positions;

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

                <Link href={"#contact"} onClick={onClose}>
                  <button className="my-auto bg-[#0095FF] text-white py-3 rounded-full px-8">
                    Player Inquiry
                  </button>
                </Link>
              </div>
              <section className="bg-[#FCFCFC] md:flex gap-4 p-3 rounded-3xl">
                <div className="md:w-[35%]">
                  <img
                    src={data?.profilePicture || "/images/player-2.jpg"}
                    className="rounded-xl md:h-90 w-full object-cover"
                    alt=""
                  />
                  <p className="text-lg mt-2 font-bold">{data?.fullName}</p>
                  <p className="my-2 text-sm text-[#6C6C6C]">{positionLabel}</p>
                  <div className="bg-[#F4F4F4] p-3 text-center rounded-xl grid grid-cols-3 gap-2">
                    <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
                      <p className="text-[#6C6C6C] text-xs">Age</p>
                      <p className="font-bold mt-3 text-lg">
                        {data?.dateOfBirth && getAge(data.dateOfBirth)}
                      </p>
                    </div>
                    <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
                      <p className="text-[#6C6C6C] text-xs">Height</p>
                      <p className="font-bold mt-3 text-lg">{data?.height}</p>
                    </div>
                    <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
                      <p className="text-[#6C6C6C] text-xs">Weight</p>
                      <p className="font-bold mt-3 text-lg">{data?.weight}</p>
                    </div>
                    <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
                      <p className="text-[#6C6C6C] text-xs">Dominant Foot</p>
                      <p className="font-bold mt-3 capitalize text-lg">
                        {data?.dominantFoot}
                      </p>
                    </div>
                    <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
                      <p className="text-[#6C6C6C] text-xs">Jersey Number</p>
                      <p className="font-bold mt-3 text-lg">
                        {data?.jerseyNumber}
                      </p>
                    </div>
                    <div className="rounded-md p-2 bg-[#0095FF0D] border border-[#0095FF80]">
                      <p className="text-[#6C6C6C] text-xs">Gender</p>
                      <p className="font-bold mt-3 capitalize text-lg">
                        {data?.gender}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-[65%]">
                  <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
                    <div className="flex justify-between">
                      <p className="text-xl font-bold">Personal Information</p>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">Full Name</p>
                        <div className="flex gap-2 items-center flex-row">
                          <p className="font-bold text-base">{data?.fullName}</p>
                          {data?.plan !== "free" && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0095FF" className="w-4 h-4">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                          </svg>)}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">
                          Date of Birth
                        </p>
                        <p className="font-bold text-base">
                          {data?.dateOfBirth && formatDate(data?.dateOfBirth)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">Age</p>
                        <p className="font-bold text-base">
                          {data?.dateOfBirth && getAge(data.dateOfBirth)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">Gender</p>
                        <p className="font-bold capitalize text-base">
                          {data?.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">
                          Nationality
                        </p>
                        <p className="font-bold text-base">
                          {countryObj?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">City</p>
                        <p className="font-bold text-base">{data?.city}</p>
                      </div>
                      {/* <div>
                      <p className="text-sm text-[#6C6C6C] mb-2">
                        Contact Email
                      </p>
                      <p className="font-bold text-base">{data?.email}</p>
                    </div> */}
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
                        <p className="text-sm text-[#6C6C6C] mb-2">
                          Main Position
                        </p>
                        <p className="font-bold text-bse">{positionLabel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">
                          Secondary Position
                        </p>
                        <p className="font-bold text-base">{secondLabe}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">
                          Dominant Foot
                        </p>
                        <p className="font-bold capitalize text-base">
                          {data?.dominantFoot}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">
                          Jersey Number
                        </p>
                        <p className="font-bold text-base">
                          {data?.jerseyNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">
                          Years of Expreience
                        </p>
                        <p className="font-bold text-base">
                          {data?.yearsOfExperience} years
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C] mb-2">
                          Current Club/Academy
                        </p>
                        <p className="font-bold text-base">
                          {data?.currentTeam}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* {data?.footballJourney &&
                    data?.footballJourney?.length > 0 && (
                      <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-xl font-bold">
                              Football Journey
                            </p>
                            <p className="text-sm text-[#6C6C6C]">
                              List past clubs, academies, or events you’ve been
                              part of.
                            </p>
                          </div>
                        </div>
                        <div>
                          {data.footballJourney.map(
                            (single: FootballJourneyEntry) => (
                              <div className="my-3" key={single._id}>
                                <div className="flex gap-4">
                                  <p className="font-bold text-base">
                                    {single.teamName}
                                  </p>
                                  <span className="text-[#232323] text-sm">
                                    ({formatDate(single.from)} –{" "}
                                    {formatDate(single.to)})
                                  </span>
                                </div>
                                <p className="text-sm text-[#6C6C6C]">
                                  {
                                    userPosition.find(
                                      (pos: any) =>
                                        pos.value === single?.position
                                    )?.label
                                  }
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )} */}
                </div>
              </section>

              {/* {data?.plan !== "free" && ( */}
              <>
                <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setAchievementsExpanded(!achievementsExpanded)}>
                    <p className="text-xl font-bold">Achievements</p>
                    <button className="text-black font-bold hover:text-gray-700 transition-colors">
                      {achievementsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {achievementsExpanded && (
                    <div className="mt-4 grid md:grid-cols-4 gap-4">
                      {/* <Swiper
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
                        > */}
                      {data?.achievements &&
                        data?.achievements.map((achievement: Achievement) => (
                          // <SwiperSlide key={achievement._id}>
                          <Card
                            data={achievement}
                            hide={true}
                            type="achievement"
                          />
                        ))}
                      {/* </Swiper> */}
                    </div>
                  )}
                </div>

                <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setCertificatesExpanded(!certificatesExpanded)}>
                    <p className="text-xl font-bold">Certificates</p>
                    <button className="text-black font-bold hover:text-gray-700 transition-colors">
                      {certificatesExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {certificatesExpanded && (
                    <div className="mt-4 grid md:grid-cols-4 gap-4">
                      {/* <Swiper
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
                      > */}
                      {data?.certificates &&
                        data?.certificates.map(
                          (certificates: Certificate) => (
                            // <SwiperSlide key={certificates._id}>
                            <Card data={certificates} hide={true} type="certificate" />
                            // </SwiperSlide>
                          )
                        )}
                      {/* </Swiper> */}
                    </div>
                  )}
                </div>
              </>
              {/* )} */}

              {highlights.length > 0 && (
                <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setHighlightsExpanded(!highlightsExpanded)}>
                    <p className="text-xl font-bold">Highlight</p>
                    <button className="text-black font-bold hover:text-gray-700 transition-colors">
                      {highlightsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {highlightsExpanded && (
                    <div className="mt-4 grid md:grid-cols-4 gap-4">
                      {highlights.map((highlight: any) => (
                        <Card
                          key={highlight._id}
                          data={highlight}
                          hide={true}
                          type="highlight"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        // </Modal>
      )}
    </>
  );
};

export default PlayerModal;
