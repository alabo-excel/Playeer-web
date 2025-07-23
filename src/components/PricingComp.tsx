import React from 'react';
import { CircleCheckBig, CircleX } from "lucide-react"

interface PricingCompProps {
  onPlanSelect: (plan: string) => void;
  selectedPlan?: string;
  loading?: boolean;
}

const PricingComp: React.FC<PricingCompProps> = ({ onPlanSelect, selectedPlan, loading }) => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className={`bg-[#E5F4FF] rounded-2xl p-8 my-auto ${selectedPlan === 'free' ? 'ring-2 ring-primary' : ''}`}>
        <p className='text-[#0095FF] mb-3 font-semibold'>FREE PLAN</p>
        <div className='flex'>
          <p className='text-5xl font-bold'>₦0</p>
          <p className='text-[#6C6C6C] mt-auto ml-1'>Forever</p>
        </div>
        <p className='text-[#6C6C6C] text-sm my-3'>Beginners getting started with their football journey.</p>
        <button
          type="button"
          className='rounded-full w-full p-4 text-white bg-[#0095FF]'
          onClick={() => onPlanSelect('free')}
          disabled={loading && selectedPlan === 'free'}
        >
          {loading && selectedPlan === 'free' ? 'Loading...' : 'Get Started Free'}
        </button>
        <p className='my-3'>Includes:</p>
        <ul className="space-y-3 mb-8 text-sm">
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Basic profile creation</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Upload up to 2 videos</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Add up to 3 achievements</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Discover open trials</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Limited profile visibility to scouts</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="h-6 w-6 text-[#E82728]" />
            <span className='text-[#6C6C6C]'>No direct messaging</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="h-6 w-6 text-[#E82728]" />
            <span className='text-[#6C6C6C]'>No advanced stats or analytics</span>
          </li>
        </ul>
      </div>
      <div className={`bg-[#000B42] rounded-2xl p-8 relative ${selectedPlan === 'yearly' ? 'ring-2 ring-primary' : ''}`}>
        <p className='text-[#0095FF] mb-3 font-semibold'>PRO YEARLY PLAN</p>
        <div className='flex'>
          <p className='text-5xl text-white font-bold'>₦20,000</p>
          <p className='text-[#E5E5E5] mt-auto ml-1'>Month</p>
        </div>
        <p className='text-[#E5E5E5] text-sm my-3'>Serious players committed to going pro and building a long-term presence.</p>
        <button type="button" className='rounded-full w-full p-4 text-white bg-[#0095FF]' onClick={() => onPlanSelect('yearly')}>Go Yearly Pro (Save 17%)</button>
        <p className='my-3 text-[#FCFCFC]'>Includes everything in Monthly, plus:</p>
        <ul className="space-y-3 mb-8 text-sm">
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#FCFCFC]'>Featured in "Top Talent" section</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#FCFCFC]'>Priority promotion to clubs & scouts</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#FCFCFC]'>Fast-tracked verification</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#FCFCFC]'>Early access to new platform features</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#FCFCFC]'>Exclusive player success resources & guides</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#FCFCFC]'>Mentorship access (when available)</span>
          </li>
        </ul>
        <div className='text-center'>
          <button type="button" className='text-[#17E85E] p-4 rounded-full w-52 bg-[#0F993E4D] '>Recommended</button>
        </div>
      </div>
      <div className={`bg-[#E5F4FF] rounded-2xl p-8 my-auto ${selectedPlan === 'monthly' ? 'ring-2 ring-primary' : ''}`}>
        <p className='text-[#0095FF] mb-3 font-semibold'>PRO MONTHLY PLAN</p>
        <div className='flex'>
          <p className='text-5xl font-bold'>₦2,000</p>
          <p className='text-[#6C6C6C] mt-auto ml-1'>Month</p>
        </div>
        <p className='text-[#6C6C6C] text-sm my-3'>Active players ready to showcase their full potential and get discovered faster.</p>
        <button type="button" className='rounded-full w-full p-4 text-white bg-[#0095FF]' onClick={() => onPlanSelect('monthly')}>Go Monthly Pro</button>
        <p className='my-3'>Includes everything in Free, plus:</p>
        <ul className="space-y-3 mb-8 text-sm">
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Upload unlimited videos</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Add unlimited achievements & career history</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Access to performance analytics & profile views</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Higher visibility in search results</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Priority access to new trial invites</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Verified badge for credibility</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-6 w-6 text-[#0F973D]" />
            <span className='text-[#6C6C6C]'>Personal profile link for easy sharing</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PricingComp;