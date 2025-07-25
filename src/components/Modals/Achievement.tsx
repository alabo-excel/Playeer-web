import React, { useRef, useState, useEffect } from "react";
import api from "@/utils/api";
import Modal from "../Modal";
import { CloudUpload, Plus } from "lucide-react";
import { Spin } from "antd";

const AchievementModal = ({
  show,
  onClose,
  achievementToEdit,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  achievementToEdit?: any;
  onSuccess?: () => void;
}) => {
  // Achievement form state
  const achievementUploadRef = useRef<HTMLInputElement>(null);
  const [achievementForm, setAchievementForm] = useState({
    title: "",
    competition: "",
    organizer: "",
    date: "",
    description: "",
    file: null as File | null,
    fileName: "",
    preview: "" as string,
  });

  useEffect(() => {
    setAchievementForm({
      title: achievementToEdit?.title || "",
      competition: achievementToEdit?.competitionName || "",
      organizer: achievementToEdit?.organizer || "",
      date: achievementToEdit?.date || "",
      description: achievementToEdit?.description || "",
      file: null,
      fileName: "",
      preview: achievementToEdit?.photo || "",
    });
  }, [achievementToEdit]);
  const [achievementError, setAchievementError] = useState<string | null>(null);
  const [achievementUploading, setAchievementUploading] = useState(false);

  // Add error state for achievement and journey forms
  const [achievementErrors, setAchievementErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleAchievementInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAchievementForm((prev) => ({ ...prev, [name]: value }));
    if (achievementErrors[name]) {
      setAchievementErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAchievementFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate file type and size (only images, max 4MB)
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setAchievementErrors({ file: "Only JPG and PNG images are allowed" });
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        setAchievementErrors({ file: "File size must be less than 4MB" });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setAchievementErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.file;
            return newErrors;
          });
          setAchievementForm((prev) => ({
            ...prev,
            file: file,
            fileName: file.name,
            preview: reader.result as string,
          }));
        }
      };
    }
  };

  const removeAchievementImage = () => {
    setAchievementForm((prev) => ({
      ...prev,
      file: null,
      fileName: "",
      preview: "",
    }));
  };

  const handleAchievementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!achievementForm.title.trim()) newErrors.title = "Title is required";
    if (!achievementForm.competition.trim())
      newErrors.competition = "Competition name is required";
    if (!achievementForm.organizer.trim())
      newErrors.organizer = "Organizer is required";
    if (!achievementForm.date) newErrors.date = "Date is required";
    if (!achievementForm.description.trim())
      newErrors.description = "Description is required";
    if (!achievementForm.file && !achievementToEdit)
      newErrors.file = "Please select a file";
    if (Object.keys(newErrors).length > 0) {
      setAchievementErrors(newErrors);
      return;
    }
    setAchievementErrors({});
    setAchievementUploading(true);
    try {
      if (achievementToEdit && achievementToEdit._id) {
        // Edit achievement (PUT)
        await api.put(`/onboarding/achievement`, {
          id: achievementToEdit._id,
          achievement: {
            title: achievementForm.title,
            competitionName: achievementForm.competition,
            organizer: achievementForm.organizer,
            date: achievementForm.date,
            description: achievementForm.description,
          },
        });
      } else {
        // Add achievement (POST) as FormData
        const formData = new FormData();
        formData.append("title", achievementForm.title);
        formData.append("competitionName", achievementForm.competition);
        formData.append("organizer", achievementForm.organizer);
        formData.append("date", achievementForm.date);
        formData.append("description", achievementForm.description);
        if (achievementForm.file) {
          formData.append("photo", achievementForm.file);
        }
        await api.post("/onboarding/achievement", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      if (onSuccess) onSuccess();
      onClose();
      setAchievementForm({
        title: "",
        competition: "",
        organizer: "",
        date: "",
        description: "",
        file: null,
        fileName: "",
        preview: "",
      });
      setAchievementError(null);
    } catch (err: any) {
      let errorMsg = "Failed to save achievement. Please try again.";
      if (err?.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err?.message) {
        errorMsg = err.message;
      }
      setAchievementError(errorMsg);
    } finally {
      setAchievementUploading(false);
    }
  };

  return (
    <>
      {show && (
        <Modal onClose={onClose} width="600px">
          <form onSubmit={handleAchievementSubmit}>
            <div>
              {achievementToEdit ? (
                <p className="text-lg font-bold">Edit Achievement</p>
              ) : (
                <p className="text-lg font-bold">Add New Achievement Card</p>
              )}
              <div className="grid grid-cols-2 gap-4 my-4">
                <div>
                  <label className="font-semibold text-sm mb-2">Title</label>
                  <input
                    placeholder="e.g., Top Scorer – U17 Cup"
                    type="text"
                    name="title"
                    value={achievementForm.title}
                    onChange={handleAchievementInput}
                    className={`p-3 rounded-md w-full ${
                      achievementErrors.title
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {achievementErrors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {achievementErrors.title}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-semibold text-sm mb-2">
                    Competition Name
                  </label>
                  <input
                    placeholder="e.g., Shell Cup"
                    type="text"
                    name="competition"
                    value={achievementForm.competition}
                    onChange={handleAchievementInput}
                    className={`p-3 rounded-md w-full ${
                      achievementErrors.competition
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {achievementErrors.competition && (
                    <p className="text-red-500 text-xs mt-1">
                      {achievementErrors.competition}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-sm mb-2">
                    Organizer
                  </label>
                  <input
                    placeholder="e.g., Lagos FA"
                    type="text"
                    name="organizer"
                    value={achievementForm.organizer}
                    onChange={handleAchievementInput}
                    className={`p-3 rounded-md w-full ${
                      achievementErrors.organizer
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {achievementErrors.organizer && (
                    <p className="text-red-500 text-xs mt-1">
                      {achievementErrors.organizer}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-semibold text-sm mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={achievementForm.date}
                    onChange={handleAchievementInput}
                    className={`p-3 rounded-md w-full ${
                      achievementErrors.date
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {achievementErrors.date && (
                    <p className="text-red-500 text-xs mt-1">
                      {achievementErrors.date}
                    </p>
                  )}
                </div>
              </div>

              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Brief details about this achievement"
                  name="description"
                  value={achievementForm.description}
                  onChange={handleAchievementInput}
                  className={`p-3 rounded-md w-full h-32 ${
                    achievementErrors.description
                      ? "border border-red-500"
                      : "bg-[#F4F4F4]"
                  }`}
                ></textarea>
                {achievementErrors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {achievementErrors.description}
                  </p>
                )}
              </div>

              <div
                className={`my-4 border border-dashed rounded-xl p-3 ${
                  achievementErrors.file ? "border-red-500" : "border-[#D8DADE]"
                }`}
              >
                {achievementForm.preview ? (
                  <div className="relative">
                    <img
                      src={achievementForm.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeAchievementImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-3 flex gap-3">
                      <button
                        type="button"
                        className="bg-[#F4F4F4] rounded-full p-4"
                      >
                        <CloudUpload />
                      </button>
                      <div className="my-auto">
                        <p className="text-sm font-semibold">Upload Photos</p>
                        <p className="text-xs text-[#B6B6B6]">
                          JPG, PNG accepted (max 4mb)
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleAchievementFile}
                      ref={achievementUploadRef}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => achievementUploadRef.current?.click()}
                      className="bg-[#E5F4FF] text-primary p-2 rounded-xl text-sm w-full"
                    >
                      Click to upload
                    </button>
                  </>
                )}
                {achievementErrors.file && (
                  <p className="text-red-500 text-xs mt-1">
                    {achievementErrors.file}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full rounded-full p-3 my-4 min-h-[48px] transition-colors duration-200
                  ${achievementUploading ? "border border-primary bg-[#E5F4FF] text-primary" : "bg-primary text-[#FCFCFC]"}
                `}
                disabled={achievementUploading}
              >
                {achievementUploading ? (
                  <span className="flex items-center justify-center">
                    <Spin size="small" style={{ color: "#0095FF" }} />
                  </span>
                ) : (
                  <div className="flex justify-center items-center gap-3">
                    <Plus size={15} />
                    <span className="my-auto">
                      {achievementToEdit ? "Save Changes" : "Save Achievement"}
                    </span>
                  </div>
                )}
              </button>
              {achievementError && (
                <p className="text-red-500 text-xs mt-3 text-center">
                  {achievementError}
                </p>
              )}
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AchievementModal;
