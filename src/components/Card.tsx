import { Eye, Play } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CardProps {
  videoUrl?: string;
  type: string;
}

const Card: React.FC<CardProps> = ({ videoUrl, type }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (!videoUrl) {
      setThumbnail(null);
      return;
    }
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;
    video.onloadeddata = () => {
      video.currentTime = 1;
    };
    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumbnail(canvas.toDataURL("image/png"));
      }
    };
    // Clean up
    return () => {
      // No need to revokeObjectURL since we're not using object URLs
    };
  }, [videoUrl]);

  return (
    <div className="border border-[#E5E5E5] bg-[#FCFCFC] p-1 rounded-md">
      <div className="relative">
        <img
          src={thumbnail || "/images/player-2.jpg"}
          alt="Video thumbnail"
          className="w-full h-44 object-cover rounded-md"
        />
        {type === "video" ? (
          <button className="rounded-full p-4 bg-[#F4F4F4] w-14 absolute top-14 text-[#232323] left-0 right-0 mx-auto">
            <Play />
          </button>
        ) : null}
      </div>
      <div className="p-2">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button className="flex text-xs bg-[#E5F4FF] justify-between py-1 px-3 rounded-full text-primary">
              <Eye size={18} />
              <span className="my-auto">100</span>
            </button>
            <p className="text-sm my-auto text-[#6C6C6C]">April 14, 2025</p>
          </div>
        </div>
        <p className="text-sm font-bold my-2">
          Dribbling & Ball Control – U17 Trials
        </p>
        <p className="text-sm text-[#6C6C6C]">
          2 assists and 1 goal during this match. Watch movement and control.
          #Dribbling #Speed #Close Control
        </p>
      </div>
    </div>
  );
};

export default Card;
