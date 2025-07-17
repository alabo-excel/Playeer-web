"use client";
import Card from "@/components/Card";
import AdminLayout from "@/components/layouts/AdminLayout";
import UserComp from "@/components/UserComp";
import { CloudUpload, Plus, SquarePen } from "lucide-react";
import React, { useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Modal from "@/components/Modal";

const profile = () => {
  const [journey, setJourney] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  // File upload refs
  const certUploadRef = useRef<HTMLInputElement>(null);
  const achievementUploadRef = useRef<HTMLInputElement>(null);

  // Certificate form state
  const [certForm, setCertForm] = useState({
    title: "",
    issuedBy: "",
    date: "",
    description: "",
    file: null as File | null,
    fileName: "",
    preview: "" as string,
  });
  const [certErrors, setCertErrors] = useState<{ [key: string]: string }>({});
  const [certUploading, setCertUploading] = useState(false);

  // Journey form state
  const [journeyForm, setJourneyForm] = useState({
    teamName: "",
    position: "",
    fromDate: "",
    toDate: "",
    highlights: "",
  });
  const [journeyError, setJourneyError] = useState<string | null>(null);
  const [journeySubmitting, setJourneySubmitting] = useState(false);

  // Achievement form state
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
  const [achievementError, setAchievementError] = useState<string | null>(null);
  const [achievementUploading, setAchievementUploading] = useState(false);

  // Add error state for achievement and journey forms
  const [achievementErrors, setAchievementErrors] = useState<{
    [key: string]: string;
  }>({});
  const [journeyErrors, setJourneyErrors] = useState<{ [key: string]: string }>(
    {}
  );

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

  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: { [key: string]: string } = {};

    if (!certForm.title.trim()) {
      newErrors.title = "Certificate title is required";
    }
    if (!certForm.issuedBy.trim()) {
      newErrors.issuedBy = "Issued by is required";
    }
    if (!certForm.date) {
      newErrors.date = "Date is required";
    }
    if (!certForm.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!certForm.file) {
      newErrors.file = "Please select a file";
    }

    if (Object.keys(newErrors).length > 0) {
      setCertErrors(newErrors);
      return;
    }

    setCertErrors({});
    setCertUploading(true);

    // Simulate upload with progress
    const uploadProgress = setInterval(() => {
      setCertUploading((prev) => {
        if (prev === true) {
          clearInterval(uploadProgress);
          setShowModal(false);
          setCertForm({
            title: "",
            issuedBy: "",
            date: "",
            description: "",
            file: null,
            fileName: "",
            preview: "",
          });
          return false;
        }
        return prev;
      });
    }, 1500);
  };

  const handleJourneyInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJourneyForm((prev) => ({ ...prev, [name]: value }));
    if (journeyErrors[name]) {
      setJourneyErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleJourneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!journeyForm.teamName.trim())
      newErrors.teamName = "Team/Club name is required";
    if (!journeyForm.position.trim())
      newErrors.position = "Position is required";
    if (!journeyForm.fromDate) newErrors.fromDate = "From date is required";
    if (!journeyForm.toDate) newErrors.toDate = "To date is required";
    if (Object.keys(newErrors).length > 0) {
      setJourneyErrors(newErrors);
      return;
    }
    setJourneyErrors({});
    setJourneySubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setJourneySubmitting(false);
      setShowJourney(false);
      setJourneyForm({
        teamName: "",
        position: "",
        fromDate: "",
        toDate: "",
        highlights: "",
      });
    }, 1000);
  };

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

  const handleAchievementSubmit = (e: React.FormEvent) => {
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
    if (!achievementForm.file) newErrors.file = "Please select a file";
    if (Object.keys(newErrors).length > 0) {
      setAchievementErrors(newErrors);
      return;
    }
    setAchievementErrors({});
    setAchievementUploading(true);

    // Simulate upload with progress
    const uploadProgress = setInterval(() => {
      setAchievementUploading((prev) => {
        if (prev === true) {
          clearInterval(uploadProgress);
          setShowAchievement(false);
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
          return false;
        }
        return prev;
      });
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="pt-3">
        <div className="md:flex justify-between">
          <div className="lg:w-[45%]">
            <p className="text-2xl font-bold">Your Football Profile</p>
            <p className="text-sm my-3 text-[#6C6C6C]">
              This is what scouts and clubs see. Make it count. The more
              detailed and authentic your profile, the higher your chances of
              getting discovered.
            </p>
          </div>
          <button className="text-primary my-auto p-2 flex gap-3 rounded-full px-6 bg-[#E5F4FF]">
            <SquarePen size={15} className="my-auto" />
            <span>Edit Profile</span>
          </button>
        </div>
        <section className="bg-[#FCFCFC] md:flex gap-4 p-3 rounded-3xl">
          <div className="md:w-[35%]">
            <UserComp />
          </div>
          <div className="md:w-[65%]">
            <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
              <div className="flex justify-between">
                <p className="text-xl font-bold">Personal Information</p>
                <button className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary">
                  <SquarePen size={15} className="my-auto" />
                  <span className="text-sm my-auto">Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-3">
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Full Name</p>
                  <p className="font-bold text-base">John Kelly</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Date of Birth</p>
                  <p className="font-bold text-base">10 Feb, 2000</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Age</p>
                  <p className="font-bold text-base">19</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Gender</p>
                  <p className="font-bold text-base">Male</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Nationality</p>
                  <p className="font-bold text-base">Nigerian</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">City</p>
                  <p className="font-bold text-base">Uyo</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Contact Email</p>
                  <p className="font-bold text-base">Johnkelly@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
              <div className="flex justify-between">
                <p className="text-xl font-bold">Football Information</p>
                <button className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary">
                  <SquarePen size={15} className="my-auto" />
                  <span className="text-sm my-auto">Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Main Position</p>
                  <p className="font-bold text-bse">John Kelly</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">
                    Secondary Position
                  </p>
                  <p className="font-bold text-base">10 Feb, 2000</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Dominant Foot</p>
                  <p className="font-bold text-base">19</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">Jersey Number</p>
                  <p className="font-bold text-base">7</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">
                    Years of Expreience
                  </p>
                  <p className="font-bold text-base">7 years</p>
                </div>
                <div>
                  <p className="text-sm text-[#6C6C6C] mb-2">
                    Current Club/Academy
                  </p>
                  <p className="font-bold text-base">Uyo</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F4F4F4] p-3 rounded-2xl mb-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-xl font-bold">Football Journey</p>
                  <p className="text-sm text-[#6C6C6C]">
                    List past clubs, academies, or events you’ve been part of.
                  </p>
                </div>
                {journey ? (
                  <button
                    onClick={() => setShowJourney(true)}
                    className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary"
                  >
                    <Plus size={15} className="my-auto" />
                    <span className="text-sm my-auto">Add</span>
                  </button>
                ) : null}
              </div>
              {journey ? (
                <div>
                  {[1, 2, 3].map((single) => (
                    <div className="my-3" key={single}>
                      <div className="flex gap-4">
                        <p className="font-bold text-base">Future Stars FC</p>
                        <span className="text-[#232323] text-sm">
                          (Jan 2021 – Nov 2023)
                        </span>
                        <SquarePen
                          size={15}
                          className="my-auto text-[#0095FF]"
                        />
                      </div>
                      <p className="text-sm text-[#6C6C6C]">
                        Midfielder – Starting XI
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="lg:w-[55%] my-4 mx-auto text-center">
                  <p className="text-lg font-bold"> No Journey Entries Yet</p>
                  <p className="text-sm my-2 text-[#6C6C6C]">
                    You haven’t added any clubs, academies, or competitions to
                    your profile.
                  </p>
                  <button
                    onClick={() => setShowJourney(true)}
                    className="bg-primary text-sm text-white flex justify-evenly p-2 rounded-full w-52 mx-auto"
                  >
                    <Plus size={15} className="my-auto" />
                    <span> Add First Experience</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="bg-[#F4F4F4] p-3 rounded-2xl my-3">
          <div className="flex justify-between">
            <p className="text-xl font-bold">Achievements</p>
            {journey ? (
              <button
                onClick={() => setShowAchievement(true)}
                className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary"
              >
                <Plus size={15} className="my-auto" />
                <span className="text-sm my-auto">Add</span>
              </button>
            ) : null}
          </div>
          {journey ? (
            <div className="mt-4">
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1.2}
                breakpoints={{
                  640: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3.2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4.4,
                    spaceBetween: 10,
                  },
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <SwiperSlide key={i}>
                    <Card />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="lg:w-[55%] my-16 mx-auto text-center">
              <p className="text-lg font-bold"> No Achievements Entries Yet</p>
              <p className="text-sm my-2 text-[#6C6C6C]">
                Have you ever won a tournament, earned a “Man of the Match,” or
                been recognized by your team or coach? This is the place to
                showcase your football milestones big or small.
              </p>
              <button
                onClick={() => setShowAchievement(true)}
                className="bg-primary text-sm text-white flex justify-evenly p-2 rounded-full w-52 mx-auto"
              >
                <Plus size={15} className="my-auto" />
                <span> Add First Achievements</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-[#F4F4F4] p-3 rounded-2xl">
          <div className="flex justify-between">
            <p className="text-xl font-bold">Certificates</p>
            {journey ? (
              <button
                onClick={() => setShowModal(true)}
                className="text-primary my-auto p-2 flex gap-3 rounded-full px-4 border border-primary"
              >
                <Plus size={15} className="my-auto" />
                <span className="text-sm my-auto">Add</span>
              </button>
            ) : null}
          </div>
          {journey ? (
            <div className="mt-4">
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1.2}
                breakpoints={{
                  640: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3.2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4.4,
                    spaceBetween: 10,
                  },
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <SwiperSlide key={i}>
                    <Card />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="lg:w-[55%] my-16 mx-auto text-center">
              <p className="text-lg font-bold"> No Certificates Entries Yet</p>
              <p className="text-sm my-2 text-[#6C6C6C]">
                If you’ve completed a football program, trial, camp, or training
                upload proof here. Certificates help verify your experience and
                show you're serious about development.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-sm text-white flex justify-evenly p-2 rounded-full w-52 mx-auto"
              >
                <CloudUpload size={15} className="my-auto" />
                <span> Upload Certificate</span>
              </button>
            </div>
          )}
        </div>

        <>
          {showJourney && (
            <Modal onClose={() => setShowJourney(!showJourney)} width="600px">
              <form onSubmit={handleJourneySubmit}>
                <div>
                  <p className="text-lg font-bold">Add New Football Journey</p>
                  <div className="grid grid-cols-2 gap-4 my-4">
                    <div>
                      <label className="font-semibold text-sm mb-2">
                        Team/Club Name
                      </label>
                      <input
                        placeholder="e.g., “Future Stars Academy”"
                        type="text"
                        name="teamName"
                        value={journeyForm.teamName}
                        onChange={handleJourneyInput}
                        className={`p-3 rounded-md w-full ${
                          journeyErrors.teamName
                            ? "border border-red-500"
                            : "bg-[#F4F4F4]"
                        }`}
                      />
                      {journeyErrors.teamName && (
                        <p className="text-red-500 text-xs mt-1">
                          {journeyErrors.teamName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="font-semibold text-sm mb-2">
                        Position
                      </label>
                      <select
                        name="position"
                        value={journeyForm.position}
                        onChange={handleJourneyInput}
                        className={`p-3 rounded-md w-full ${
                          journeyErrors.position
                            ? "border border-red-500"
                            : "bg-[#F4F4F4]"
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="Goalkeeper">Goalkeeper</option>
                        <option value="Defender">Defender</option>
                        <option value="Midfielder">Midfielder</option>
                        <option value="Forward">Forward</option>
                      </select>
                      {journeyErrors.position && (
                        <p className="text-red-500 text-xs mt-1">
                          {journeyErrors.position}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="font-semibold text-sm mb-2">From</label>
                      <input
                        type="date"
                        name="fromDate"
                        value={journeyForm.fromDate}
                        onChange={handleJourneyInput}
                        className={`p-3 rounded-md w-full ${
                          journeyErrors.fromDate
                            ? "border border-red-500"
                            : "bg-[#F4F4F4]"
                        }`}
                      />
                      {journeyErrors.fromDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {journeyErrors.fromDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="font-semibold text-sm mb-2">To</label>
                      <input
                        type="date"
                        name="toDate"
                        value={journeyForm.toDate}
                        onChange={handleJourneyInput}
                        className={`p-3 rounded-md w-full ${
                          journeyErrors.toDate
                            ? "border border-red-500"
                            : "bg-[#F4F4F4]"
                        }`}
                      />
                      {journeyErrors.toDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {journeyErrors.toDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="my-4">
                    <label className="font-semibold text-sm mb-2">
                      Key Highlights
                    </label>
                    <textarea
                      placeholder="Optional description"
                      name="highlights"
                      value={journeyForm.highlights}
                      onChange={handleJourneyInput}
                      className="p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4] h-32"
                    ></textarea>
                  </div>
                  {journeyError && (
                    <div className="text-red-500 text-sm mb-2">
                      {journeyError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full flex justify-center gap-3 text-white p-3 rounded-full bg-primary mt-4 text-sm"
                    disabled={journeySubmitting}
                  >
                    <Plus size={15} />
                    <span className="my-auto">
                      {journeySubmitting
                        ? "Adding..."
                        : "Add Club/Academy Experience"}
                    </span>
                  </button>
                </div>
              </form>
            </Modal>
          )}

          {showAchievement && (
            <Modal
              onClose={() => setShowAchievement(!showAchievement)}
              width="600px"
            >
              <form onSubmit={handleAchievementSubmit}>
                <div>
                  <p className="text-lg font-bold">Add New Achievement Card</p>
                  <div className="grid grid-cols-2 gap-4 my-4">
                    <div>
                      <label className="font-semibold text-sm mb-2">
                        Title
                      </label>
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
                      achievementErrors.file
                        ? "border-red-500"
                        : "border-[#D8DADE]"
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
                            <p className="text-sm font-semibold">
                              Upload Photos
                            </p>
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
                    className="w-full flex justify-center gap-3 text-white p-3 rounded-full bg-primary mt-4 text-sm"
                    disabled={achievementUploading}
                  >
                    <Plus size={15} />
                    <span className="my-auto">
                      {achievementUploading ? "Saving..." : "Save Achievement"}
                    </span>
                  </button>
                </div>
              </form>
            </Modal>
          )}

          {showModal && (
            <Modal onClose={() => setShowModal(!showModal)} width="600px">
              <form onSubmit={handleCertSubmit}>
                <div>
                  <p className="text-lg font-bold">Upload New Certificate</p>
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
                        certErrors.date
                          ? "border border-red-500"
                          : "bg-[#F4F4F4]"
                      }`}
                    />
                    {certErrors.date && (
                      <p className="text-red-500 text-xs mt-1">
                        {certErrors.date}
                      </p>
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
                            <p className="text-sm font-semibold">
                              Upload Photos
                            </p>
                            <p className="text-xs text-[#B6B6B6]">
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
                      <p className="text-red-500 text-xs mt-1">
                        {certErrors.file}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center gap-3 text-white p-3 rounded-full bg-primary mt-4 text-sm"
                    disabled={certUploading}
                  >
                    <CloudUpload size={15} className="my-auto" />
                    <span className="my-auto">
                      {certUploading ? "Uploading..." : "Upload Certificate"}
                    </span>
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </>
      </div>
    </AdminLayout>
  );
};

export default profile;
