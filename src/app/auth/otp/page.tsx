"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import api from "@/utils/api";
import { Spin } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/user";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const OtpContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const [email, setEmail] = useState<string>("");
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setEmail(params.get("email") || "");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const otp = otpDigits.join("");
    try {
      api.post("/auth/otp-verify", { email, otp }).then((res) => {
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
          setUser(res.data.data);
        }
        window.location.href = "/auth/onboarding";
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Handle OTP input change and focus
  const handleOtpChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[idx] = value;
    setOtpDigits(newOtp);
    // Move to next box if value entered
    if (value && idx < 5) {
      const nextInput = document.getElementById(`otp-box-${idx + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };
  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
      const prevInput = document.getElementById(`otp-box-${idx - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  return (
    <AuthLayout>
      <>
        <div className="lg:w-[60%] mx-auto  p-6">
          <Link href={"/auth/signup"}>
            <button className="flex gap-3 text-[#1F1F1F] mb-4">
              <ArrowLeftIcon />
              Back
            </button>
          </Link>
          <p className="text-3xl font-bold text-[#232323]">Enter Verification Code</p>
          <p className="text-[#6C6C6C] my-3">
            Enter the 6-digit code we sent to your email ({email}).
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-2 my-4">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-box-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(e.target.value, idx)}
                  onKeyDown={e => handleOtpKeyDown(e, idx)}
                  className="w-12 h-12 text-center text-xl border border-gray rounded-lg focus:border-primary outline-none"
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              className={`w-full rounded-full p-3 my-4 flex justify-center items-center min-h-[48px] transition-colors duration-200 bg-primary text-[#FCFCFC]
                            `}
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify & Continue"
              )}
            </button>
          </form>
        </div>
      </>
    </AuthLayout>
  );
};

const otp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpContent />
    </Suspense>
  );
};

export default otp;
