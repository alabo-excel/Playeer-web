import React, { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import api from "@/utils/api";
import Modal from "./Modal";

interface PricingCompProps {
  onPlanSelect: (plan: string) => void;
  selectedPlan?: string;
  loading?: boolean;
  currentUserPlan?: string;
}

const PricingComp: React.FC<PricingCompProps> = ({
  onPlanSelect,
  selectedPlan,
  loading,
  currentUserPlan,
}) => {

  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState<boolean>(true);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    plan: any;
    action: 'upgrade' | 'downgrade' | 'select';
  }>({ open: false, plan: null, action: 'select' });

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

  const getPlanOrder = (planName: string) => {
    const order = { 'free': 0, 'monthly': 1, 'yearly': 2 };
    return order[planName as keyof typeof order] ?? -1;
  };

  const getPlanChangeType = (selectedPlanName: string) => {
    if (!currentUserPlan) return 'select';
    const currentOrder = getPlanOrder(currentUserPlan);
    const selectedOrder = getPlanOrder(selectedPlanName);

    if (selectedOrder > currentOrder) return 'upgrade';
    if (selectedOrder < currentOrder) return 'downgrade';
    return 'select';
  };

  const handlePlanClick = (plan: any) => {
    const planName = plan.planName?.toLowerCase();
    const changeType = getPlanChangeType(planName);

    if (changeType === 'select') {
      // No confirmation needed for same plan
      onPlanSelect(planName);
    } else if (planName === 'free' && changeType === 'downgrade') {
      // Show warning when downgrading to free from paid plan
      setConfirmModal({ open: true, plan, action: 'downgrade' });
    } else if (changeType === 'upgrade' || (planName === 'free' && !currentUserPlan)) {
      // Show confirmation for upgrades, or free plan for new users
      setConfirmModal({ open: true, plan, action: changeType });
    } else {
      // Direct selection for other cases
      onPlanSelect(planName);
    }
  };

  const handleConfirmPlanChange = () => {
    const planName = confirmModal.plan?.planName?.toLowerCase();
    onPlanSelect(planName);
    setConfirmModal({ open: false, plan: null, action: 'select' });
  };

  if (plansLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Free Plan */}
        {plans[0] && (
          <div className="bg-[#F4F4F4] rounded-2xl p-4 sm:p-6 lg:p-8 my-auto">
            <p className="text-[#0095FF] mb-3 font-semibold uppercase text-sm sm:text-base">{plans[0]?.displayName}</p>
            <div className="flex items-end mb-3">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">₦{plans[0]?.price?.toLocaleString()}</p>
              <p className="text-[#6C6C6C] mb-1 ml-1 text-sm sm:text-base">Forever</p>
            </div>

            <button
              type="button"
              className={`rounded-full w-full p-3 sm:p-4 text-white text-sm sm:text-base font-medium ${loading || selectedPlan === "free"
                ? "bg-transparent !text-[#BFBFBF] !cursor-not-allowed"
                : "bg-primary"
                }`}
              onClick={() => handlePlanClick(plans[0])}
              disabled={loading || selectedPlan === "free"}
            >
              {loading && selectedPlan === "free"
                ? "Loading..."
                : "Get Started Free"}
            </button>

            <p className="my-3 font-medium text-sm sm:text-base">Includes:</p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
              {plans[0]?.perks?.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
                  <span className="text-[#6C6C6C]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Monthly Plan */}
        {plans[1] && (
          <div className="bg-[#000B42] rounded-2xl p-4 sm:p-6 lg:p-8 relative">
            <p className="text-[#0095FF] mb-3 font-semibold text-sm sm:text-base">{plans[1]?.displayName}</p>
            <div className="flex items-end mb-3">
              <p className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold">₦{plans[1]?.price?.toLocaleString()}</p>
              <p className="text-[#E5E5E5] mb-1 ml-1 text-sm sm:text-base">{plans[1]?.planName}</p>
            </div>

            <button
              type="button"
              className={`rounded-full w-full p-3 sm:p-4 text-white text-sm sm:text-base font-medium ${loading || selectedPlan === "monthly"
                ? "bg-transparent !text-[#BFBFBF] !cursor-not-allowed"
                : "bg-primary"
                }`}
              onClick={() => handlePlanClick(plans[1])}
              disabled={loading || selectedPlan === "monthly"}
            >
              {loading && selectedPlan === "monthly"
                ? "Loading..."
                : "Go Monthly Pro"}
            </button>

            <p className="my-3 text-[#FCFCFC] font-medium text-sm sm:text-base">Includes:</p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
              {plans[1]?.perks?.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
                  <span className="text-[#FCFCFC]">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <button className="text-[#17E85E] p-3 sm:p-4 rounded-full w-full sm:w-52 bg-[#0F993E4D] text-sm sm:text-base font-medium">
                Recommended
              </button>
            </div>
          </div>
        )}

        {/* Yearly Plan */}
        {plans[2] && (
          <div className="bg-[#F4F4F4] rounded-2xl p-4 sm:p-6 lg:p-8 my-auto">
            <p className="text-[#0095FF] mb-3 font-semibold text-sm sm:text-base">{plans[2]?.displayName}</p>
            <div className="flex items-end mb-3">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">₦{plans[2]?.price?.toLocaleString()}</p>
              <p className="text-[#6C6C6C] mb-1 ml-1 text-sm sm:text-base">{plans[2]?.planName}</p>
            </div>

            <button
              type="button"
              className={`rounded-full w-full p-3 sm:p-4 text-white text-sm sm:text-base font-medium ${loading || selectedPlan === "yearly"
                ? "bg-transparent !text-[#BFBFBF] !cursor-not-allowed"
                : "bg-primary"
                }`}
              onClick={() => handlePlanClick(plans[2])}
              disabled={loading || selectedPlan === "yearly"}
            >
              {loading && selectedPlan === "yearly"
                ? "Loading..."
                : "Go Yearly Pro"}
            </button>

            <p className="my-3 font-medium text-sm sm:text-base">Includes:</p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
              {plans[2]?.perks?.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CircleCheckBig className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#0F973D] flex-shrink-0" />
                  <span className="text-[#6C6C6C]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <Modal onClose={() => setConfirmModal({ open: false, plan: null, action: 'select' })} width="420px">
          <div className="text-center">
            <div className="mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${confirmModal.plan?.planName?.toLowerCase() === 'free' && confirmModal.action === 'downgrade'
                  ? 'bg-red-100'
                  : 'bg-blue-100'
                }`}>
                {confirmModal.plan?.planName?.toLowerCase() === 'free' && confirmModal.action === 'downgrade' ? (
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {confirmModal.action === 'upgrade' ? 'Upgrade' : 'Downgrade'} Plan
              </h3>
              <p className="text-sm text-[#666] mb-6">
                {confirmModal.plan?.planName?.toLowerCase() === 'free' && confirmModal.action === 'downgrade' ? (
                  <>
                    Are you sure you want to downgrade to the <span className="font-semibold">{confirmModal.plan?.displayName}</span> plan?
                    <span className="block mt-2 text-red-600 font-medium">
                      ⚠️ Warning: You'll lose access to all premium features including unlimited videos, achievements, certificates, and top talent visibility.
                    </span>
                  </>
                ) : (
                  <>
                    Are you sure you want to {confirmModal.action === 'upgrade' ? 'upgrade to' : 'downgrade to'} the{' '}
                    <span className="font-semibold">{confirmModal.plan?.displayName}</span> plan?
                    {confirmModal.action === 'upgrade' ? (
                      <span className="block mt-2 text-green-600">
                        You'll get access to additional features immediately.
                      </span>
                    ) : (
                      <span className="block mt-2 text-orange-600">
                        You'll lose access to premium features at the end of your current billing period.
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal({ open: false, plan: null, action: 'select' })}
                className="flex-1 bg-[#F2F2F2] p-3 rounded-full text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPlanChange}
                className={`flex-1 p-3 rounded-full font-medium transition-colors ${confirmModal.plan?.planName?.toLowerCase() === 'free' && confirmModal.action === 'downgrade'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : confirmModal.action === 'upgrade'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
              >
                {confirmModal.plan?.planName?.toLowerCase() === 'free' && confirmModal.action === 'downgrade'
                  ? 'Downgrade to Free'
                  : confirmModal.action === 'upgrade'
                    ? 'Upgrade Plan'
                    : 'Downgrade Plan'
                }
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PricingComp;