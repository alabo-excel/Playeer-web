"use client";

import Card from "@/components/Card";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user";
import api from "@/utils/api";
import { Spin } from "antd";
import NewHighlights from "@/components/Modals/Highlights";

export interface VideoFormData {
  title: string;
  description: string;
  tags: string;
  file: File | null;
  fileName: string;
  preview: string;
  [key: string]: any;
}

const reels = () => {
  const [modal, setShowModal] = useState(false);

  const user = useAtomValue(userAtom);
  const [highlights, setHighlights] = useState<any[]>([]);
  const [highlightsLoading, setHighlightsLoading] = useState(true);
  const [highlightsError, setHighlightsError] = useState<string | null>(null);

  // Fetch highlights for the user
  const fetchHighlights = async () => {
    if (!user?._id) return;
    setHighlightsLoading(true);
    try {
      const res = await api.get(`/highlights/user/${user._id}`);
      console.log(res.data?.data);
      setHighlights(res.data?.data || []);
    } catch (err) {
      setHighlightsError("Failed to load highlights");
    } finally {
      setHighlightsLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, [user?._id]);


  return (
    <AdminLayout>
      <div className="pt-3">
        <div className="lg:flex justify-between">
          <div className="lg:w-[45%]">
            <p className="text-2xl font-bold">Your Highlight Reels</p>
            <p className="text-sm my-3 text-[#6C6C6C]">
              Your videos are your best chance to stand out. Upload match clips,
              drills, or skill showcases to show scouts what you're made of.
            </p>
          </div>
          {highlights.length > 0 ? (
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary my-auto text-sm text-white flex justify-evenly p-3 rounded-full w-44"
            >
              <Plus />
              <span> Upload New Video</span>
            </button>
          ) : null}
        </div>
        <section className="bg-[#FCFCFC] rounded-xl mt-2 p-4">
          {highlightsLoading ? (
            <div className="text-center">
              <Spin />
            </div>
          ) : highlights.length === 0 ? (
            <div className="lg:w-[45%] my-32 mx-auto text-center">
              <p className="text-2xl font-bold">No video yet!</p>
              <p className="text-sm my-3 text-[#6C6C6C]">
                Your videos are your best chance to stand out. Upload match
                clips, drills, or skill showcases to show scouts what you're
                made of.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-sm text-white flex justify-evenly p-3 rounded-full w-52 mx-auto"
              >
                <Plus />
                <span> Upload New Video</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#F4F4F4] rounded-xl p-3">
              <p className="font-bold text-xl mb-4">Highlight Videos</p>
              <div className="grid lg:grid-cols-3 gap-4">
                {highlights.map((highlight) => (
                  <Card type="video" key={highlight._id} fetchHighlights={() => fetchHighlights()} data={highlight} />
                ))}
              </div>
            </div>
          )}
        </section>
        <NewHighlights showModal={modal} onCLose={() => setShowModal(false)} fetchHighlights={() => fetchHighlights()} />
      </div>
    </AdminLayout>
  );
};

export default reels;
