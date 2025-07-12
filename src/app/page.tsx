"use client"

import HeaderNav from '@/components/HeaderNav';
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import PricingComp from '@/components/PricingComp';
import ContactComp from '@/components/ContactComp';
import FooterNav from '@/components/FooterNav';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { BadgeCheck, ListFilter, MessageSquare, Quote, ShieldCheck } from 'lucide-react';

const home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "150px"]);

  return (
    <>
      <HeaderNav />
      <motion.section style={{ scale, borderRadius }} className='w-full lg:h-auto h-[80vh] mx-auto overflow-hidden relative '>
        <img src="/images/hero-img.png" alt="hero-img" className='w-full h-full object-cover' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:left-10 md:translate-x-0 md:-translate-y-1/2 w-[90%] md:w-1/2 px-4 md:px-0'>
          <div className='bg-[#E5F4FF33] w-full md:w-[80%] text-center rounded-full p-2 md:p-3 mb-4 mx-auto md:mx-0'>
            <p className='!text-[#FCFCFC] text-xs md:text-base'>Showcase Your Talent. Connect with Scouts. Get Discovered.</p>
          </div>
          <h1 className='my-4 text-3xl sm:text-4xl md:text-6xl !text-white font-bold leading-tight'>
            Turn Your Football Passion into a Career
          </h1>
          <p className='text-[#FCFCFC] text-xs sm:text-sm md:text-base'>Are you a rising footballer looking to get noticed? Or a scout searching for the next big star? Playeer is your gateway to a global football network. Upload your skills, track your progress, and get in front of decision-makers who matter.</p>
        </div>
      </motion.section>
      <div className='mx-auto  w-full'>
        <img src="/images/pattern.svg" alt="" className="w-full" />
      </div>
      <section className='px-4 md:px-6  mx-auto'>
        <div id='about' className='flex flex-col md:flex-row gap-8 md:gap-4 justify-between my-10'>
          <div className='my-auto w-full md:w-[45%]'>
            <div className='bg-[#E5F4FF] w-52 text-center rounded-full p-3 mb-4 mx-auto md:mx-0'>
              <p className='!text-[#0095FF] font-semibold'>ABOUT PLAYEER</p>
            </div>
            <h2 className='text-2xl md:text-4xl font-bold'>Your Gateway to Global Football Opportunities</h2>
            <p className='my-3 text-[#6C6C6C]'>Playeer bridges the gap between undiscovered football talent and the professionals who scout them. We provide a platform where players can showcase their skills, build professional profiles, and get visibility from scouts, agents, and clubs around the world.</p>
            <h2 className='text-xl md:text-3xl font-bold'>Key Benefits for Players:</h2>
            <ul className='my-3 ml-5 text-[#6C6C6C] list-disc'>
              <li>Build your digital football CV</li>
              <li>Upload videos, stats & training data</li>
              <li>Gain visibility with global scouts</li>
              <li>Receive personalized performance feedback</li>
            </ul>
            <button className="bg-[#0095FF] px-8 py-2 rounded-full text-white mt-4 w-full md:w-auto">
              Sign up today
            </button>
          </div>
          <div className='w-full md:w-1/2 mt-8 md:mt-0 object-contain'>
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
                <img src="/images/about-slide/slide-1.png" className='w-full object-contain' alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/images/about-slide/slide-2.png" className='w-full object-contain' alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/images/about-slide/slide-3.png" className='w-full object-contain' alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/images/about-slide/slide-4.png" className='w-full object-contain' alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className='flex flex-col-reverse md:flex-row gap-8 md:gap-4 my-16 md:my-32 justify-between'>
          <div className='w-full md:w-1/2 mt-8 md:mt-0 object-contain'>
            <Swiper
              modules={[EffectFade, Autoplay]}
              effect="fade"
              autoplay={{ disableOnInteraction: false }}
              slidesPerView={1}
              // fadeEffect={{ crossFade: true }}
              loop
              speed={1200}
            >
              <SwiperSlide>
                <img src="/images/players-slide/slide-1.png" className='w-full object-contain' alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/images/players-slide/slide-2.png" className='w-full object-contain' alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/images/players-slide/slide-3.png" className='w-full object-contain' alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
          {/* <img src="/images/playeer.png" className='w-full md:w-1/2 object-contain mt-8 md:mt-0' alt="" /> */}
          <div className='my-auto w-full md:w-[45%]'>
            <div className='bg-[#E5F4FF] w-52 text-center rounded-full p-3 mb-4 mx-auto md:mx-0'>
              <p className='!text-[#0095FF] font-semibold'>FIND A PLAYER</p>
            </div>
            <h2 className='text-2xl md:text-4xl font-bold'>Discover Talent Easily</h2>
            <p className='my-3 text-[#6C6C6C]'>Whether you're scouting for the next Messi or looking for specialized talent to strengthen a team, Playeer gives you powerful tools to find, evaluate, and track top prospects.</p>
            <h2 className='text-xl md:text-3xl font-bold'>Explore by:</h2>
            <ul className='my-3 ml-5 text-[#6C6C6C] list-disc'>
              <li>Age Group</li>
              <li>Playing Position</li>
              <li>Region or Country</li>
              <li>Performance Metrics</li>
            </ul>
            <button className="bg-[#0095FF] px-8 py-2 rounded-full text-white mt-4 w-full md:w-auto">
              Search Now
            </button>
          </div>
        </div>
        <div>
          <div className='bg-[#E5F4FF] w-80 max-w-full text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>WHY CHOOSE PLAYEER?</p>
          </div>
          <div className='bg-[#F6F6F6] rounded-3xl p-4 md:p-10 flex flex-col md:flex-row justify-between gap-6'>
            <div className='w-full md:w-[35%] mb-6 md:mb-0'>
              <h2 className='text-lg md:text-xl font-bold'>What Makes Us the Smart Choice for Talent Discovery</h2>
              <p className='text-[#6C6C6C]'>At Playeer , we take pride in delivering unparalleled advantages that set our footballer profiling system apart. Here are the key benefits of choosing our platform.</p>
            </div>
            <div className='w-full md:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='flex'>
                {/* <img className='w-16 mr-2 my-auto' src="/images/icons/verified.png" alt="" /> */}
                <div className='bg-[#0095FF] text-white rounded-xl text-center p-5 w-14 h-14 flex items-center justify-center mr-2'>
                  <BadgeCheck className='w-6 h-6' />
                </div>
                <div>
                  <p className='font-bold'>Verified Player Profiles</p>
                  <p className='text-sm text-[#6C6C6C]'>A platform designed to spotlight Africa’s rising stars.</p>
                </div>
              </div>
              <div className='flex'>
                {/* <img className='w-16 mr-2 my-auto' src="/images/icons/messaging.png" alt="" /> */}
                <div className='bg-[#0095FF] text-white rounded-xl text-center p-5 w-14 h-14 flex items-center justify-center mr-2'>
                  <MessageSquare className='w-6 h-6' />
                </div>
                <div>
                  <p className='font-bold'>Direct Messaging</p>
                  <p className='text-sm text-[#6C6C6C]'>Connect with players or representatives instantly.</p>
                </div>
              </div>
              <div className='flex'>
                {/* <img className='w-14 mr-2 my-auto' src="/images/icons/filtering.png" alt="" /> */}
                <div className='bg-[#0095FF] text-white rounded-xl text-center w-14 h-14 flex items-center justify-center mr-2'>
                  <ListFilter className='w-4 h-4' />
                </div>
                <div>
                  <p className='font-bold'>Advanced Filtering Tools</p>
                  <p className='text-sm text-[#6C6C6C]'>Search by skill, age, location, and more.</p>
                </div>
              </div>
              <div className='flex'>
                {/* <img className='w-16 mr-2 my-auto' src="/images/icons/trust.png" alt="" /> */}
                <div className='bg-[#0095FF] text-white rounded-xl text-center p-5 w-14 h-14 flex items-center justify-center mr-2'>
                  <ShieldCheck className='w-5 h-5' />
                </div>
                <div>
                  <p className='font-bold'>Transparency & Trust</p>
                  <p className='text-sm text-[#6C6C6C]'>Our moderation ensures quality, authenticity, and fairness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='my-20  mx-auto'>
        <div className='w-full md:w-[30%] !text-center mx-auto px-2'>
          <div className='bg-[#E5F4FF] w-52 mx-auto text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>FEATURED PLAYERS</p>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold'>Rising Stars You <br /> Shouldn’t Miss</h2>
          <p className='text-[#6C6C6C] text-sm'>From explosive strikers to rock-solid defenders, meet the top talents making waves on Playeer. Each profile is packed with performance videos, match data, and more.</p>
        </div>

        <div className='my-20  mx-auto'>
          <Swiper
            spaceBetween={20}
            slidesPerView={1.5}
            centeredSlides
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 5 },
            }}
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
          >
            {[...Array(10)].map((_, i) => (
              <SwiperSlide key={i}>
                <div
                  className={`transition-transform duration-500 ${activeIndex === i ? 'scale-100' : 'scale-80'
                    }`}
                >
                  <img src="/images/player.png" alt="" className="rounded-lg w-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className='bg-[#F4F4F4] rounded-3xl  mx-auto p-4 md:p-6'>
        <div className='w-full md:w-[30%] !text-center mx-auto'>
          <div className='bg-[#E5F4FF] w-52 mx-auto text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>HOW IT WORKS</p>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold'>Your Roadmap to Football Success</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 my-6 gap-4'>
          <div className='bg-white p-6 rounded-xl'>
            <div className='flex justify-between'>
              <div className='bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center'>
                <p className='text-white'>1</p>
              </div>
              <img src="/images/icon-white.png" alt="" />
            </div>
            <h3 >Create a profile</h3>
            <p className='text-[#6C6C6C] text-sm'>Upload your stats, highlight videos, achievement, and career history to get started.</p>
          </div>
          <div className='bg-white p-6 rounded-xl'>
            <div className='flex justify-between'>
              <div className='bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center'>
                <p className='text-white'>2</p>
              </div>
              <img src="/images/icon-white.png" alt="" />
            </div>
            <h3 >Get Verified</h3>
            <p className='text-[#6C6C6C] text-sm'>We review and validate your data to build credibility.</p>
          </div>
          <div className='bg-white p-6 rounded-xl'>
            <div className='flex justify-between'>
              <div className='bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center'>
                <p className='text-white'>3</p>
              </div>
              <img src="/images/icon-white.png" alt="" />
            </div>
            <h3 >Showcase Your Skills</h3>
            <p className='text-[#6C6C6C] text-sm'>Add match footage, drills, and performance highlights.</p>
          </div>
          <div className='col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-white p-6 rounded-xl'>
              <div className='flex justify-between'>
                <div className='bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center'>
                  <p className='text-white'>4</p>
                </div>
                <img src="/images/icon-white.png" alt="" />
              </div>
              <h3 >Connect with Scouts & Agents</h3>
              <p className='text-[#6C6C6C] text-sm'>Get noticed and contacted for trials or recruitment.</p>
            </div>
            <div className='bg-white p-6 rounded-xl'>
              <div className='flex justify-between'>
                <div className='bg-[#0095FF] rounded-xl text-center w-10 h-10 flex items-center justify-center'>
                  <p className='text-white'>5</p>
                </div>
                <img src="/images/icon-white.png" alt="" />
              </div>
              <h3 >Get Signed</h3>
              <p className='text-[#6C6C6C] text-sm'>Your opportunity to go professional begins here.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='my-20  mx-auto'>
        <div className='w-full md:w-[40%] !text-center mx-auto px-2'>
          <div className='bg-[#E5F4FF] w-52 mx-auto text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>TESTIMONIALS</p>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold'>What players, scouts & Agent have to say about us</h2>
        </div>
        {/* Testimonial sliders */}
        <div className="mt-10">
          {/* First Swiper: left-to-right */}
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
            }}
            loop
            modules={[Autoplay]}
            speed={1000} // smooth and continuous
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="mb-8"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <SwiperSlide key={i}>
                <div className="bg-[#F6F6F6] rounded-xl p-4 md:p-8">
                  <Quote className='text-[#232323] mb-4' />
                  {/* <p className="text-lg font-semibold mb-2">Player {i}</p> */}
                  <p className="text-[#6C6C6C] text-sm md:text-base">We found a brilliant young talent for our U-18 squad thanks to Playeer.</p>
                  <div className='flex mt-2'>
                    <img src="/images/player.png" alt={`Testimonial ${i}`} className="w-6 h-6 rounded-full mr-2 my-auto" />
                    <div>
                      <h2 className='font-bold text-sm md:text-base'>Luka A., – Serbia</h2>
                      <p className='text-[#6C6C6C] text-xs md:text-sm'>Club Manager</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Second Swiper: right-to-left */}
          <Swiper
            spaceBetween={20}
            slidesPerView={1.5}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.5 },
            }}
            loop
            dir="rtl"
            modules={[Autoplay]}
            speed={1000} // smooth and continuous
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <SwiperSlide key={i}>
                <div className="bg-[#F6F6F6] rounded-xl p-4 md:p-8">
                  <Quote className='text-[#232323] mb-4 mr-auto' />
                  {/* <p className="text-lg font-semibold mb-2">Player {i}</p> */}
                  <p className="text-[#6C6C6C] text-left text-sm md:text-base">We found a brilliant young talent for our U-18 squad thanks to Playeer.</p>
                  <div className='flex mr-auto justify-start mt-2'>
                    <div className='w-full text-left'>
                      <h2 className='font-bold text-sm md:text-base'>Luka A., – Serbia</h2>
                      <p className='text-[#6C6C6C] text-xs md:text-sm'>Club Manager</p>
                    </div>
                    <img src="/images/player.png" alt={`Testimonial ${i}`} className="w-6 h-6 rounded-full mr-3 my-auto" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className='relative my-20 lg:h-auto h-[80vh] mx-auto flex flex-col md:flex-row items-center justify-center'>
        <img className='w-full' src="/images/cta-img.png" alt="" />
        <div className='w-full md:w-[40%] py-20 !text-center mx-auto absolute left-0 right-0 top-10'>
          <div className='bg-[#E5F4FF] w-full mx-auto text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>DISCOVER FOOTBALL TALENT LIKE NEVER BEFORE</p>
          </div>
          <h2 className='text-2xl md:text-4xl font-bold'>Browse Videos, Matches, and Drills in One Place</h2>
          <p className='text-[#6C6C6C] text-sm'>From breathtaking goals to tactical awareness, our video-based discovery system helps you scout smarter, not harder. Players, upload your clips and highlight your strengths. Recruiters, explore potential with confidence.</p>
        </div>
      </section>

      <section id='pricing' className='my-20  mx-auto px-2 md:px-4'>
        <div className='w-full md:w-[30%] !text-center mx-auto pb-10'>
          <div className='bg-[#E5F4FF] w-40 mx-auto text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>PRICING</p>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold'>Affordable Plans, Maximum Impact</h2>
        </div>
        <PricingComp />
      </section>

      <ContactComp />
      <FooterNav />
    </>
  );
};

export default home;