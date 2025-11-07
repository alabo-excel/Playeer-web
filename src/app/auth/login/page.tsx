"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/user";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const setUser = useSetAtom(userAtom);
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

      // console.log(res.data)

      if (res.data?.data) {
        setUser(res.data.data);
      }
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
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
      <form className="lg:w-[70%]" onSubmit={handleSubmit}>
        <div className="mx-auto p-6">
          <p className="text-3xl font-bold text-[#232323]">
            Welcome Back to Playeer
          </p>
          <p className="text-[#6C6C6C] my-3">
            Log in to continue discovering and showcasing talent.
          </p>

          <div className="my-4">
            <label htmlFor="email" className="mb-2">
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
          <div className="my-4">
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

          {/* {apiError && <p className="text-red-500 text-xs mt-2">{apiError}</p>} */}
          {apiError && (
            <div className="p-2 border border-[#FBBC05] bg-[#FFF8E6] text-[#644B02] rounded-md">
              <p>{apiError}</p>
            </div>
          )}
          <div>
            <Link href={"/auth/forgot-password"}>
              <p className="text-right text-[#6C6C6C] underline text-sm">
                Forgot Password?
              </p>
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full rounded-full p-3 my-4 flex justify-center items-center min-h-[48px] transition-colors duration-200
                bg-primary text-[#FCFCFC]`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "Login"}
          </button>
          {/* <div className="border-b border-gray mb-6">
            <p className="text-center -mb-3 bg-[#F8F8F8] w-10 mx-auto">or</p>
          </div> */}
          {/* <div className="flex justify-center mb-4">
              <button className="flex justify-center text-[#202426] p-3 border border-gray rounded-full w-full">
                <img className="mr-2" src="/images/icons/google.png" alt="" />
                <span className="my-auto">Google</span>8
              </button>
              <button className="flex p-3 border justify-center text-[#202426] border-gray rounded-full w-[48%]">
                <img src="/images/icons/apple.png" className="mr-2" alt="" />
                <span className="my-auto">Apple</span>
              </button>
            </div> */}
          <div className="flex justify-center">
            <p className="text-[#6C6C6C] mr-2">Don’t have an account?</p>
            <Link href={"/auth/signup"}>
              <span className="text-primary">Sign Up Free</span>{" "}
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
