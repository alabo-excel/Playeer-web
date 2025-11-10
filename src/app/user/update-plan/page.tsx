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

const updatePlan = () => {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const [plan, setPlan] = useState<any>("");
  const router = useRouter();
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setPlan(user?.plan);
  }, [user]);

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

  return (
    <AdminLayout>
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <button
            className="flex items-center gap-2 text-[#222] text-sm mb-8"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Back
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#222] mb-2">My Subscription</h1>
            <p className="text-[#666]">Manage your Playeer plan and billing.</p>
          </div>

          {/* Current Plan Card */}
          <div className="mb-8">
            <div className="bg-[#F4F4F4] p-4 rounded-2xl flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold capitalize my-auto text-[#222]">{user?.plan} Plan</h2>
              <div className="flex gap-4">
                {user?.plan !== 'free' && <button className="bg-[#FFE9E9] px-6 py-3 text-[#991616] rounded-full text-sm">Cancel Subscription</button>}
                <button
                  className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition"
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
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-[#222] text-sm">Upload up to 2 highlight videos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-[#222] text-sm">Basic player profile (bio, stats, position)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-[#222] text-sm">Visible in Playeer global directory</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-[#222] text-sm">Access to free training tips & articles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Modal */}
        {open && (
          <Modal onClose={() => setOpen(false)} width="95%">
            <div>
              <div className="text-center lg:w-96 mx-auto py-8">
                <h1 className="text-3xl font-bold mb-3">Playeer Plans & Pricing</h1>
                <p className="text-[#5A5A5A]">Find the plan that fits your goals. Upgrade and cancel anytime, save 20% with yearly billing.</p>
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
