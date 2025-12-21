"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import PricingComp from "@/components/PricingComp";
import React, { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/store/user";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

const updatePlan = () => {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const [plan, setPlan] = useState<any>("");
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setPlansLoading(true);
      try {
        const res = await api.get("/plans");
        setPlans(res.data?.data?.plans || []);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
        setPlans([]);
      }
      setPlansLoading(false);
    };
    fetchPlans();
  }, []);


  useEffect(() => {
    setPlan(user?.plan);
  }, [user]);

  // Get current user's plan details
  const currentPlanDetails = plans.find(
    (p) => p.planName?.toLowerCase() === user?.plan?.toLowerCase()
  );

  const handlePay = async (selectedPlan: string) => {
    try {
      // Dynamically import PaystackPop only when needed
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key:
          process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
          "pk_test_f7cf01b996e574f4c92ea4b4067baec9a8c19925", // set in your .env
        email: user ? user?.email : "",
        amount:
          selectedPlan === "monthly"
            ? 2000 * 100
            : selectedPlan === "yearly"
              ? 20000 * 100
              : 0, // convert Naira to kobo
        currency: "NGN",
        ref: `ref-${Date.now()}`,

        onSuccess: (response: any) => {
          console.log("Payment complete:", response);
          updatePlan(selectedPlan);
        },
        onClose: () => {
          console.log("Payment popup closed");
        },
      });
    } catch (error) {
      console.error("Failed to load Paystack:", error);
    }
  };

  const handlePlanSelect = (selectedPlan: string) => {
    setPlan(selectedPlan);
    if (selectedPlan === "free") {
      // updatePlan("free");
    } else {
      handlePay(selectedPlan);
    }
  };

  const updatePlan = async (selectedPlan: string) => {
    try {
      const res = await api.patch("/onboarding/update-plan", {
        plan: selectedPlan,
      });
      if (res?.data?.data?.plan) {
        setUser((prev: any) => ({ ...prev, plan: res.data.data.plan }));
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelSubscription = async () => {
    if (!user?._id) return;
    try {
      const res = await api.post(`/subscriptions/${user._id}/cancel`);
      if (res?.data?.success) {
        setUser((prev: any) => ({ ...prev, plan: 'free' }));
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.error("Failed to cancel subscription:", err);
    }
  }


  return (
    <AdminLayout>
      <div className="pt-4 sm:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            className="flex items-center gap-2 text-[#222] text-sm mb-6 sm:mb-8 hover:text-primary transition"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-[#222] mb-2">My Subscription</h1>
            <p className="text-sm sm:text-base text-[#666]">Manage your Playeer plan and billing.</p>
          </div>

          {/* Current Plan Card */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-[#F4F4F4] p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-6">
              <div className="sm:my-auto">
                <h2 className="text-lg sm:text-xl font-bold capitalize text-center sm:text-left text-[#222]">{user?.plan} Plan</h2>
                {user?.plan && user?.plan !== 'free' && (user as any)?.renewalDate && (
                  <p className="text-xs sm:text-sm text-[#666] mt-1 text-center sm:text-left">
                    Renews on {formatDate((user as any).renewalDate)}
                  </p>
                )}
              </div>


              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                {user?.plan !== 'free' && (
                  <button
                    className="bg-[#FFE9E9] px-4 sm:px-6 py-3 text-[#991616] rounded-full text-sm order-2 sm:order-1"
                    onClick={() => handleCancelSubscription()}
                  >
                    Cancel Subscription
                  </button>
                )}
                <button
                  className="bg-primary text-white px-4 sm:px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition order-1 sm:order-2"
                  onClick={() => setOpen(true)}
                >
                  {user?.plan === 'free' ? 'Upgrade' : 'Change'} Plan
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#222] mb-4">Features:</h3>
              <div className="space-y-3">
                {plansLoading ? (
                  <p className="text-[#666] text-sm">Loading features...</p>
                ) : currentPlanDetails?.perks && currentPlanDetails.perks.length > 0 ? (
                  currentPlanDetails.perks.map((perk: string, index: number) => (
                    <div key={index} className="flex items-start sm:items-center gap-3">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                        <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span className="text-[#222] text-sm leading-relaxed">{perk}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[#666] text-sm">No features available for this plan.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Modal */}
        {open && (
          <Modal onClose={() => setOpen(false)} width="95%">
            <div className="px-4 sm:px-6">
              <div className="text-center lg:w-96 mx-auto py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-3">Playeer Plans & Pricing</h1>
                <p className="text-sm sm:text-base text-[#5A5A5A]">Find the plan that fits your goals. Upgrade and cancel anytime, save 20% with yearly billing.</p>
              </div>
              <PricingComp selectedPlan={plan} onPlanSelect={handlePlanSelect} />
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default updatePlan;
