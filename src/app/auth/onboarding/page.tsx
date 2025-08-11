"use client";

import HeaderNav from "@/components/HeaderNav";
import PricingComp from "@/components/PricingComp";
import { Camera } from "lucide-react";
import React, { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { Country, City, State } from "country-state-city";
import { positions } from "@/utils/positions";
import Select from "react-select";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user";
import Link from "next/link";

const OnboardingForm = () => {
  const user = useAtomValue(userAtom);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // Add all other fields here as needed, e.g.:
    dateOfBirth: "",
    country: "",
    address: "",
    city: "",
    gender: "",
    height: "",
    weight: "",
    currentTeam: "",
    previousClub: "",
    yearsOfExperience: "",
    mainPosition: "",
    secondaryPosition: "",
    dominantFoot: "",
    jerseyNumber: "",
    // Add more as needed
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [plan, setPlan] = useState("");
  const [countries] = useState(Country.getAllCountries());
  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  const [cities, setCities] = useState<{ name: string }[]>([]);
  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    // { label: "Other", value: "other" },
  ];

  const dominantFootOptions = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Both", value: "both" },
  ];

  const secondaryPositionOptions = positions;

  // Update handleChange to support all fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "country") {
      setForm((prev) => ({ ...prev, city: "" }));
      const countryObj = countries.find((c) => c.isoCode === value);
      if (countryObj) {
        setCities(State.getStatesOfCountry(countryObj.isoCode) || []);
      } else {
        setCities([]);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "weight") {
      const cleaned = value.replace(/kg/g, "").trim();
      if (cleaned) {
        setForm((prev) => ({ ...prev, [name]: `${cleaned} kg` }));
      }
    }

    if (name === "height") {
      const cleaned = value.replace(/cm/g, "").trim();
      if (cleaned) {
        setForm((prev) => ({ ...prev, [name]: `${cleaned} cm` }));
      }
    }
  };

  // Handle photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      
      // Clear profile picture error when photo is selected
      if (fieldErrors.profilePicture) {
        setFieldErrors((prev) => ({ ...prev, profilePicture: "" }));
      }
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Validation function for current step
  const validateCurrentStep = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (step === 1) {
      if (!photo) errors.profilePicture = "Profile picture is required";
      if (!form.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
      if (!form.country) errors.country = "Country is required";
      if (!form.city) errors.city = "State is required";
      if (!form.gender) errors.gender = "Gender is required";
      if (!form.address.trim()) errors.address = "Address is required";
      if (!form.height.trim()) errors.height = "Height is required";
      if (!form.weight.trim()) errors.weight = "Weight is required";
    }

    if (step === 2) {
      if (!form.currentTeam.trim())
        errors.currentTeam = "Current Team/Academy is required";
      if (!form.yearsOfExperience.trim())
        errors.yearsOfExperience = "Years of Experience is required";
      if (!form.mainPosition) errors.mainPosition = "Main Position is required";
      if (!form.dominantFoot) errors.dominantFoot = "Dominant Foot is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, userPlan:string) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (photo) {
        formData.append("profilePicture", photo);
      }
      formData.append("plan", userPlan);
      await api.post("/onboarding/complete", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/auth/login");
    } catch (err: any) {
      setApiError(err?.response?.data?.message || "Onboarding failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (plan: string) => {
    try {
      // Dynamically import PaystackPop only when needed
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key:
          process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
          "pk_test_f7cf01b996e574f4c92ea4b4067baec9a8c19925", // set in your .env
        email: user ? user?.email : "",
        amount:
          plan === "monthly" ? 2000 * 100 : plan === "yearly" ? 20000 * 100 : 0, // convert Naira to kobo
        currency: "NGN",
        ref: `ref-${Date.now()}`,

        onSuccess: (response: any) => {
          handleSubmit({ preventDefault: () => {} } as React.FormEvent, plan);
          // console.log("Payment complete:", response);
        },
        onClose: () => {
          console.log("Payment popup closed");
          setPlan("");
        },
      });
    } catch (error) {
      console.error("Failed to load Paystack:", error);
    }
  };

  // New handler for plan selection
  const handlePlanSelect = (selectedPlan: string) => {
    setPlan(selectedPlan);
    if (selectedPlan === "free") {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent, selectedPlan);
    } else {
      handlePay(selectedPlan);
    }
  };

  return (
    <>
      {/* <HeaderNav scroll={true} /> */}
      <header className="px-8 py-4">
        <Link href="/auth/login">
          <img className="w-32" src="/images/logo-colored.png" alt="" />
        </Link>
      </header>
      <section
        className={`${
          step === 3 ? "" : "lg:w-[55%]"
        } max-w-7xl my-24 bg-white lg:mx-auto mx-4 bg-[#E5E5E5] rounded-2xl border border-gray md:p-10 p-4`}
      >
        {/* <form id="onboarding-form" onSubmit={handleSubmit}> */}
        {/* Step indicators */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-1/2 h-2 mx-1 rounded-full ${
                step >= s ? "bg-primary" : "bg-[#FCFCFC]"
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div>
            <div className="lg:w-[40%]">
              <p className="text-3xl font-bold">Tell Us About You</p>
              <p className="text-sm text-[#6C6C6C] my-3">
                This helps scouts and agents understand your football background
                and current level.
              </p>
            </div>
            <div className="flex mb-10">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full border overflow-hidden flex items-center justify-center ${
                  fieldErrors.profilePicture 
                    ? "border-red-300 bg-red-50" 
                    : "border-primary bg-[#E5F4FF]"
                }`}>
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  ) : null}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="profile-photo-input"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <button
                  type="button"
                  className="p-3 absolute top-18 right-0 text-primary rounded-full bg-white"
                  onClick={() =>
                    document.getElementById("profile-photo-input")?.click()
                  }
                >
                  <Camera />
                </button>
              </div>
              <div className="my-auto ml-6">
                <p className="font-semibold">Upload Profile Picture *</p>
                <p className="text-sm text-[#5F5F5F]">
                  Image should be in Jpeg, jpg, png.
                </p>
                {fieldErrors.profilePicture && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.profilePicture}
                  </p>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold mb-2 text-sm">
                  Date of Birth
                </label>
                <input
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  type="date"
                  className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                    fieldErrors.dateOfBirth
                      ? "bg-red-50 border border-red-300"
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {fieldErrors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.dateOfBirth}
                  </p>
                )}
              </div>
              <div>
                <label className="font-semibold mb-2 text-sm">Country</label>
                <Select
                  name="country"
                  isSearchable
                  options={countryOptions}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: fieldErrors.country
                        ? "1px solid #DC2626"
                        : "none",
                      backgroundColor: fieldErrors.country
                        ? "#FEF2F2"
                        : "#F4F4F4",
                    }),
                  }}
                  className="w-full p-1 placeholder:text-[#B6B6B6] rounded-md bg-[#F4F4F4]"
                  placeholder="Select your country"
                  value={countryOptions.find(
                    (option) => option.value === form.country
                  )}
                  onChange={(selectedOption: any) =>
                    handleChange({
                      target: {
                        name: "country",
                        value: selectedOption?.value || "",
                      },
                    })
                  }
                />
                {fieldErrors.country && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.country}
                  </p>
                )}
              </div>
              <div>
                <label className="font-semibold mb-2 text-sm">State</label>
                <Select
                  name="city"
                  options={cityOptions}
                  className="w-full p-1 placeholder:text-[#B6B6B6] rounded-md bg-[#F4F4F4]"
                  placeholder="Enter your state"
                  value={cityOptions.find(
                    (option) => option.value === form.city
                  )}
                  onChange={(selectedOption) =>
                    handleChange({
                      target: {
                        name: "city",
                        value: selectedOption?.value || "",
                      },
                    })
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: fieldErrors.city ? "1px solid #DC2626" : "none",
                      backgroundColor: fieldErrors.city ? "#FEF2F2" : "#F4F4F4",
                    }),
                  }}
                  isDisabled={!form.country}
                />
                {fieldErrors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="font-semibold mb-2 text-sm">Gender</label>
                <select
                  name="gender"
                  className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                    fieldErrors.gender
                      ? "bg-red-50 border border-red-300"
                      : "bg-[#F4F4F4]"
                  }`}
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option className="hidden" value="">
                    Select gender
                  </option>
                  {genderOptions.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.gender}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <label className="font-semibold mb-2 text-sm">Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your address"
                  className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                    fieldErrors.address
                      ? "bg-red-50 border border-red-300"
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {fieldErrors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.address}
                  </p>
                )}
              </div>
              <div>
                <label className="font-semibold mb-2 text-sm">Height</label>
                <input
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="e.g., 178 cm"
                  className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                    fieldErrors.height
                      ? "bg-red-50 border border-red-300"
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {fieldErrors.height && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.height}
                  </p>
                )}
              </div>
              <div>
                <label className="font-semibold mb-2 text-sm">Weight</label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="e.g., 70 kg"
                  className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                    fieldErrors.weight
                      ? "bg-red-50 border border-red-300"
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {fieldErrors.weight && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.weight}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="lg:w-[45%]">
              <p className="text-3xl font-bold">Your Football Background</p>
              <p className="text-sm text-[#6C6C6C] my-3">
                Add your history – academies, local clubs, and competitions
                you’ve played in.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold mb-2 text-sm">
                  Current Team/Academy
                </label>
                <input
                  name="currentTeam"
                  value={form.currentTeam}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g., Future Stars Academy"
                  className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                    fieldErrors.currentTeam
                      ? "bg-red-50 border border-red-300"
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {fieldErrors.currentTeam && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.currentTeam}
                  </p>
                )}
              </div>

              <div>
                <label className="font-semibold mb-2 text-sm">
                  Previous Clubs
                </label>
                <input
                  name="previousClub"
                  value={form.previousClub}
                  onChange={handleChange}
                  type="text"
                  placeholder="List your previous clubs"
                  className="p-3 placeholder:text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]"
                />
              </div>

              <div>
                <label className="font-semibold mb-2 text-sm">
                  Years of Experience
                </label>
                <input
                  name="yearsOfExperience"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g., 3 years"
                  className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                    fieldErrors.yearsOfExperience
                      ? "bg-red-50 border border-red-300"
                      : "bg-[#F4F4F4]"
                  }`}
                />
                {fieldErrors.yearsOfExperience && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.yearsOfExperience}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mainPosition"
                  className="font-semibold mb-2 text-sm"
                >
                  Main Position
                </label>
                <select
                  name="mainPosition"
                  value={form.mainPosition}
                  onChange={handleChange}
                  className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                    fieldErrors.mainPosition
                      ? "bg-red-50 border border-red-300"
                      : "bg-[#F4F4F4]"
                  }`}
                >
                  <option className="hidden" value="">
                    Select
                  </option>
                  {secondaryPositionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}{" "}
                </select>
                {fieldErrors.mainPosition && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.mainPosition}
                  </p>
                )}
              </div>
              <div className="lg:col-span-2 grid lg:grid-cols-3 gap-6">
                <div>
                  <label className="font-semibold mb-2 text-sm">
                    Secondary Position
                  </label>
                  <select
                    name="secondaryPosition"
                    className="p-3 placeholder:text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]"
                    value={form.secondaryPosition}
                    onChange={handleChange}
                  >
                    <option className="hidden" value="">
                      Select
                    </option>
                    {secondaryPositionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold mb-2 text-sm">
                    Dominant Foot
                  </label>
                  <select
                    name="dominantFoot"
                    className={`p-3 placeholder:text-[#B6B6B6] rounded-md w-full ${
                      fieldErrors.dominantFoot
                        ? "bg-red-50 border border-red-300"
                        : "bg-[#F4F4F4]"
                    }`}
                    value={form.dominantFoot}
                    onChange={handleChange}
                  >
                    <option className="hidden" value="">
                      Choose one
                    </option>
                    {dominantFootOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.dominantFoot && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.dominantFoot}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-semibold mb-2 text-sm">
                    Jersey Number
                  </label>
                  <input
                    name="jerseyNumber"
                    value={form.jerseyNumber}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter Jersey Number"
                    className="p-3 placeholder:text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="lg:w-[35%]">
              <p className="text-3xl font-bold">Choose How You Want to Start</p>
              <p className="text-sm text-[#6C6C6C] my-3">
                You can begin with the Free plan or unlock full features with a
                Pro account.
              </p>
            </div>
            <PricingComp
              onPlanSelect={handlePlanSelect}
              selectedPlan={plan}
              loading={loading}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-8 py-2 rounded-full border border-primary text-primary bg-white"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="md:px-20 px-8 py-2 rounded-full bg-primary text-white"
            >
              Continue
            </button>
          ) : null}
        </div>
        {/* </form> */}
      </section>
    </>
  );
};

export default OnboardingForm;
