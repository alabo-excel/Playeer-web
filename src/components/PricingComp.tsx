import React, { useEffect, useState } from "react";
import { CircleCheckBig, CircleX } from "lucide-react";
import api from "@/utils/api";

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

  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setPlansLoading(true);
      try {
        const res = await api.get("/plans/active");
        setPlans(res.data?.data?.plans || []);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
        setPlans([]);
      }
      setPlansLoading(false);
    };
    fetchPlans();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      <div
        className={`bg-[#F4F4F4] rounded-2xl p-4 sm:p-6 lg:p-8 my-auto`}
      >
        <p className="text-[#0095FF] mb-3 font-semibold uppercase text-sm sm:text-base">{plans[0]?.displayName}</p>
        <div className="flex items-end mb-3">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">₦{plans[0]?.price?.toLocaleString()}</p>
          <p className="text-[#6C6C6C] mb-1 ml-1 text-sm sm:text-base">Forever</p>
        </div>
        {/* <p className="text-[#6C6C6C] text-xs sm:text-sm my-3 leading-relaxed">
          Beginners getting started with their football journey.
        </p> */}
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
          {plans[0]?.perks?.map((feature: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
            <li key={index} className="flex items-center gap-2">
              <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
              <span className="text-[#6C6C6C]">{feature}</span>
            </li>
          ))}
          {/* <li className="flex items-center gap-2">
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
          </li> */}
        </ul>
      </div>
      <div
        className={`bg-[#000B42] rounded-2xl p-4 sm:p-6 lg:p-8 relative`}
      >
        <p className="text-[#0095FF] mb-3 font-semibold text-sm sm:text-base">{plans[1]?.displayName}</p>
        <div className="flex items-end mb-3">
          <p className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold">₦{plans[1]?.price?.toLocaleString()}</p>
          <p className="text-[#E5E5E5] mb-1 ml-1 text-sm sm:text-base">{plans[1]?.planName}</p>
        </div>
        {/* <p className="text-[#E5E5E5] text-xs sm:text-sm my-3 leading-relaxed">
          Serious players committed to going pro and building a long-term
          presence.
        </p> */}
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
            : "Go Yearly Pro"}
        </button>
        <p className="my-3 text-[#FCFCFC] font-medium text-sm sm:text-base">Includes:</p>
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
          {plans[1]?.perks?.map((feature: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
            <li key={index} className="flex items-center gap-2">
              <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
              <span className="text-[#FCFCFC]">{feature}</span>
            </li>
          ))}
          {/* <li className="flex items-center gap-2">
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
          </li> */}
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
        <p className="text-[#0095FF] mb-3 font-semibold text-sm sm:text-base">{plans[2]?.displayName}</p>
        <div className="flex items-end mb-3">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">₦{plans[2]?.price?.toLocaleString()}</p>
          <p className="text-[#6C6C6C] mb-1 ml-1 text-sm sm:text-base">{plans[2]?.planName}</p>
        </div>
        {/* <p className="text-[#6C6C6C] text-xs sm:text-sm my-3 leading-relaxed">
          Active players ready to showcase their full potential and get
          discovered faster.
        </p> */}
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
          {plans[2]?.perks?.map((feature: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
            <li key={index} className="flex items-center gap-2">
              <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
              <span className="text-[#6C6C6C]">{feature}</span>
            </li>
          ))}
          {/* <li className="flex items-center gap-2">
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
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default PricingComp;
