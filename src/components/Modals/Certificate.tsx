import React, { useRef, useState, useEffect } from "react";
import Modal from "../Modal";
import { CloudUpload } from "lucide-react";
import { Spin } from "antd";
import api from "@/utils/api";

const CertificateModal = ({
  showModal,
  setShowModal,
  certificateToEdit,
  onSuccess,
}: {
  showModal: boolean;
  setShowModal: () => void;
  certificateToEdit?: any;
  onSuccess?: () => void;
}) => {
  // Certificate form state
  const certUploadRef = useRef<HTMLInputElement>(null);

  const [certForm, setCertForm] = useState({
    title: "",
    issuedBy: "",
    date: "",
    description: "",
    file: null as File | null,
    fileName: "",
    preview: "" as string,
  });

  useEffect(() => {
    setCertForm({
      title: certificateToEdit?.certificateTitle || "",
      issuedBy: certificateToEdit?.issuedBy || "",
      date: certificateToEdit?.dateIssued || "",
      description: certificateToEdit?.description || "",
      file: null,
      fileName: "",
      preview: certificateToEdit?.photo || "",
    });
  }, [certificateToEdit]);
  const [certErrors, setCertErrors] = useState<{ [key: string]: string }>({});
  const [certUploading, setCertUploading] = useState(false);

  const handleCertInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCertForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (certErrors[name]) {
      setCertErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCertFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate file type and size (only images, max 4MB)
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setCertErrors({ file: "Only JPG and PNG images are allowed" });
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        setCertErrors({ file: "File size must be less than 4MB" });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setCertErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.file;
            return newErrors;
          });
          setCertForm((prev) => ({
            ...prev,
            file: file,
            fileName: file.name,
            preview: reader.result as string,
          }));
        }
      };
    }
  };

  const removeCertImage = () => {
    setCertForm((prev) => ({
      ...prev,
      file: null,
      fileName: "",
      preview: "",
    }));
  };

  const [certError, setCertError] = useState<string | null>(null);

  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!certForm.title.trim())
      newErrors.title = "Certificate title is required";
    if (!certForm.issuedBy.trim()) newErrors.issuedBy = "Issued by is required";
    if (!certForm.date) newErrors.date = "Date is required";
    if (!certForm.description.trim())
      newErrors.description = "Description is required";
    if (!certForm.file && !certificateToEdit)
      newErrors.file = "Please select a file";
    if (Object.keys(newErrors).length > 0) {
      setCertErrors(newErrors);
      return;
    }
    setCertErrors({});
    setCertUploading(true);
    try {
      if (certificateToEdit && certificateToEdit._id) {
        // Edit certificate (PUT) - do NOT send file
        await api.put("/onboarding/certificate", {
          id: certificateToEdit._id,
          certificate: {
            certificateTitle: certForm.title,
            issuedBy: certForm.issuedBy,
            dateIssued: certForm.date,
            description: certForm.description,
          },
        });
      } else {
        // Add certificate (POST)
        const formData = new FormData();
        formData.append("certificateTitle", certForm.title);
        formData.append("issuedBy", certForm.issuedBy);
        formData.append("dateIssued", certForm.date);
        formData.append("description", certForm.description);
        if (certForm.file) {
          formData.append("photo", certForm.file);
        }
        await api.post("/onboarding/certificate", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      if (onSuccess) onSuccess();
      setShowModal();
      setCertForm({
        title: "",
        issuedBy: "",
        date: "",
        description: "",
        file: null,
        fileName: "",
        preview: "",
      });
      setCertError(null);
    } catch (err: any) {
      let errorMsg = "Failed to save certificate. Please try again.";
      if (err?.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err?.message) {
        errorMsg = err.message;
      }
      setCertError(errorMsg);
    } finally {
      setCertUploading(false);
    }
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal()} width="600px">
          <form onSubmit={handleCertSubmit}>
            <div>
              {certificateToEdit ? (
                <p className="text-lg font-bold">Edit Certificate</p>
              ) : (
                <p className="text-lg font-bold">Upload New Certificate</p>
              )}
              <div className="grid grid-cols-2 gap-4 my-4">
                <div>
                  <label className="font-semibold text-sm mb-2">
                    Certificate Title
                  </label>
                  <input
                    placeholder="e.g., Trial Participation – GFA Showcase"
                    type="text"
                    name="title"
                    value={certForm.title}
                    onChange={handleCertInput}
                    className={`p-3 rounded-md w-full ${
                      certErrors.title
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {certErrors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {certErrors.title}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-semibold text-sm mb-2">
                    Issued By
                  </label>
                  <input
                    placeholder="Name of the organization or event"
                    type="text"
                    name="issuedBy"
                    value={certForm.issuedBy}
                    onChange={handleCertInput}
                    className={`p-3 rounded-md w-full ${
                      certErrors.issuedBy
                        ? "border border-red-500"
                        : "bg-[#F4F4F4]"
                    }`}
                  />
                  {certErrors.issuedBy && (
                    <p className="text-red-500 text-xs mt-1">
                      {certErrors.issuedBy}
                    </p>
                  )}
                </div>
              </div>
              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Date Issued
                </label>
                <input
                  type="date"
                  name="date"
                  value={certForm.date}
                  onChange={handleCertInput}
                  className={`p-3 rounded-md w-full ${
                    certErrors.date ? "border border-red-500" : "bg-[#F4F4F4]"
                  }`}
                />
                {certErrors.date && (
                  <p className="text-red-500 text-xs mt-1">{certErrors.date}</p>
                )}
              </div>
              <div className="my-4">
                <label className="font-semibold text-sm mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Brief details on why or how you earned it"
                  name="description"
                  value={certForm.description}
                  onChange={handleCertInput}
                  className={`p-3 rounded-md w-full h-32 ${
                    certErrors.description
                      ? "border border-red-500"
                      : "bg-[#F4F4F4]"
                  }`}
                ></textarea>
                {certErrors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {certErrors.description}
                  </p>
                )}
              </div>

              <div
                className={`my-4 border border-dashed rounded-xl p-3 ${
                  certErrors.file ? "border-red-500" : "border-[#D8DADE]"
                }`}
              >
                {certForm.preview ? (
                  <div className="relative">
                    <img
                      src={certForm.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeCertImage}
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
                        <p className="text-xs placeholder:text-[#B6B6B6]">
                          JPG, PNG accepted (max 4mb)
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleCertFile}
                      ref={certUploadRef}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => certUploadRef.current?.click()}
                      className="bg-[#E5F4FF] text-primary p-2 rounded-xl text-sm w-full"
                    >
                      Click to upload
                    </button>
                  </>
                )}
                {certErrors.file && (
                  <p className="text-red-500 text-xs mt-1">{certErrors.file}</p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full rounded-full p-3 my-4 min-h-[48px] transition-colors duration-200
                  ${certUploading ? "border border-primary bg-[#E5F4FF] text-primary" : "bg-primary text-[#FCFCFC]"}
                `}
                disabled={certUploading}
              >
                {certUploading ? (
                  <span className="flex items-center justify-center">
                    <Spin size="small" style={{ color: "#0095FF" }} />
                  </span>
                ) : (
                  <div className="flex justify-center items-center gap-3">
                    <CloudUpload size={15} />
                    <span className="my-auto">
                      {certificateToEdit ? "Save Changes" : "Upload Certificate"}
                    </span>
                  </div>
                )}
              </button>
              {certError && (
                <p className="text-red-500 text-xs mt-3 text-center">
                  {certError}
                </p>
              )}
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CertificateModal;
