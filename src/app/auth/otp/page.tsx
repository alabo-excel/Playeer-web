"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import api from "@/utils/api";
import { Spin } from "antd";
import React, { Suspense, useEffect, useState } from "react";

const OtpContent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setEmail(params.get("email") || "");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      api.post("/auth/otp-verify", { email, otp }).then((res) => {
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
        }
        window.location.href = "/auth/onboarding";
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthLayout>
      <>
        <div className="lg:w-[70%] mx-auto border border-gray rounded-3xl p-6">
          <p className="text-3xl font-bold text-[#232323]">Verify Your OTP</p>
          <p className="text-[#6C6C6C] my-3">Enter the OTP sent to {email}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray rounded-full p-3 my-4"
            />

            <button
              type="submit"
              className={`w-full rounded-full p-3 my-4 flex justify-center items-center min-h-[48px] transition-colors duration-200
                            ${
                              loading
                                ? "border border-primary bg-[#E5F4FF] text-primary"
                                : "bg-primary text-[#FCFCFC]"
                            }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Spin size="small" style={{ color: "#0095FF" }} />
                </span>
              ) : (
                "Submit"
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
