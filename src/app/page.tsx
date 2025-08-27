"use client";

import HeaderNav from "@/components/HeaderNav";
import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PricingComp from "@/components/PricingComp";
import ContactComp from "@/components/ContactComp";
import FooterNav from "@/components/FooterNav";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  BadgeCheck,
  ListFilter,
  MessageSquare,
  Quote,
  ShieldCheck,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { useEffect } from "react";
import { positions } from "@/utils/positions";

const home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(1);
  const [allPlayers, setAllPlayers] = useState([]);
  const [premiumPlayers, setPremiumPlayers] = useState([]);
  const router = useRouter();

  const fetchPlayers = async () => {
    try {
      const res = await api.get(`/users/active-not-deleted`);
      const players = res.data.data || [];
      setAllPlayers(players);

      // Filter players who are not on free plan (monthly or yearly)
      const nonFreePlayers = players.filter(
        (player: any) => player.plan && player.plan !== "free"
      );
      setPremiumPlayers(nonFreePlayers);
    } catch (err) {
      setAllPlayers([]);
      setPremiumPlayers([]);
    }
  };

  const { scrollYProgress } = useScroll();
  // Make scale and marginTop jump instantly as soon as scrolling starts
  const scale = useTransform(scrollYProgress, [0, 0.01], [1, 0.9]);

  const marginTop = useTransform(scrollYProgress, [0, 0.01], [0, 40]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.01], ["0", "40px"]);

  // Fetch players on component mount
  useEffect(() => {
    fetchPlayers();
    console.log(premiumPlayers);
  }, []);

  const userPosition = positions;

  return (
    <>
      <HeaderNav />
      <motion.section
        style={{ scale, marginTop, borderRadius }}
        className="w-full lg:h-auto h-[80vh] mx-auto overflow-hidden relative "
      >
        <motion.img
          style={{ borderRadius }}
          src="/images/hero-img.png"
          alt="hero-img"
          className="w-full h-screen object-cover"
        />
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="w-[90%] md:w-1/2">
              <div className="bg-[#E5F4FF33] w-full md:w-[85%] text-center rounded-full p-2 md:p-3 mb-4 mx-auto md:mx-0">
                <p className="!text-[#FCFCFC] text-xs md:text-base">
                  Showcase Your Talent. Connect with Scouts. Get Discovered.
                </p>
              </div>
              <h1 className="my-4 text-3xl sm:text-4xl md:text-6xl !text-white font-bold leading-tight">
                Turn Your Football Passion into a Career
              </h1>
              <p className="text-[#FCFCFC] text-xs sm:text-sm md:text-base">
                Are you a rising footballer looking to get noticed? Or a scout
                searching for the next big star? Playeer is your gateway to a
                global football network. Upload your skills, track your
                progress, and get in front of decision-makers who matter.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto  w-full">
          <img src="/images/pattern.svg" alt="" className="w-full" />
        </div>
      </motion.section>

      <section id="about" className="px-4 py-10 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-between my-10">
          <div className="my-auto w-full md:w-[45%]">
            <div className="bg-[#E5F4FF] w-52 text-center rounded-full p-3 mb-4 mx-auto md:mx-0">
              <p className="!text-[#0095FF] font-semibold">ABOUT PLAYEER</p>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold">
              Your Gateway to Global Football Opportunities
            </h2>
            <p className="my-3 text-[#6C6C6C]">
              Playeer bridges the gap between undiscovered football talent and
              the professionals who scout them. We provide a platform where
              players can showcase their skills, build professional profiles,
              and get visibility from scouts, agents, and clubs around the
              world.
            </p>
            <h2 className="text-xl md:text-3xl font-bold">
              Key Benefits for Players:
            </h2>
            <ul className="my-3 ml-5 text-[#6C6C6C] list-disc">
              <li>Build your digital football CV</li>
              <li>Upload videos, stats & training data</li>
              <li>Gain visibility with global scouts</li>
              <li>Receive personalized performance feedback</li>
            </ul>
            <Link href={"/auth/signup"}>
              <button className="bg-[#0095FF] px-8 py-2 rounded-full text-white mt-4 w-full md:w-auto">
                Sign up today
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 object-contain">
            <Swiper
              modules={[EffectFade, Autoplay]}
              effect="fade"
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              slidesPerView={1}
              fadeEffect={{ crossFade: true }}
              loop
              speed={1200}
            >
              <SwiperSlide>
                <img
                  src="/images/about-slide/slide-1.png"
                  className="w-full object-contain"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/about-slide/slide-2.png"
                  className="w-full object-contain"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/about-slide/slide-3.png"
                  className="w-full object-contain"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/about-slide/slide-4.png"
                  className="w-full object-contain"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-4 my-16 md:my-32 justify-between">
          <div className="w-full overflow-hidden md:w-1/2 mt-8 md:mt-0 flex gap-3">
            {[1, 2, 3].map((single) => (
              <img
                key={single}
                onMouseEnter={() => setActiveSlide(single)}
                className={`md:h-full object-cover rounded-2xl transition-width ease-in-out ${
                  activeSlide === single ? "w-[55%]" : "w-[20%]"
                }`}
                src={`/images/players-slide/slide-${single}.png`}
                alt=""
              />
            ))}

            {/* <img className='h-full hover:col-span-2 object-cover rounded-xl' src="/images/players-slide/slide-2.png" alt="" />
            <img className='h-full hover:col-span-2 object-cover rounded-xl' src="/images/players-slide/slide-3.png" alt="" /> */}
          </div>
          {/* <img src="/images/playeer.png" className='w-full md:w-1/2 object-contain mt-8 md:mt-0' alt="" /> */}
          <div className="my-auto py-6 w-full md:w-[45%]">
            <div className="bg-[#E5F4FF] w-52 text-center rounded-full p-3 mb-4 mx-auto md:mx-0">
              <p className="!text-[#0095FF] font-semibold">FIND A PLAYER</p>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold">
              Discover Talent Easily
            </h2>
            <p className="my-3 text-[#6C6C6C]">
              Whether you're scouting for the next Messi or looking for
              specialized talent to strengthen a team, Playeer gives you
              powerful tools to find, evaluate, and track top prospects.
            </p>
            <h2 className="text-xl md:text-3xl font-bold">Explore by:</h2>
            <ul className="my-3 ml-5 text-[#6C6C6C] list-disc">
              <li>Age Group</li>
              <li>Playing Position</li>
              <li>Region or Country</li>
              <li>Performance Metrics</li>
            </ul>
            <Link href={"/players"}>
              <button className="bg-[#0095FF] px-8 py-2 rounded-full text-white mt-4 w-full md:w-auto">
                Search Now
              </button>
            </Link>
          </div>
        </div>

        <div>
          <div className="bg-[#E5F4FF] w-80 max-w-full text-center rounded-full p-3 mb-4">
            <p className="!text-[#0095FF] font-semibold">WHY CHOOSE PLAYEER?</p>
          </div>
          <div className="bg-[#F6F6F6] rounded-3xl p-4 md:p-10 flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full md:w-[35%] mb-6 md:mb-0">
              <h2 className="text-lg md:text-xl font-bold">
                What Makes Us the Smart Choice for Talent Discovery
              </h2>
              <p className="text-[#6C6C6C]">
                At Playeer , we take pride in delivering unparalleled advantages
                that set our footballer profiling system apart. Here are the key
                benefits of choosing our platform.
              </p>
            </div>
            <div className="w-full md:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex">
                {/* <img className='w-16 mr-2 my-auto' src="/images/icons/verified.png" alt="" /> */}
                <div className="bg-[#0095FF] text-white rounded-xl text-center p-5 w-14 h-14 flex items-center justify-center mr-2">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Verified Player Profiles</p>
                  <p className="text-sm text-[#6C6C6C]">
                    A platform designed to spotlight Africa’s rising stars.
                  </p>
                </div>
              </div>
              <div className="flex">
                {/* <img className='w-16 mr-2 my-auto' src="/images/icons/messaging.png" alt="" /> */}
                <div className="bg-[#0095FF] text-white rounded-xl text-center p-5 w-14 h-14 flex items-center justify-center mr-2">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Direct Messaging</p>
                  <p className="text-sm text-[#6C6C6C]">
                    Connect with players or representatives instantly.
                  </p>
                </div>
              </div>
              <div className="flex">
                {/* <img className='w-14 mr-2 my-auto' src="/images/icons/filtering.png" alt="" /> */}
                <div className="bg-[#0095FF] text-white rounded-xl text-center w-14 h-14 flex items-center justify-center mr-2">
                  <ListFilter className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold">Advanced Filtering Tools</p>
                  <p className="text-sm text-[#6C6C6C]">
                    Search by skill, age, location, and more.
                  </p>
                </div>
              </div>
              <div className="flex">
                {/* <img className='w-16 mr-2 my-auto' src="/images/icons/trust.png" alt="" /> */}
                <div className="bg-[#0095FF] text-white rounded-xl text-center p-5 w-14 h-14 flex items-center justify-center mr-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold">Transparency & Trust</p>
                  <p className="text-sm text-[#6C6C6C]">
                    Our moderation ensures quality, authenticity, and fairness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {premiumPlayers.length > 0 && (
        <section className="my-20  mx-auto">
          <div className="w-full md:w-[30%] !text-center mx-auto px-2">
            <div className="bg-[#E5F4FF] w-52 mx-auto text-center rounded-full p-3 mb-4">
              <p className="!text-[#0095FF] font-semibold">FEATURED PLAYERS</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Rising Stars You <br /> Shouldn’t Miss
            </h2>
            <p className="text-[#6C6C6C] text-sm">
              From explosive strikers to rock-solid defenders, meet the top
              talents making waves on Playeer. Each profile is packed with
              performance videos, match data, and more.
            </p>
          </div>

          <div className="my-20  mx-auto">
            <Swiper
              spaceBetween={20}
              slidesPerView={
                premiumPlayers.length < 5 ? premiumPlayers.length : 1.5
              }
              breakpoints={
                premiumPlayers.length < 5
                  ? {} // no responsive behavior when less than 5
                  : {
                      640: { slidesPerView: 2.5 },
                      1024: { slidesPerView: 5 },
                    }
              }
              // centeredSlides
              loop={premiumPlayers.length >= 5} // only loop if 5 or more
              centeredSlides={premiumPlayers.length < 5} // center if less than 5
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
              // breakpoints={{
              //   640: { slidesPerView: 2.5 },
              //   1024: { slidesPerView: 5 },
              // }}
              modules={[Autoplay]}
              autoplay={
                premiumPlayers.length >= 5
                  ? { delay: 2500, disableOnInteraction: false }
                  : false // disable autoplay when less than 5
              }
            >
              {premiumPlayers.map((player: any, i) => (
                <SwiperSlide key={i}>
                  <div
                    className={`transition-transform duration-500 ${
                      activeIndex === i ? "scale-100" : "scale-80"
                    }`}
                  >
                    <div key={player._id} className="relative cursor-pointer">
                      <img
                        src={player.profilePicture || "/images/player-2.jpg"}
                        className="object-cover h-80 w-full rounded-xl"
                        alt=""
                      />
                      {/* <div className="blur bg-[#000310] opacity-50 absolute right-0 left-0 rounded-b-xl bottom-0 h-20"></div> */}
                      <div className="absolute right-0 left-0 bottom-0 p-4 z-10 ">
                        <div className="flex justify-between my-2 text-white">
                          <div className="flex items-center gap-1">
                            <p>{player.fullName}</p>
                            {player.plan && player.plan !== "free" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#0095FF"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          {player.country && (
                            <img
                              src={`https://flagcdn.com/24x18/${player.country.toLowerCase()}.png`}
                              alt={`${player.country} flag`}
                              className="inline-block ml-2 mr-1 rounded-sm"
                              width={24}
                              height={18}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                        </div>

                        <p className="text-xs text-[#D3D3D3]">
                          {
                            userPosition.find(
                              (pos: any) => pos.value === player?.mainPosition
                            )?.label
                          }
                        </p>
                      </div>
                    </div>
                    {/* <img
                      src={"/images/player.png"}
                      alt=""
                      className="rounded-lg w-full"
                    /> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      <section className="bg-[#F4F4F4] rounded-3xl max-w-7xl mx-auto p-4 md:p-6">
        <div className="mx-auto lg:p-10">
          <div className="w-full md:w-[30%] !text-center mx-auto">
            <div className="bg-[#E5F4FF] w-52 mx-auto text-center rounded-full p-3 mb-4">
              <p className="!text-[#0095FF] font-semibold">HOW IT WORKS</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Your Roadmap to Football Success
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 my-6 gap-4">
            <div className="bg-white p-6 rounded-xl">
              <div className="flex justify-between">
                <div className="bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center">
                  <p className="text-white">1</p>
                </div>
                <img src="/images/icon-white.png" alt="" />
              </div>
              <h3>Create a profile</h3>
              <p className="text-[#6C6C6C] text-sm">
                Upload your stats, highlight videos, achievement, and career
                history to get started.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="flex justify-between">
                <div className="bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center">
                  <p className="text-white">2</p>
                </div>
                <img src="/images/icon-white.png" alt="" />
              </div>
              <h3>Get Verified</h3>
              <p className="text-[#6C6C6C] text-sm">
                We review and validate your data to build credibility.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="flex justify-between">
                <div className="bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center">
                  <p className="text-white">3</p>
                </div>
                <img src="/images/icon-white.png" alt="" />
              </div>
              <h3>Showcase Your Skills</h3>
              <p className="text-[#6C6C6C] text-sm">
                Add match footage, drills, and performance highlights.
              </p>
            </div>
            <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl">
                <div className="flex justify-between">
                  <div className="bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center">
                    <p className="text-white">4</p>
                  </div>
                  <img src="/images/icon-white.png" alt="" />
                </div>
                <h3>Connect with Scouts & Agents</h3>
                <p className="text-[#6C6C6C] text-sm">
                  Get noticed and contacted for trials or recruitment.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <div className="flex justify-between">
                  <div className="bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center">
                    <p className="text-white">5</p>
                  </div>
                  <img src="/images/icon-white.png" alt="" />
                </div>
                <h3>Get Signed</h3>
                <p className="text-[#6C6C6C] text-sm">
                  Your opportunity to go professional begins here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="md:my-20 max-w-7xl mx-auto">
        <div className="w-full md:w-[40%] !text-center mx-auto px-2">
          <div className="bg-[#E5F4FF] w-52 mx-auto text-center rounded-full p-3 mb-4">
            <p className="!text-[#0095FF] font-semibold">TESTIMONIALS</p>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            What players, scouts & Agent have to say about us
          </h2>
        </div>
        {/* Testimonial sliders */}
        <div className="mt-10">
          {/* First Swiper: left-to-right */}
          <Marquee pauseOnHover={true} className="gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-[350px] mx-2 flex-shrink-0">
                <div className="bg-[#F6F6F6] rounded-xl p-4 md:p-8">
                  <Quote className="text-[#232323] mb-4" />
                  {/* <p className="text-lg font-semibold mb-2">Player {i}</p> */}
                  <p className="text-[#6C6C6C] text-sm md:text-base">
                    We found a brilliant young talent for our U-18 squad thanks
                    to Playeer.
                  </p>
                  <div className="flex mt-2">
                    <img
                      src="/images/player.png"
                      alt={`Testimonial ${i}`}
                      className="w-6 h-6 rounded-full mr-2 my-auto"
                    />
                    <div>
                      <h2 className="font-bold text-sm md:text-base">
                        Luka A., – Serbia
                      </h2>
                      <p className="text-[#6C6C6C] text-xs md:text-sm">
                        Club Manager
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
          {/* Second Swiper: right-to-left */}
          <Marquee pauseOnHover={true} direction="right" className="gap-4 mt-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-[300px] mx-2 flex-shrink-0">
                <div className="bg-[#F6F6F6] rounded-xl p-4 md:p-8">
                  <Quote className="text-[#232323] mb-4" />
                  {/* <p className="text-lg font-semibold mb-2">Player {i}</p> */}
                  <p className="text-[#6C6C6C] text-sm md:text-base">
                    We found a brilliant young talent for our U-18 squad thanks
                    to Playeer.
                  </p>
                  <div className="flex mt-2">
                    <img
                      src="/images/player.png"
                      alt={`Testimonial ${i}`}
                      className="w-6 h-6 rounded-full mr-2 my-auto"
                    />
                    <div>
                      <h2 className="font-bold text-sm md:text-base">
                        Luka A., – Serbia
                      </h2>
                      <p className="text-[#6C6C6C] text-xs md:text-sm">
                        Club Manager
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      <section className="relative md:my-20 my-10 lg:h-auto h-[80vh] mx-auto flex flex-col md:flex-row items-center justify-center">
        <img
          className="w-full h-full object-cover object-left"
          src="/images/cta-img.png"
          alt=""
        />
        <div className="w-full max-w-5xl md:w-[40%] py-20 !text-center mx-auto absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <div className="bg-[#E5F4FF] w-[80%] mx-auto text-center rounded-full p-3 mb-4">
            <p className="!text-[#0095FF] font-semibold">
              DISCOVER FOOTBALL TALENT LIKE NEVER BEFORE
            </p>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold">
            Browse Videos, Matches, and Drills in One Place
          </h2>
          <p className="text-[#6C6C6C] text-sm">
            From breathtaking goals to tactical awareness, our video-based
            discovery system helps you scout smarter, not harder. Players,
            upload your clips and highlight your strengths. Recruiters, explore
            potential with confidence.
          </p>
        </div>
      </section>

      <section id="pricing" className="py-20 max-w-7xl  mx-auto px-2 md:px-4">
        <div className="w-full md:w-[30%] !text-center mx-auto pb-10">
          <div className="bg-[#E5F4FF] w-40 mx-auto text-center rounded-full p-3 mb-4">
            <p className="!text-[#0095FF] font-semibold">PRICING</p>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Affordable Plans, Maximum Impact
          </h2>
        </div>
        <PricingComp onPlanSelect={() => router.push("/auth/signup")} />
      </section>

      <ContactComp />
      <FooterNav />
    </>
  );
};

export default home;
