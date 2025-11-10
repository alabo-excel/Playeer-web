import React, { useState, useRef, useEffect } from "react";
import { Spin } from "antd";
import Modal from "../Modal";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/store/user";
import api from "@/utils/api";
import { Country, City, State } from "country-state-city";
import { positions } from "@/utils/positions";
import Select from "react-select";
import { div } from "framer-motion/client";

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

const EditProfile = ({ show, onClose }: { show: boolean| undefined; onClose: any }) => {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    dateOfBirth: user?.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
      : "",
    country: user?.country || "",
    city: user?.city || "",
    gender: user?.gender || "",
    address: user?.address || "",
    height: user?.height || "",
    weight: user?.weight || "",
    currentTeam: user?.currentTeam || "",
    previousClub: user?.previousClub || "",
    yearsOfExperience: user?.yearsOfExperience || "",
    mainPosition: user?.mainPosition || "",
    secondaryPosition: user?.secondaryPosition || "",
    dominantFoot: user?.dominantFoot || "",
    jerseyNumber: user?.jerseyNumber || "",
    profilePicture: null as File | null,
    profilePicturePreview: user?.profilePicture || "",
  });

  useEffect(() => {
    setForm({
      fullName: user?.fullName || "",
      dateOfBirth: user?.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
        : "",
      country: user?.country || "",
      address: user?.address || "",
      city: user?.city || "",
      gender: user?.gender || "",
      height: user?.height || "",
      weight: user?.weight || "",
      currentTeam: user?.currentTeam || "",
      previousClub: user?.previousClub || "",
      yearsOfExperience: user?.yearsOfExperience || "",
      mainPosition: user?.mainPosition || "",
      secondaryPosition: user?.secondaryPosition || "",
      dominantFoot: user?.dominantFoot || "",
      jerseyNumber: user?.jerseyNumber || "",
      profilePicture: null as File | null,
      profilePicturePreview: user?.profilePicture || "",
    });
  }, [user]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any
  ) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "weight") {
      // Remove any existing "kg" and append it freshly
      formattedValue = value.replace(/kg/g, "").trim() + " kg";
    }

    if (name === "height") {
      // Remove any existing "cm" and append it freshly
      formattedValue = value.replace(/cm/g, "").trim() + " cm";
    }

    setForm((prev) => ({ ...prev, [name]: formattedValue }));

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        profilePicture: file,
        profilePicturePreview: URL.createObjectURL(file),
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
    // if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.country) newErrors.country = "Country is required";
    // if (!form.city) newErrors.city = "City is required";
    // if (!form.address) newErrors.address = "Address is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.height) newErrors.height = "Height is required";
    if (!form.weight) newErrors.weight = "Weight is required";
    // if (!form.currentTeam) newErrors.currentTeam = "Current team is required";
    // if (!form.previousClub) newErrors.previousClub = "Previous club is required";
    // if (!form.yearsOfExperience) newErrors.yearsOfExperience = "Years of experience is required";
    if (!form.mainPosition) newErrors.mainPosition = "Main position is required";
    if (!form.secondaryPosition) newErrors.secondaryPosition = "Secondary position is required";
    if (!form.dominantFoot) newErrors.dominantFoot = "Dominant foot is required";
    // if (!form.jerseyNumber) newErrors.jerseyNumber = "Jersey number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "profilePicture" && value) {
          formData.append(key, value as File);
        } else if (key !== "profilePicturePreview") {
          formData.append(key, value as string);
        }
      });
      formData.append("userId", user?._id || "");
      const res = await api.put("/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data?.data || res.data?.user || res.data);
      onClose();
    } catch (err: any) {
      setApiError(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="">
        <p className="text-lg font-bold">Help us personalize your experience</p>
        <p>Showcase your skills and get discovered worldwide.</p>
        <div className="my-4 flex gap-4 items-center">
          <div className="w-32 h-32 rounded-full border border-primary bg-[#E5F4FF] overflow-hidden flex items-center justify-center">
            {form.profilePicturePreview ? (
              <img
                src={form.profilePicturePreview}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="border border-[#BFBFBF] bg-[#F4F4F4] w-full h-full flex items-center justify-center text-3xl font-bold text-[#BFBFBF]">
                {(() => {
                  const names = form.fullName.trim().split(" ");
                  const first = names[0]?.[0] || "";
                  const last = names.length > 1 ? names[names.length - 1][0] : "";
                  return (first + last).toUpperCase();
                })()}
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="profile-photo-input"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div>
            <p className="font-bold text-sm">Add Your Profile Photo</p>
            <p className="text-xs">A clear photo helps scouts and fans recognize you.</p>
            <button
              type="button"
              className="py-2 px-4 mt-2 text-primary rounded-full bg-white border"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Photo
            </button>
          </div>

        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {/* <div>
            <label className="font-semibold mb-2 text-sm">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div> */}
          <div>
            <label className=" mb-2 text-sm">Gender</label>
            <select
              name="gender"
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
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
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
          <div>
            <label className=" mb-2 text-sm">Date of Birth</label>
            <input
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
          <div>
            <label className=" mb-2 text-sm">Nationality</label>

            <Select
              name="country"
              isSearchable
              options={countryOptions}
              styles={{
                control: (base) => ({
                  ...base,
                  border: "none",
                  backgroundColor: "#F4F4F4",
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
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country}</p>
            )}
          </div>

          {/* <div>
            <label className="font-semibold mb-2 text-sm">State</label>
            
            <Select
              name="city"
              options={cityOptions}
              className="w-full p-1 placeholder:text-[#B6B6B6] rounded-md bg-[#F4F4F4]"
              placeholder="Enter your state"
              value={cityOptions.find((option) => option.value === form.city)}
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
                  border: "none",
                  backgroundColor: "#F4F4F4",
                }),
              }}
              isDisabled={!form.country}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div> */}

          {/* <div className="col-span-2">
            <label className="font-semibold mb-2 text-sm">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              placeholder="Enter your address"
              className="p-3 placeholder:text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div> */}
          <div>
            <label className=" mb-2 text-sm">Primary Position</label>
            <select
              name="mainPosition"
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
              value={form.mainPosition}
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
            {errors.mainPosition && (
              <p className="text-red-500 text-xs mt-1">{errors.mainPosition}</p>
            )}
          </div>


          {/* <div>
            <label className="font-semibold mb-2 text-sm">Current Team</label>
            <input
              name="currentTeam"
              value={form.currentTeam}
              onChange={handleChange}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.currentTeam && (
              <p className="text-red-500 text-xs mt-1">{errors.currentTeam}</p>
            )}
          </div>
          <div>
            <label className="font-semibold mb-2 text-sm">Previous Club</label>
            <input
              name="previousClub"
              value={form.previousClub}
              onChange={handleChange}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.previousClub && (
              <p className="text-red-500 text-xs mt-1">{errors.previousClub}</p>
            )}
          </div> */}
          {/* <div>
            <label className="font-semibold mb-2 text-sm">
              Years of Experience
            </label>
            <input
              name="yearsOfExperience"
              value={form.yearsOfExperience}
              onChange={handleChange}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.yearsOfExperience && (
              <p className="text-red-500 text-xs mt-1">
                {errors.yearsOfExperience}
              </p>
            )}
          </div> */}

          <div>
            <label className=" mb-2 text-sm">
              Secondary Position
            </label>
            <select
              name="secondaryPosition"
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
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
            {errors.secondaryPosition && (
              <p className="text-red-500 text-xs mt-1">
                {errors.secondaryPosition}
              </p>
            )}
          </div>
          <div>
            <label className=" mb-2 text-sm">Prefered Foot</label>
            <select
              name="dominantFoot"
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
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
            {errors.dominantFoot && (
              <p className="text-red-500 text-xs mt-1">{errors.dominantFoot}</p>
            )}
          </div>
          {/* <div>
            <label className="font-semibold mb-2 text-sm">Jersey Number</label>
            <input
              name="jerseyNumber"
              value={form.jerseyNumber}
              onChange={handleChange}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.jerseyNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.jerseyNumber}</p>
            )}
          </div> */}
          <div>
            <label className=" mb-2 text-sm">Height</label>
            <input
              name="height"
              value={form.height}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.height && (
              <p className="text-red-500 text-xs mt-1">{errors.height}</p>
            )}
          </div>
          <div>
            <label className=" mb-2 text-sm">Weight</label>
            <input
              name="weight"
              value={form.weight}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.weight && (
              <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
            )}
          </div>

        </div>
        {apiError && <p className="text-red-500 text-xs mt-2">{apiError}</p>}
        <button
          type="submit"
          className={`w-full rounded-full p-3 my-4 min-h-[48px] transition-colors duration-200
            bg-primary text-[#FCFCFC]
            
          `}
          disabled={loading}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

          ) : (
            <span className="my-auto">Save</span>
          )}
        </button>
      </form>
    </Modal>
  );
};

export default EditProfile;
