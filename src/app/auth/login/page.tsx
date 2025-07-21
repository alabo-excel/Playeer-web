"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      if (res.data?.data.token) {
        localStorage.setItem("token", res.data.data.token);
      }
      if (res.data?.data.isVerified) {
        router.push("/user/dashboard");
      } else {
        router.push("/auth/onboarding");
      }
    } catch (err: any) {
      setApiError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <>
        <form onSubmit={handleSubmit}>
          <div className="lg:w-[70%] mx-auto border border-gray rounded-3xl p-6">
            <p className="text-3xl font-bold text-[#232323]">
              Welcome Back to Playeer
            </p>
            <p className="text-[#6C6C6C] my-3">
              Log in to your dashboard to update your profile, upload videos,
              and connect with scouts and clubs ready to discover talent like
              yours.
            </p>

            <div className="my-4">
              <label htmlFor="email" className="font-bold mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="text"
                className="w-full rounded-md text-sm p-3 bg-[#F4F4F4]"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="my-4">
              <label htmlFor="password" className="font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full text-sm rounded-md p-3 bg-[#F4F4F4] pr-12"
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
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* {apiError && <p className="text-red-500 text-xs mt-2">{apiError}</p>} */}
            {apiError && (
              <div className="p-2 border border-[#FBBC05] bg-[#FFF8E6] text-[#644B02] rounded-md">
                <p>{apiError}</p>
              </div>
            )}
            <div>
              <Link href={"/auth/forgot-password"}>
                <p className="text-right text-[#6C6C6C] text-sm">
                  Forgot Password?
                </p>
              </Link>
            </div>

            <button
              type="submit"
              className="bg-primary w-full rounded-full text-[#FCFCFC] p-3 my-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="border-b border-gray mb-6">
              <p className="text-center -mb-3 bg-[#F8F8F8] w-10 mx-auto">or</p>
            </div>
            <div className="flex justify-between mb-4">
              <button className="flex justify-center text-[#202426] p-3 border border-gray rounded-full w-[48%]">
                <img className="mr-2" src="/images/icons/google.png" alt="" />
                <span className="my-auto">Google</span>
              </button>
              <button className="flex p-3 border justify-center text-[#202426] border-gray rounded-full w-[48%]">
                <img src="/images/icons/apple.png" className="mr-2" alt="" />
                <span className="my-auto">Apple</span>
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-[#6C6C6C] mr-2">Don’t have an account?</p>
              <Link href={"/auth/signup"}>
                <span className="text-primary">Create one now</span>{" "}
              </Link>
            </div>
          </div>
        </form>
      </>
    </AuthLayout>
  );
};

export default LoginPage;
