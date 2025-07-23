import React, { useState, useRef, useEffect } from "react";
import Modal from "../Modal";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/store/user";
import api from "@/utils/api";
import { Country, City } from "country-state-city";
import { positions } from "@/utils/positions";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];
const dominantFootOptions = [
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
  { label: "Both", value: "both" },
];
const secondaryPositionOptions = positions

const EditProfile = ({ show, onClose }: { show: boolean; onClose: any }) => {
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
  const [cities, setCities] = useState<{ name: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "country") {
      setForm((prev) => ({ ...prev, city: "" }));
      const countryObj = countries.find((c) => c.isoCode === value);
      if (countryObj) {
        setCities(City.getCitiesOfCountry(countryObj.isoCode) || []);
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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.height) newErrors.height = "Height is required";
    if (!form.weight) newErrors.weight = "Weight is required";
    if (!form.currentTeam) newErrors.currentTeam = "Current team is required";
    if (!form.previousClub)
      newErrors.previousClub = "Previous club is required";
    if (!form.yearsOfExperience)
      newErrors.yearsOfExperience = "Years of experience is required";
    if (!form.mainPosition)
      newErrors.mainPosition = "Main position is required";
    if (!form.secondaryPosition)
      newErrors.secondaryPosition = "Secondary position is required";
    if (!form.dominantFoot)
      newErrors.dominantFoot = "Dominant foot is required";
    if (!form.jerseyNumber)
      newErrors.jerseyNumber = "Jersey number is required";
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
      <form onSubmit={handleSubmit}>
        <p className="text-lg font-bold mb-4">Edit Profile</p>
        <div className="mb-4 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border border-primary bg-[#E5F4FF] overflow-hidden flex items-center justify-center">
            {form.profilePicturePreview ? (
              <img
                src={form.profilePicturePreview}
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
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="py-2 px-4 mt-2 text-primary rounded-full bg-white border"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Photo
          </button>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
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
          </div>

          <div>
            <label className="font-semibold mb-2 text-sm">Date of Birth</label>
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
            <label className="font-semibold mb-2 text-sm">Country</label>
            <select
              name="country"
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
              value={form.country}
              onChange={handleChange}
            >
              <option className="hidden" value="">
                Select your country
              </option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country}</p>
            )}
          </div>
          <div>
            <label className="font-semibold mb-2 text-sm">City</label>
            <select
              name="city"
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
              value={form.city}
              onChange={handleChange}
              disabled={!form.country}
            >
              <option className="hidden" value="">
                Enter your city
              </option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="font-semibold mb-2 text-sm">Gender</label>
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
            <label className="font-semibold mb-2 text-sm">Height</label>
            <input
              name="height"
              value={form.height}
              onChange={handleChange}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.height && (
              <p className="text-red-500 text-xs mt-1">{errors.height}</p>
            )}
          </div>
          <div>
            <label className="font-semibold mb-2 text-sm">Weight</label>
            <input
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="p-3 rounded-md w-full bg-[#F4F4F4]"
            />
            {errors.weight && (
              <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
            )}
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <label className="font-semibold mb-2 text-sm">Main Position</label>
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
          <div>
            <label className="font-semibold mb-2 text-sm">
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
            <label className="font-semibold mb-2 text-sm">Dominant Foot</label>
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
          <div>
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
          </div>
        </div>
        {apiError && <p className="text-red-500 text-xs mt-2">{apiError}</p>}
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-full mt-4 text-sm"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
};

export default EditProfile;
