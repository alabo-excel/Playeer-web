"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { ArrowLeftIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";

const ResetPasswordContent = () => {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async () => {
    setError(null);
    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid or missing token.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, newPassword: password });
      setShow(true);
    } catch (err: any) {
      let errorMsg = "Failed to reset password. Please try again.";
      if (err?.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err?.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <>
        {show ? (
          <div className="lg:w-[70%] mx-auto border border-gray rounded-3xl p-6">
            <p className="text-3xl font-bold text-[#232323]">
              Password Reset Successful
            </p>
            <p className="text-[#6C6C6C] my-3">
              Your password has been updated. You can now log in to your account
              with your new credentials.
            </p>

            <Link href={"/auth/login"}>
              <button className="bg-primary w-full rounded-full text-[#FCFCFC] p-3 my-4">
                Login to My Account
              </button>
            </Link>
          </div>
        ) : (
          <div className="lg:w-[70%] mx-auto border border-gray rounded-3xl p-6">
            <p className="text-3xl font-bold text-[#232323]">
              Create a New Password
            </p>
            <p className="text-[#6C6C6C] my-3">
              Enter a new password for your account. Make sure it’s strong and
              something you’ll remember.
            </p>

            <div className="my-4">
              <label htmlFor="" className="font-bold mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full text-sm rounded-md p-3 bg-[#F4F4F4] pr-12"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
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
            </div>
            <div className="my-4">
              <label htmlFor="" className="font-bold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full text-sm rounded-md p-3 bg-[#F4F4F4] pr-12"
                  placeholder="Enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
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
            </div>

            <button
              onClick={handleResetPassword}
              className="bg-primary w-full rounded-full text-[#FCFCFC] p-3 my-4"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {error && (
              <p className="text-red-500 text-xs mb-2 text-center">{error}</p>
            )}
            <Link href={"/auth/login"}>
              <button className="text-primary flex justify-center w-full rounded-full bg-[#E5F4FF] p-3 mb-4">
                <ArrowLeftIcon />
                <span className="ml-3">Back to Login</span>
              </button>
            </Link>
            <div className="flex justify-center">
              <p className="text-[#6C6C6C] mr-2">Need help?</p>
              <a href="mailto:hello@playeer.africa">
                <span className="text-primary">Contact Support</span>
              </a>
            </div>
          </div>
        )}
      </>
    </AuthLayout>
  );
};

const resetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default resetPassword;
