import React from "react";
import { CircleCheckBig, CircleX } from "lucide-react";

interface PricingCompProps {
  onPlanSelect: (plan: string) => void;
  selectedPlan?: string;
  loading?: boolean;
}

const PricingComp: React.FC<PricingCompProps> = ({
  onPlanSelect,
  selectedPlan,
  loading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      <div
        className={`bg-[#F4F4F4] rounded-2xl p-4 sm:p-6 lg:p-8 my-auto`}
      >
        <p className="text-[#0095FF] mb-3 font-semibold text-sm sm:text-base">FREE PLAN</p>
        <div className="flex items-end">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">₦0</p>
          <p className="text-[#6C6C6C] mb-1 ml-1 text-sm sm:text-base">Forever</p>
        </div>
        <p className="text-[#6C6C6C] text-xs sm:text-sm my-3 leading-relaxed">
          Beginners getting started with their football journey.
        </p>
        <button
          type="button"
          className={`rounded-full w-full p-3 sm:p-4 text-white text-sm sm:text-base font-medium ${loading || selectedPlan === "free"
            ? "bg-transparent !text-[#BFBFBF] cursor-not-allowed"
            : "bg-primary"
            }`}
          onClick={() => onPlanSelect("free")}
          disabled={loading || selectedPlan === "free"}
        >
          {loading && selectedPlan === "free"
            ? "Loading..."
            : "Get Started Free"}
        </button>
        <p className="my-3 font-medium text-sm sm:text-base">Includes:</p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Player profile</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Upload up to 2 videos</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Profile visibility to scouts</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#E82728] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Add achievements</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#E82728] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Add certificates</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#E82728] flex-shrink-0" />
            <span className="text-[#6C6C6C]">
              Featured in top talent section
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#E82728] flex-shrink-0" />
            <span className="text-[#6C6C6C]">
              Verified badge for credibility
            </span>
          </li>
        </ul>
      </div>
      <div
        className={`bg-[#000B42] rounded-2xl p-4 sm:p-6 lg:p-8 relative`}
      >
        <p className="text-[#0095FF] mb-3 font-semibold text-sm sm:text-base">PRO YEARLY PLAN</p>
        <div className="flex items-end">
          <p className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold">₦20,000</p>
          <p className="text-[#E5E5E5] mb-1 ml-1 text-sm sm:text-base">Year</p>
        </div>
        <p className="text-[#E5E5E5] text-xs sm:text-sm my-3 leading-relaxed">
          Serious players committed to going pro and building a long-term
          presence.
        </p>
        <button
          type="button"
          className={`rounded-full w-full p-3 sm:p-4 text-white text-sm sm:text-base font-medium ${loading || selectedPlan === "yearly"
            ? "bg-transparent !text-[#BFBFBF] cursor-not-allowed"
            : "bg-primary"
            }`}
          onClick={() => onPlanSelect("yearly")}
          disabled={loading || selectedPlan === "yearly"}
        >
          {loading && selectedPlan === "yearly"
            ? "Loading..."
            : "Go Yearly Pro (Save 17%)"}
        </button>
        <p className="my-3 text-[#FCFCFC] font-medium text-sm sm:text-base">Includes:</p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#FCFCFC]">Player profile</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#FCFCFC]">Unlimited highlight videos</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#FCFCFC]">Profile visibility to scouts</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#FCFCFC]">Add achievements</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#FCFCFC]">Add Certificates</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#FCFCFC]">
              Featured in "Top Talent" section
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#FCFCFC]">
              Verified badge for credibility
            </span>
          </li>
        </ul>
        <div className="text-center">
          <button
            type="button"
            className="text-[#17E85E] p-3 sm:p-4 rounded-full w-full sm:w-52 bg-[#0F993E4D] text-sm sm:text-base font-medium"
          >
            Recommended
          </button>
        </div>
      </div>
      <div
        className={`bg-[#F4F4F4] rounded-2xl p-4 sm:p-6 lg:p-8 my-auto`}
      >
        <p className="text-[#0095FF] mb-3 font-semibold text-sm sm:text-base">PRO MONTHLY PLAN</p>
        <div className="flex items-end">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">₦2,000</p>
          <p className="text-[#6C6C6C] mb-1 ml-1 text-sm sm:text-base">Month</p>
        </div>
        <p className="text-[#6C6C6C] text-xs sm:text-sm my-3 leading-relaxed">
          Active players ready to showcase their full potential and get
          discovered faster.
        </p>
        <button
          type="button"
          className={`rounded-full w-full p-3 sm:p-4 text-white text-sm sm:text-base font-medium ${loading || selectedPlan === "monthly"
            ? "bg-transparent !text-[#BFBFBF] cursor-not-allowed"
            : "bg-primary"
            }`}
          onClick={() => onPlanSelect("monthly")}
          disabled={loading || selectedPlan === "monthly"}
        >
          {loading && selectedPlan === "monthly"
            ? "Loading..."
            : "Go Monthly Pro"}
        </button>
        <p className="my-3 font-medium text-sm sm:text-base">Includes:</p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Player profile</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Unlimited highlight videos</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Profile visibility to scouts</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Add achievements</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">Add Certificates</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">
              Featured in "Top Talent" section
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
            <span className="text-[#6C6C6C]">
              Verified badge for credibility
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PricingComp;
