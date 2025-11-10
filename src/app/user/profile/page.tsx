'use client'

import AdminLayout from "@/components/layouts/AdminLayout";
import { ArrowLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/store/user";
import { positions } from "@/utils/positions";
import { Country } from "country-state-city";
import api from "@/utils/api";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" }
];

const dominantFootOptions = [
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
  { label: "Both", value: "both" }
];

function Profile() {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const [countries] = useState(Country.getAllCountries());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCountry: "NG", // Default to Nigeria
    gender: "",
    dateOfBirth: "",
    country: "",
    mainPosition: "",
    secondaryPosition: "",
    dominantFoot: "",
    height: "",
    weight: "",
    profilePicture: null as File | null,
    profilePicturePreview: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const nameParts = user.fullName?.split(" ") || [];

      // Parse existing phone number to extract country code and number
      let phoneNumber = user.phone || "";
      let detectedPhoneCountry = user.phoneCountry || user.country || "NG";

      if (phoneNumber.startsWith('+')) {
        // Extract country code from existing phone number
        const phoneMatch = phoneNumber.match(/^\+(\d{1,4})\s?(.*)$/);
        if (phoneMatch) {
          const extractedCode = phoneMatch[1];
          const extractedNumber = phoneMatch[2];

          // Find country by phone code
          const foundCountry = countries.find(c => c.phonecode === extractedCode);
          if (foundCountry) {
            detectedPhoneCountry = foundCountry.isoCode;
            phoneNumber = extractedNumber; // Store just the number part
          }
        }
      }

      setForm({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: phoneNumber,
        phoneCountry: detectedPhoneCountry,
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().slice(0, 10) : "",
        country: user.country || "",
        mainPosition: user.mainPosition || "",
        secondaryPosition: user.secondaryPosition || "",
        dominantFoot: user.dominantFoot || "",
        height: user.height || "",
        weight: user.weight || "",
        profilePicture: null,
        profilePicturePreview: user.profilePicture || ""
      });
    }
  }, [user, countries]);

  const getInitials = () => {
    if (!user?.fullName) return "U";
    const names = user.fullName.split(" ");
    return (names[0][0] + (names[1]?.[0] || "")).toUpperCase();
  };

  const getCountryFlag = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const getPhoneCode = (countryCode: string) => {
    const country = countries.find(c => c.isoCode === countryCode);
    return country?.phonecode ? `+${country.phonecode}` : '';
  };

  // Get popular countries for the dropdown
  const getPopularCountries = () => {
    const popularCodes = ['NG', 'US', 'GB', 'CA', 'AU', 'GH', 'KE', 'ZA'];
    const popular = countries.filter(c => popularCodes.includes(c.isoCode));
    const rest = countries.filter(c => !popularCodes.includes(c.isoCode));
    return [...popular, ...rest];
  };

  const getFormattedPhoneNumber = () => {
    if (!form.phone.trim()) return '';
    const phoneCode = getPhoneCode(form.phoneCountry);
    return `${phoneCode} ${form.phone}`.trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Special handling for phone number to limit digits
    if (name === "phone") {
      // Remove all non-digit characters to count actual digits
      const digits = value.replace(/\D/g, '');
      // Limit to 15 digits (international standard)
      if (digits.length > 15) return;

      setForm(prev => ({ ...prev, [name]: value }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({
        ...prev,
        profilePicture: file,
        profilePicturePreview: URL.createObjectURL(file)
      }));
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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneDigits = form.phone.replace(/\D/g, '');
      if (phoneDigits.length < 7) {
        newErrors.phone = "Phone number is too short";
      } else if (phoneDigits.length > 10) {
        newErrors.phone = "Phone number is too long";
      }
    }

    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.country) newErrors.country = "Nationality is required";
    if (!form.mainPosition) newErrors.mainPosition = "Primary position is required";
    if (!form.dominantFoot) newErrors.dominantFoot = "Preferred foot is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const formData = new FormData();

      // Combine first and last name
      formData.append("fullName", `${form.firstName} ${form.lastName}`.trim());
      formData.append("email", form.email);
      formData.append("phone", getFormattedPhoneNumber()); // Send formatted phone with country code
      formData.append("gender", form.gender);
      formData.append("dateOfBirth", form.dateOfBirth);
      formData.append("country", form.country);
      formData.append("mainPosition", form.mainPosition);
      formData.append("secondaryPosition", form.secondaryPosition);
      formData.append("dominantFoot", form.dominantFoot);
      formData.append("height", form.height);
      formData.append("weight", form.weight);

      if (form.profilePicture) {
        formData.append("profilePicture", form.profilePicture);
      }

      formData.append("userId", user?._id || "");

      const res = await api.put("/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Update user atom with new data
      setUser(res.data?.data || res.data?.user || res.data);

      // Show success message or redirect
      window.history.back();

    } catch (err: any) {
      console.error("Profile update error:", err);
      setErrors({ submit: err?.response?.data?.message || "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const countryOptions = countries.map(country => ({
    value: country.isoCode,
    label: country.name
  }));

  return (
    <AdminLayout>
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <button className="flex items-center gap-2 text-[#222] text-sm mb-8" onClick={() => window.history.back()}>
            <ArrowLeft />
            Back
          </button>
          <h1 className="text-2xl font-bold text-[#222] mb-2">Edit Profile</h1>
          <p className="text-[#666] mb-8">Keep your profile updated so you stand out and get noticed.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="border border-[#E8E8E8] rounded-2xl p-8 flex gap-4 mb-4">
                <div className="w-28 h-28 rounded-full bg-[#F4F4F4] border border-[#BFBFBF] flex items-center justify-center mb-4 overflow-hidden">
                  {form.profilePicturePreview ? (
                    <img
                      src={form.profilePicturePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-[#BFBFBF]">{getInitials()}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">Add Your Profile Photo</p>
                  <p className="text-xs text-[#666] mb-3">A clear photo helps scouts and fans recognize you.</p>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-primary text-primary rounded-full px-5 py-2 bg-white text-sm font-medium hover:bg-blue-50 transition"
                  >
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>
            <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#222] mb-2">First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Phone Number</label>
                <div className="flex items-stretch gap-2">
                  <div className="relative">
                    <select
                      name="phoneCountry"
                      value={form.phoneCountry}
                      onChange={handleChange}
                      className="appearance-none pl-3 pr-8 py-3 border border-[#E8E8E8] rounded-md bg-white text-xs text-[#222] max-w-[90px] h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {getPopularCountries().map(country => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {getCountryFlag(country.isoCode)} {getPhoneCode(country.isoCode)}
                        </option>
                      ))}
                    </select>
                    {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div> */}
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`flex-1 rounded-md border ${errors.phone ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm`}
                    placeholder="Enter phone number"
                  />
                </div>
                {form.phone && (
                  <p className="text-xs text-[#666] mt-1">
                    Complete number: {getFormattedPhoneNumber()}
                  </p>
                )}
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.gender ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm`}
                >
                  <option value="">Select your gender</option>
                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Date of Birth</label>
                <div className="relative">
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${errors.dateOfBirth ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm pr-10`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999]">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8h18M8 3v2m8-2v2m-9 9h6" /></svg>
                  </span>
                </div>
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Nationality</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.country ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm`}
                >
                  <option value="">Select</option>
                  {countryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Primary Position</label>
                <select
                  name="mainPosition"
                  value={form.mainPosition}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.mainPosition ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm`}
                >
                  <option value="">Select</option>
                  {positions.map(position => (
                    <option key={position.value} value={position.value}>{position.label}</option>
                  ))}
                </select>
                {errors.mainPosition && <p className="text-red-500 text-xs mt-1">{errors.mainPosition}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Secondary Position</label>
                <select
                  name="secondaryPosition"
                  value={form.secondaryPosition}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm"
                >
                  <option value="">Select</option>
                  {positions.map(position => (
                    <option key={position.value} value={position.value}>{position.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#222] mb-2">Preferred Foot</label>
                <select
                  name="dominantFoot"
                  value={form.dominantFoot}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.dominantFoot ? 'border-red-500' : 'border-[#E8E8E8]'} bg-white p-3 text-sm`}
                >
                  <option value="">Select</option>
                  {dominantFootOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.dominantFoot && <p className="text-red-500 text-xs mt-1">{errors.dominantFoot}</p>}
              </div>
              <div>
                <label className="block text-[#222] mb-2">Height</label>
                <input
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm"
                  placeholder="E.g 162 cm"
                />
              </div>
              <div>
                <label className="block text-[#222] mb-2">Weight</label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-md border border-[#E8E8E8] bg-white p-3 text-sm"
                  placeholder="E.g 80 kg"
                />
              </div>
              {errors.submit && (
                <div className="col-span-2">
                  <p className="text-red-500 text-sm">{errors.submit}</p>
                </div>
              )}
              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-full w-full text-white px-16 py-3 font-semibold text-base shadow-sm transition ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:opacity-90'
                    }`}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Profile;