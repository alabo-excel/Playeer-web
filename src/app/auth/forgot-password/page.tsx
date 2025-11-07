"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import api from "@/utils/api";
import Modal from "@/components/Modal";

const forgotPassword = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async () => {
    setError(null);
    // Simple email validation
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setShow(true);
    } catch (err: any) {
      let errorMsg = "Failed to send reset link. Please try again.";
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
          Reset Your Password
        </p>
        <p className="text-[#6C6C6C] my-3">
          Enter your email and we’ll send you reset instructions.
        </p>

        <div className="my-4">
          <label htmlFor="" className=" mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full rounded-md text-sm p-3 border border-[#DFDFDF]"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="button"
          onClick={handleForgotPassword}
          className={`w-full rounded-full p-3 my-4 flex justify-center items-center min-h-[48px] transition-colors duration-200
                bg-primary text-[#FCFCFC]`}
          disabled={loading}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : "Send Reset Link"}
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
      </div>

      {show && <Modal width="400px">
        <div className="text-center">
          <img src="/images/icons/success.svg" className="mx-auto" alt="" />
          <h2 className="font-bold my-4 text-xl">Check Email Address</h2>
          <p className="text-[#5A5A5A] mb-3">If that email exists in our system, we’ve sent you reset instructions.</p>
          <Link href={"/auth/login"}>
            <button className="bg-[#F2F2F2] p-3 w-full rounded-full">
              Continue
            </button>
          </Link>
        </div>
      </Modal>}
    </main>
  );
};

export default forgotPassword;
