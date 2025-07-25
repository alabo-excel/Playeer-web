"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import Modal from "@/components/Modal";
import UserComp from "@/components/UserComp";
import { userAtom } from "@/store/user";
import { useAtomValue } from "jotai";
import { BellRing, SquarePlay, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { underscoreToSpace } from "@/utils/formatDate";


const dashboard = () => {
  const user = useAtomValue(userAtom);
  const [showModal, setShowModal] = useState(user?.welcome);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);

  const handleCompleteProfile = async () => {
    setShowModal(false);
    try {
      await api.patch("/users/dismiss-welcome");
      router.push("/user/profile");
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  const getStatus = async () => {
    try {
      await api.get("/onboarding/status").then((data) => {
        setData(data.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getActivities = async () => {
    setActivitiesLoading(true);
    setActivitiesError(null);
    try {
      const res = await api.get("/users/activities");
      setActivities(res.data?.data || []);
    } catch (err) {
      setActivitiesError("Failed to load activities");
    } finally {
      setActivitiesLoading(false);
    }
  };

  useEffect(() => {
    getStatus();
    getActivities();
  }, []);

  return (
    <AdminLayout>
      <div className="pt-3">
        <div className="lg:w-[35%]">
          <p className="text-2xl font-bold">Welcome back, {user?.username}!</p>
          <p className="text-sm my-3 text-[#6C6C6C]">
            Keep pushing forward every upload, every stat brings you closer to
            getting noticed.
          </p>
        </div>

        <section className="lg:flex gap-4">
          <div className="lg:w-[65%] lg:p-2 mb-3">
            <div className="relative rounded-2xl">
              <img
                src="/images/dashboard-card.png"
                className="rounded-2xl w-full md:h-auto h-[55vh] object-cover"
                alt=""
              />
              <div className="absolute top-1/2 md:left-6 left-3 -translate-y-1/2 text-[#FCFCFC] lg:w-1/2">
                <img src="/images/logo.png" className="my-2" alt="" />
                <h2 className="text-xl !text-[#FCFCFC] my-2 font-bold">
                  Every Video You Upload Increases Your Chance of Discovery
                </h2>
                <p className="text-xs my-2">
                  Scouts want to see consistency, not perfection. Start small
                  training drills, match clips, or even warm-ups. Let them see
                  what you’re made of.
                </p>
                <Link href={"/user/reels"}>
                  <button className=" text-white flex justify-evenly p-3 px-6 rounded-full bg-primary mt-4 text-sm">
                    <SquarePlay size={15} className="my-auto mr-3" />
                    <span> Upload a Highlight Now</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-4 my-3">
              <div className="bg-[#FCFCFC] p-4 rounded-2xl">
                <p className="text-sm text-[#6C6C6C]">Profile Views</p>
                <p className="text-3xl font-bold my-2">{data?.totalViews}</p>
                <div className="flex">
                  <TrendingUp
                    className="text-[#0F973D] my-auto mr-2"
                    size={15}
                  />
                  <p className="text-[#6C6C6C] text-xs">+15% vs last week</p>
                </div>
              </div>
              <div className="bg-[#FCFCFC] p-4 rounded-2xl">
                <p className="text-sm text-[#6C6C6C]">Highlight Plays</p>
                <p className="text-3xl font-bold my-2">
                  {data?.totalHighlightViews}
                </p>
                <div className="flex">
                  <TrendingDown
                    className="text-[#E82728] my-auto mr-2"
                    size={15}
                  />
                  <p className="text-[#6C6C6C] text-xs">-5% vs last week</p>
                </div>
              </div>
              <div className="bg-[#FCFCFC] p-4 rounded-2xl">
                <p className="text-sm text-[#6C6C6C]">Profile Completion</p>
                <p className="text-3xl font-bold my-2">{data?.progress}%</p>
                <div className="flex">
                  <BellRing className="text-[#FBBC05] my-auto mr-2" size={15} />
                  <p className="text-[#6C6C6C] text-xs">Action Needed</p>
                </div>
              </div>
            </div>
            <div className="bg-[#FCFCFC] p-4 rounded-2xl">
              <div className="lg:w-1/2">
                <p className="font-bold text-lg mb-2">Recent Activity</p>
                <p className="text-sm text-[#6C6C6C]">
                  Stay updated on your performance, new interactions, and
                  opportunities.
                </p>
              </div>
              {activitiesLoading ? (
                <div className="text-center">
                  <Spin />
                </div>
              ) : activities.length === 0 ? (
                <p className="text-center text-sm text-[#6C6C6C] my-4">
                  No recent activity.
                </p>
              ) : (
                activities.map((activity, idx) => (
                  <div
                    key={activity._id || idx}
                    className="flex gap-6 border-b my-2 py-1 border-[#F4F4F4]"
                  >
                    <p className="font-bold capitalize text-sm">
                      {underscoreToSpace(activity.type) || "Activity"}
                    </p>
                    <p className="text-sm text-[#6C6C6C]">
                      {activity.description || ""}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="lg:w-[35%] mb-auto bg-[#FCFCFC] p-3 rounded-xl">
            <UserComp />
          </div>
        </section>

        {showModal && (
          <Modal onClose={() => setShowModal(false)} width="400px">
            <div className="text-center p-3">
              <img
                src="/images/male-memojis-2.svg"
                className="mx-auto w-44"
                alt=""
              />

              <p className="text-2xl font-bold mb-4">
                Welcome to Playeer, {user?.username}! Your profile is live, and
                you're ready to be seen.
              </p>
              <p className="mb-6 text-sm text-[#6C6C6C]">
                Start improving your profile, connect with scouts, and apply for
                trials. Let’s get you discovered!
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <button
                  className="px-6 w-full py-3 rounded-full text-[#FCFCFC] bg-primary"
                  onClick={handleCompleteProfile}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Complete Profile"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default dashboard;
