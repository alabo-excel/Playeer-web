"use client"

import HeaderNav from '@/components/HeaderNav';
import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import PricingComp from '@/components/PricingComp';
import ContactComp from '@/components/ContactComp';
import FooterNav from '@/components/FooterNav';

const home = () => {

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "100px"]);

  return (
    <>
      <HeaderNav />
      <motion.section style={{ scale, borderRadius }} className='w-full h-screen mx-auto overflow-hidden'>
        <img src="/images/hero-img.png" alt="hero-img" className='w-full h-full object-cover' />
      </motion.section>
      <div className='mx-auto max-w-7xl w-full'>
        <img src="/images/pattern.svg" alt="" className="w-full" />
      </div>
      <section className='px-4 md:px-6 max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row gap-8 md:gap-4 justify-between my-10'>
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
          <img src="/images/about-img.png" className='w-full md:w-1/2 mt-8 md:mt-0 object-contain' alt="" />
        </div>
        <div className='flex flex-col-reverse md:flex-row gap-8 md:gap-4 my-16 md:my-32 justify-between'>
          <img src="/images/playeer.png" className='w-full md:w-1/2 object-contain mt-8 md:mt-0' alt="" />
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
          <div className='bg-[#E5F4FF] w-80 max-w-full text-center rounded-full p-3 mb-4 mx-auto'>
            <p className='!text-[#0095FF] font-semibold'>WHY CHOOSE PLAYEER?</p>
          </div>
          <div className='bg-[#F6F6F6] rounded-3xl p-4 md:p-10 flex flex-col md:flex-row justify-between gap-6'>
            <div className='w-full md:w-[35%] mb-6 md:mb-0'>
              <h2 className='text-lg md:text-xl font-bold'>What Makes Us the Smart Choice for Talent Discovery</h2>
              <p className='text-[#6C6C6C]'>At Playeer , we take pride in delivering unparalleled advantages that set our footballer profiling system apart. Here are the key benefits of choosing our platform.</p>
            </div>
            <div className='w-full md:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='flex'>
                <img className='w-16 mr-2 my-auto' src="/images/icons/verified.png" alt="" />
                <div>
                  <p className='font-bold'>Verified Player Profiles</p>
                  <p className='text-sm text-[#6C6C6C]'>A platform designed to spotlight Africa’s rising stars.</p>
                </div>
              </div>
              <div className='flex'>
                <img className='w-16 mr-2 my-auto' src="/images/icons/messaging.png" alt="" />
                <div>
                  <p className='font-bold'>Direct Messaging</p>
                  <p className='text-sm text-[#6C6C6C]'>Connect with players or representatives instantly.</p>
                </div>
              </div>
              <div className='flex'>
                <img className='w-14 mr-2 my-auto' src="/images/icons/filtering.png" alt="" />
                <div>
                  <p className='font-bold'>Advanced Filtering Tools</p>
                  <p className='text-sm text-[#6C6C6C]'>Search by skill, age, location, and more.</p>
                </div>
              </div>
              <div className='flex'>
                <img className='w-16 mr-2 my-auto' src="/images/icons/trust.png" alt="" />
                <div>
                  <p className='font-bold'>Transparency & Trust</p>
                  <p className='text-sm text-[#6C6C6C]'>Our moderation ensures quality, authenticity, and fairness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='my-20'>
        <div className='w-full md:w-[30%] !text-center mx-auto px-2'>
          <div className='bg-[#E5F4FF] w-52 mx-auto text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>FEATURED PLAYERS</p>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold'>Rising Stars You <br /> Shouldn’t Miss</h2>
          <p className='text-[#6C6C6C] text-sm'>From explosive strikers to rock-solid defenders, meet the top talents making waves on Playeer. Each profile is packed with performance videos, match data, and more.</p>
        </div>
      </section>

      <section className='bg-[#F4F4F4] rounded-3xl max-w-7xl mx-auto p-4 md:p-6'>
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

      <section className='my-20'>
        <div className='w-full md:w-[40%] !text-center mx-auto px-2'>
          <div className='bg-[#E5F4FF] w-52 mx-auto text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>TESTIMONIALS</p>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold'>What players, scouts & Agent have to say about us</h2>
        </div>
      </section>

      <section className='cta my-32 h-auto md:h-[80vh] max-w-full mx-auto flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full md:w-[40%] !text-center mx-auto'>
          <div className='bg-[#E5F4FF] w-full mx-auto text-center rounded-full p-3 mb-4'>
            <p className='!text-[#0095FF] font-semibold'>DISCOVER FOOTBALL TALENT LIKE NEVER BEFORE</p>
          </div>
          <h2 className='text-2xl md:text-4xl font-bold'>Browse Videos, Matches, and Drills in One Place</h2>
          <p className='text-[#6C6C6C] text-sm'>From breathtaking goals to tactical awareness, our video-based discovery system helps you scout smarter, not harder. Players, upload your clips and highlight your strengths. Recruiters, explore potential with confidence.</p>
        </div>
      </section>

      <section className='my-20 max-w-7xl mx-auto px-2 md:px-4'>
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