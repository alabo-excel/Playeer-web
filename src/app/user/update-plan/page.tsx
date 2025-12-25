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
import { toast } from 'react-toastify';

const updatePlan = () => {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const [plan, setPlan] = useState<any>("");
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [downgradeModalOpen, setDowngradeModalOpen] = useState(false)
  const [pendingDowngradePlan, setPendingDowngradePlan] = useState<string>("")
  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState<boolean>(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      setPlansLoading(true);
      try {
        const res = await api.get("/plans/");
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

  const getPlanOrder = (planName: string) => {
    const order = { 'free': 0, 'monthly': 1, 'yearly': 2 };
    return order[planName as keyof typeof order] ?? -1;
  };

  const isDowngrade = (selectedPlan: string) => {
    if (!user?.plan) return false;
    const currentOrder = getPlanOrder(user.plan.toLowerCase());
    const selectedOrder = getPlanOrder(selectedPlan.toLowerCase());
    return selectedOrder < currentOrder;
  };

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

    if (isDowngrade(selectedPlan)) {
      // Show downgrade modal for plan downgrades
      setPendingDowngradePlan(selectedPlan);
      setDowngradeModalOpen(true);
    } else if (selectedPlan === "free") {
      // For free plan selection (when user doesn't have a paid plan)
      handleCancelSubscription();
    } else {
      // Handle upgrades or same plan
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

  const handleConfirmDowngrade = async () => {
    if (!pendingDowngradePlan) return;

    setDowngradeModalOpen(false);

    if (pendingDowngradePlan === "free") {
      await handleCancelSubscription();
    } else {
      // For downgrades between paid plans, we might need to update the plan immediately
      // or schedule it for the next billing cycle depending on your backend logic
      await updatePlan(pendingDowngradePlan);
    }

    setPendingDowngradePlan("");
  };

  const handleCancelSubscription = async () => {
    if (!user?._id) return;

    setCancelling(true);
    try {
      const res = await api.post(`/subscriptions/${user._id}/cancel`);
      if (res?.data?.success) {


        // setUser((prev: any) => ({ ...prev, plan: 'free' }));
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.error("Failed to cancel subscription:", err);
      toast.error("Failed to cancel subscription. Please try again.");
    } finally {
      setCancelling(false);
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
                    onClick={() => setCancelModalOpen(true)}
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
              <PricingComp selectedPlan={plan} currentUserPlan={user?.plan} onPlanSelect={handlePlanSelect} />
            </div>
          </Modal>
        )}

        {/* Cancel Subscription Confirmation Modal */}
        {cancelModalOpen && (
          <Modal onClose={() => setCancelModalOpen(false)} width="420px">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cancel Subscription</h3>
                <p className="text-sm text-[#666] mb-6">
                  Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="flex-1 bg-[#F2F2F2] p-3 rounded-full text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={async () => {
                    setCancelModalOpen(false);
                    await handleCancelSubscription();
                  }}
                  disabled={cancelling}
                  className="flex-1 bg-red-600 text-white p-3 rounded-full font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelling ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Cancelling...
                    </div>
                  ) : (
                    'Cancel Subscription'
                  )}
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Downgrade Plan Modal */}
        {downgradeModalOpen && (
          <Modal onClose={() => setDowngradeModalOpen(false)} width="420px">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Plan Downgrade Scheduled</h3>
                <p className="text-sm text-[#666] mb-6">
                  Your plan will be downgraded to <span className="font-semibold capitalize">{pendingDowngradePlan}</span> at the end of your current billing cycle.
                  {user?.plan && user?.plan !== 'free' && (user as any)?.renewalDate && (
                    <span className="block mt-2 text-sm">
                      This change will take effect on {formatDate((user as any).renewalDate)}.
                    </span>
                  )}
                  {pendingDowngradePlan === 'free' && (
                    <span className="block mt-2 text-orange-600 font-medium">
                      ⚠️ You'll lose access to premium features when the downgrade takes effect.
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDowngradeModalOpen(false)}
                  className="flex-1 bg-[#F2F2F2] p-3 rounded-full text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDowngrade}
                  className="flex-1 bg-orange-600 text-white p-3 rounded-full font-medium hover:bg-orange-700 transition-colors"
                >
                  Confirm Downgrade
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default updatePlan;
