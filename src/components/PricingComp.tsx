import React from 'react';
import { Check } from "lucide-react"

const PricingComp = () => {
  return (

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-[#E5F4FF] rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Basic</h3>
        <div className="text-4xl font-bold mb-6">Free</div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-blue-400" />
            <span>Basic profile creation</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-blue-400" />
            <span>Upload 3 videos</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-blue-400" />
            <span>Basic search visibility</span>
          </li>
        </ul>
        <button className="w-full border border-gray-600 hover:border-gray-500 py-3 rounded-lg transition-colors">
          Get Started
        </button>
      </div>

      <div className="bg-[#000B42] rounded-lg p-8 relative">
        <h3 className="text-2xl font-bold mb-4">Pro</h3>
        <div className="text-4xl font-bold mb-6">$29/mo</div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-white" />
            <span>Enhanced profile features</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-white" />
            <span>Unlimited video uploads</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-white" />
            <span>Priority search ranking</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-white" />
            <span>Direct scout messaging</span>
          </li>
        </ul>
        <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Choose Pro
        </button>
      </div>

      <div className="bg-[#E5F4FF] rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Elite</h3>
        <div className="text-4xl font-bold mb-6">$99/mo</div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-blue-400" />
            <span>All Pro features</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-blue-400" />
            <span>Personal career advisor</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-blue-400" />
            <span>Exclusive opportunities</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-blue-400" />
            <span>Performance analytics</span>
          </li>
        </ul>
        <button className="w-full border border-gray-600 hover:border-gray-500 py-3 rounded-lg transition-colors">
          Choose Elite
        </button>
      </div>
    </div>
  );
};

export default PricingComp;