"use client";

import Card from "@/components/Card";
import AdminLayout from "@/components/layouts/AdminLayout";
import Modal from "@/components/Modal";
import { CloudUpload, Plus } from "lucide-react";
import React, { useState } from "react";

const reels = () => {
  const [data, setData] = useState(true);
  const [modal, setShowModal] = useState(false);
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
          {data ? (
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
          {data ? (
            <div className="bg-[#F4F4F4] rounded-xl p-3">
              <p className="font-bold mb-4">Highlight Videos</p>
              <div className="grid lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5].map((single) => (
                  <Card type="video" key={single} />
                ))}
              </div>
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </section>
        {modal && (
          <Modal onClose={() => setShowModal(false)} width="600px">
            <div>
              <p className="text-lg font-bold">Upload New Highlight</p>
              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Video Title
                </label>
                <input
                  placeholder="e.g., “Trial Participation – GFA Showcase”"
                  type="text"
                  className="p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]"
                />
              </div>
              <div className="my-4 border border-dashed rounded-xl border-[#D8DADE] p-3">
                <div className="mb-3 flex gap-3">
                  <button className="bg-[#F4F4F4] rounded-full p-4">
                    <CloudUpload />
                  </button>
                  <div className="my-auto">
                    <p className="text-sm font-semibold">Upload Video</p>
                    <p className="text-xs text-[#B6B6B6]">
                      MP4, MOV (Max 150MB)
                    </p>
                  </div>
                </div>
                <button className="bg-[#E5F4FF] text-primary p-2 rounded-xl text-sm w-full">
                  Click to upload
                </button>
              </div>
              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Short context or what to focus on in the video"
                  className="p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4] h-32"
                ></textarea>
              </div>
              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Tags (Separate with comma)
                </label>
                <input
                  placeholder="e.g., Passing, Speed, Dribbling, Long Ball"
                  type="text"
                  className="p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]"
                />
              </div>

              <button className="w-full text-white p-3 rounded-full bg-primary mt-4 text-sm">
                Upload Highlight
              </button>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default reels;
