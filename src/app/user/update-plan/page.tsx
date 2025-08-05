"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import PricingComp from "@/components/PricingComp";
import React, { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/store/user";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const updatePlan = () => {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const [plan, setPlan] = useState<any>("");
  const router = useRouter();

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
      <>
        <PricingComp selectedPlan={plan} onPlanSelect={handlePlanSelect} />
      </>
    </AdminLayout>
  );
};

export default updatePlan;
