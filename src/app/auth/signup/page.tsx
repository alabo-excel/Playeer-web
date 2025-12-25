"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Spin } from "antd";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { Country } from "country-state-city";

const signup = () => {
  const router = useRouter();
  const [countries] = useState(Country.getAllCountries());
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    phoneCountry: "NG", // Default to Nigeria
    agree: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.firstName.trim()) newErrors.fullname = "first name is required";

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneDigits = form.phone.replace(/\D/g, '');
      if (phoneDigits.length < 7) {
        newErrors.phone = "Phone number is too short";
      } else if (phoneDigits.length > 15) {
        newErrors.phone = "Phone number is too long";
      }
    }

    if (!form.lastName.trim()) newErrors.username = "Last Name is required";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.password || form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!form.agree) newErrors.agree = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.currentTarget as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    // Special handling for phone number to limit digits
    if (name === "phone") {
      // Remove all non-digit characters to count actual digits
      const digits = value.replace(/\D/g, '');
      // Limit to 15 digits (international standard)
      if (digits.length > 15) return;

      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post("/auth/register", {
        fullName: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: getFormattedPhoneNumber(), // Send formatted phone with country code
        password: form.password,
      });
      router.push("/auth/otp?email=" + form.email);
    } catch (err: any) {
      setApiError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form className="lg:w-[70%]" onSubmit={handleSubmit}>
        <div className=" mx-auto p-6">
          <h2 className="text-3xl font-bold">Join Playeer Today</h2>
          <p className="text-[#6C6C6C] my-3">
            Showcase your skills and get discovered worldwide.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* <button type="button" className="flex justify-center text-[#202426] p-3 border border-gray rounded-full w-full">
              <img className="mr-2" src="/images/icons/google.png" alt="" />
              <span className="my-auto">Google</span>
            </button> */}
            {/* <button type="button" className="flex p-3 border justify-center text-[#202426] border-gray rounded-full w-full">
              <img src="/images/icons/apple.png" className="mr-2" alt="" />
              <span className="my-auto">Apple</span>
            </button> */}
          </div>
          {/* <div className="border-b border-gray mb-6">
            <p className="text-center -mb-3 bg-[#F8F8F8] w-10 mx-auto">or</p>
          </div> */}
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="firstName" className="mb-2">
                First name
              </label>
              <input
                name="firstName"
                type="text"
                className={`w-full rounded-md text-sm p-3 border ${errors.fullname ? 'border-[#991616] text-[#991616]' : 'border-[#DFDFDF]'}`}
                placeholder="Enter First name"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.fullname && (
                <p className="text-[#991616] text-xs mt-1">{errors.fullname}</p>
              )}
            </div>
            <div className="">
              <label htmlFor="lastName" className="mb-2">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className={`w-full rounded-md text-sm p-3 border ${errors.username ? 'border-[#991616] text-[#991616]' : 'border-[#DFDFDF]'}`}
                placeholder="Enter Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-[#991616] text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div className="">
              <label htmlFor="email" className=" mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="text"
                className={`w-full rounded-md text-sm p-3 border ${errors.email ? 'border-[#991616] text-[#991616]' : 'border-[#DFDFDF]'}`}
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-[#991616] text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="">
              <label htmlFor="username" className=" mb-2">
                Phone Number
              </label>
              <div className="flex items-stretch gap-2">
                <div className="relative">
                  <select
                    name="phoneCountry"
                    value={form.phoneCountry}
                    onChange={handleChange}
                    className="appearance-none pl-3 pr-8 py-3 border border-[#DFDFDF] rounded-md bg-white text-xs text-[#222] max-w-[90px] h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  type="tel"
                  className={`flex-1 rounded-md text-sm p-3 border ${errors.phone ? 'border-[#991616] text-[#991616]' : 'border-[#DFDFDF]'}`}
                  placeholder="Enter Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              {form.phone && (
                <p className="text-xs text-[#666] mt-1">
                  Complete number: {getFormattedPhoneNumber()}
                </p>
              )}
              {errors.phone && (
                <p className="text-[#991616] text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="">
              <label htmlFor="password" className=" mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`w-full text-sm rounded-md p-3 border pr-12 ${errors.password ? 'border-[#991616] text-[#991616]' : 'border-[#DFDFDF]'}`}
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#6C6C6C]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#6C6C6C]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#991616] text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="">
              <label htmlFor="password" className=" mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className={`w-full text-sm rounded-md p-3 border pr-12 ${errors.confirmPassword ? 'border-[#991616] text-[#991616]' : 'border-[#DFDFDF]'}`}
                  placeholder="Enter Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#6C6C6C]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#6C6C6C]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#991616] text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex my-4">
            <input
              name="agree"
              type="checkbox"
              className="mr-3 border border-primary mb-auto w-4 h-4 accent-primary"
              checked={form.agree}
              onChange={handleChange}
            />
            <p className="text-[#6C6C6C] text-sm">
              I agree to Playeer’s <Link href="/terms" className="font-semibold underline">Terms</Link> & <Link href="/privacy-policy" className="font-semibold underline">Privacy Policy</Link>
            </p>
          </div>
          {errors.agree && (
            <p className="text-[#991616] text-xs mt-1">{errors.agree}</p>
          )}

          {apiError && (
            <div className="p-2 border border-[#FBBC05] bg-[#FFF8E6] text-[#644B02] rounded-md">
              <p>{apiError}</p>
            </div>
          )}

          {/* {apiError && (
              <p className="text-red-500 text-xs mt-2"></p>
            )} */}

          {/* <Link href={'/auth/onboarding'}> */}
          <button
            type="submit"
            className={`w-full rounded-full p-3 my-4 flex justify-center items-center min-h-[48px] transition-colors duration-200
                bg-primary text-[#FCFCFC]
              `}
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create a Free Account"
            )}
          </button>
          {/* </Link> */}

          <div className="flex justify-center">
            <p className="text-[#6C6C6C] mr-2">Already have an account?</p>
            <Link href={"/auth/login"}>
              <span className="text-primary">Login</span>
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default signup;
