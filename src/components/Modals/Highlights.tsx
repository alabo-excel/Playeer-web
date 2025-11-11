import { userAtom } from "@/store/user";
import api from "@/utils/api";
import Modal from "@/components/Modal";
import { useAtomValue } from "jotai";
import { CloudUpload, X, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Spin } from "antd";

export interface VideoFormData {
  title: string;
  description: string;
  tags: string;
  file: File | null;
  fileName: string;
  preview: string;
  [key: string]: any;
}


const NewHighlights = ({ showModal, onCLose, fetchHighlights, data }: { showModal: boolean, onCLose: () => void, fetchHighlights: () => void, data?: VideoFormData }) => {
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

  useEffect(() => {
    if (data) {
      setFormData({
        title: data?.title,
        description: data?.description,
        tags: data?.tags,
        file: null,
        fileName: data?.fileName || "",
        preview: data?.video || "",
      })
    }
  }, [data])

  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Highlight title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.tags.trim()) {
      newErrors.tags = "Tags are required";
    }

    if (!data && !formData.file) {
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
      setErrors({
        file: "Please select a valid video file (MP4, MOV, AVI, MKV)",
      });
      return;
    }

    // Validate file size (150MB)
    const maxSize = 150 * 1024 * 1024; // 150MB in bytes
    if (file.size > maxSize) {
      setErrors({ file: "File size must be less than 150MB" });
      return;
    }

    // Clear previous errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.file;
      return newErrors;
    });

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        file: file,
        fileName: file.name,
        preview: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
      fileName: "",
      preview: "",
    }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.file;
      return newErrors;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (field: keyof VideoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };


  // Edit highlight function
  const handleEdit = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("tags", formData.tags);
    // Only append file if a new file is selected
    if (formData.file) {
      formPayload.append("video", formData.file);
    }
    try {
      await api.put(`/highlights/${data?._id}`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        },
      });
      onCLose();
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
      fetchHighlights();
    } catch (err: any) {
      let errorMsg = "Failed to update highlight";
      if (err?.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err?.message) {
        errorMsg = err.message;
      }
      setErrors({ file: errorMsg });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Update handleSubmit to POST or PATCH depending on data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (data) {
      await handleEdit();
    } else {
      setIsUploading(true);
      setUploadProgress(0);
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("tags", formData.tags);
      if (formData.file) {
        formPayload.append("video", formData.file);
      }
      try {
        await api.post("/highlights", formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        });
        onCLose();
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
        fetchHighlights();
      } catch (err: any) {
        let errorMsg = "Failed to upload highlight";
        if (err?.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err?.message) {
          errorMsg = err.message;
        }
        setErrors({ file: errorMsg });
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
  };


  return (
    <>
      {showModal && (
        <Modal onClose={() => onCLose()} width="900px">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="my-6">
              {data ?
                <p className="text-xl font-bold">Edit Highlight Video</p> : <p className="text-xl font-bold">Upload Highlight Video</p>
              }
              <p className="text-sm">Showcase your best moments scouts, coaches, and fans are watching.</p>
            </div>

            <div className="flex gap-6">
              <div className="w-[40%] text-center">
                {/* <label className="font-semibold text-sm mb-2">Upload Video</label> */}
                <div
                  className={`border border-dashed rounded-xl p-3 ${errors.file ? "border-red-500" : "border-[#D8DADE]"
                    }`}
                >
                  {!formData.preview ? (
                    <>
                      <div className="mb-3 flex flex-col items-center text-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-[#F4F4F4] rounded-full p-4"
                        >
                          <CloudUpload />
                        </button>
                        <div className="my-auto">
                          <p className="text-sm font-semibold">Upload Video</p>
                          <p className="text-xs placeholder:text-[#B6B6B6]">
                            MP4, MOV, AVI, MKV (Max 150MB)
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#F4F4F4] p-2 rounded-full px-6 mx-auto text-sm"
                      >
                        Browse File
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
                      <p className="text-sm text-gray-600 mt-2">
                        {formData.fileName}
                      </p>
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
              </div>
              <div className="w-[60%]">
                <div className="">
                  <label className="mb-2">Video Title</label>
                  <input
                    placeholder="e.g., Trial Participation – GFA Showcase"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={`p-3 rounded-md bg-white w-full ${errors.title ? "border border-red-500" : "bg-white border border-[#DFDFDF]"
                      }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                <div className="my-4">
                  <label className=" mb-2">Description</label>
                  <textarea
                    placeholder="Short context or what to focus on in the video"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className={`p-3 rounded-md w-full bg-white h-32 ${errors.description ? "border border-red-500" : "bg-white border border-[#DFDFDF]"
                      }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="my-4">
                  <label className="mb-2">
                    Tags (Separate with comma)
                  </label>
                  <input
                    placeholder="e.g., Passing, Speed, Dribbling, Long Ball"
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    className={`p-3 rounded-md w-full ${errors.tags
                      ? "border border-red-500 bg-white"
                      : "bg-white border border-[#DFDFDF]"
                      }`}
                  />
                  {errors.tags && (
                    <p className="text-red-500 text-xs mt-1">{errors.tags}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full rounded-full p-3 my-4 min-h-[48px] transition-colors duration-200
                ${isUploading ? 'border border-primary bg-[#E5F4FF] text-primary' : 'bg-primary text-[#FCFCFC]'}
              `}
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center">
                      <Spin size="small" style={{ color: '#0095FF' }} />
                    </span>
                  ) : (
                    <div className="flex justify-center items-center gap-3">
                      <Plus size={15} />
                      <span className="my-auto">
                        {data ? "Edit Highlight" : "Upload Highlight"}
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </div>

          </form>
        </Modal>
      )}
    </>
  );
};

export default NewHighlights;
