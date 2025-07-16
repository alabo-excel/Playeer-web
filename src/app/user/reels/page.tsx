"use client";

import Card from "@/components/Card";
import AdminLayout from "@/components/layouts/AdminLayout";
import Modal from "@/components/Modal";
import { CloudUpload, Plus, X } from "lucide-react";
import React, { useState, useRef } from "react";

interface VideoFormData {
  title: string;
  description: string;
  tags: string;
  file: File | null;
  fileName: string;
  preview: string;
}

const reels = () => {
  const [data, setData] = useState(true);
  const [modal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    description: "",
    tags: "",
    file: null,
    fileName: "",
    preview: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) {
      newErrors.title = "Video title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.tags.trim()) {
      newErrors.tags = "Tags are required";
    }

    if (!formData.file) {
      newErrors.file = "Please select a video file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["video/mp4", "video/mov", "video/avi", "video/mkv"];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ file: "Please select a valid video file (MP4, MOV, AVI, MKV)" });
      return;
    }

    // Validate file size (150MB)
    const maxSize = 150 * 1024 * 1024; // 150MB in bytes
    if (file.size > maxSize) {
      setErrors({ file: "File size must be less than 150MB" });
      return;
    }

    // Clear previous errors
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.file;
      return newErrors;
    });

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        file: file,
        fileName: file.name,
        preview: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({
      ...prev,
      file: null,
      fileName: "",
      preview: "",
    }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.file;
      return newErrors;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (field: keyof VideoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload delay
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setShowModal(false);
        // Reset form
        setFormData({
          title: "",
          description: "",
          tags: "",
          file: null,
          fileName: "",
          preview: "",
        });
        setErrors({});
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 500);
    }, 2000);
  };

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
            <form onSubmit={handleSubmit}>
              <p className="text-lg font-bold">Upload New Highlight</p>
              
              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Video Title
                </label>
                <input
                  placeholder="e.g., Trial Participation – GFA Showcase"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`p-3 rounded-md w-full ${
                    errors.title 
                      ? "border border-red-500" 
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Upload Video
                </label>
                <div className={`border border-dashed rounded-xl p-3 ${
                  errors.file ? "border-red-500" : "border-[#D8DADE]"
                }`}>
                  {!formData.preview ? (
                    <>
                      <div className="mb-3 flex gap-3">
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-[#F4F4F4] rounded-full p-4"
                        >
                          <CloudUpload />
                        </button>
                        <div className="my-auto">
                          <p className="text-sm font-semibold">Upload Video</p>
                          <p className="text-xs text-[#B6B6B6]">
                            MP4, MOV, AVI, MKV (Max 150MB)
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#E5F4FF] text-primary p-2 rounded-xl text-sm w-full"
                      >
                        Click to upload
                      </button>
                    </>
                  ) : (
                    <div className="relative">
                      <video 
                        src={formData.preview} 
                        className="w-full h-48 object-cover rounded-lg"
                        controls
                      />
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-sm text-gray-600 mt-2">{formData.fileName}</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                {errors.file && (
                  <p className="text-red-500 text-xs mt-1">{errors.file}</p>
                )}
              </div>

              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Short context or what to focus on in the video"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`p-3 rounded-md w-full h-32 ${
                    errors.description 
                      ? "border border-red-500" 
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>

              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Tags (Separate with comma)
                </label>
                <input
                  placeholder="e.g., Passing, Speed, Dribbling, Long Ball"
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className={`p-3 rounded-md w-full ${
                    errors.tags 
                      ? "border border-red-500 bg-[#F4F4F4]" 
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {errors.tags && (
                  <p className="text-red-500 text-xs mt-1">{errors.tags}</p>
                )}
              </div>

              {isUploading && (
                <div className="my-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isUploading}
                className={`w-full text-white p-3 rounded-full mt-4 text-sm ${
                  isUploading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-primary hover:bg-blue-600"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload Highlight"}
              </button>
            </form>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default reels;
