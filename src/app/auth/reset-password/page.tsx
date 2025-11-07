"use client";

import { ArrowLeftIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";
import Modal from "@/components/Modal";

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
    <main className="flex items-center justify-center min-h-screen">
      <div className="lg:w-[50%] mx-auto p-6 flex flex-col">
        <Link href={"/auth/login"}>
          <button className="flex gap-3 text-[#1F1F1F] mb-4">
            <ArrowLeftIcon />
            Back
          </button>
        </Link>
        <img src="/images/logo-colored.png" className="w-40 mb-6" alt="" />

        <p className="text-3xl font-bold text-[#232323]">
          Set a New Password
        </p>
        <p className="text-[#6C6C6C] my-3">Make sure you use a strong password and do not share with anyone.
        </p>

        <div className="my-4">
          <label htmlFor="" className="font-bold mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full text-sm rounded-md p-3 border border-[#DFDFDF] pr-12"
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
              className="w-full text-sm rounded-md p-3 border border-[#DFDFDF] pr-12"
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
          type="button"
          onClick={handleResetPassword}
          className={`w-full rounded-full p-3 my-4 flex justify-center items-center min-h-[48px] transition-colors duration-200
                bg-primary text-[#FCFCFC]`}
          disabled={loading}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

          ) : "Update Password"}
        </button>
        {error && (
          <p className="text-[#991616] text-xs mb-2 text-center">{error}</p>
        )}

        <div className="flex justify-center">
          <p className="text-[#6C6C6C] mr-2">Remembered password?</p>
          <Link href={"/auth/login"}>
            <span className="text-primary">Login</span>
          </Link>
        </div>
        {/* <Link href={"/auth/login"}>
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
        </div> */}
      </div>
      {show && <Modal width="400px">
        <div className="text-center">
          <img src="/images/icons/success-1.svg" className="mx-auto" alt="" />
          <h2 className="font-bold my-4 text-xl">Password updated successfully</h2>
          <p className="text-[#5A5A5A] mb-3">You can now log in with the new password and don’t share your password with anyone.</p>
          <Link href={"/auth/login"}>
            <button className="bg-[#F2F2F2] p-3 w-full rounded-full">
              Login
            </button>
          </Link>
        </div>
      </Modal>}
    </main>

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
