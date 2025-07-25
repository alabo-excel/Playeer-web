"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Spin } from "antd";

import api from "@/utils/api";

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
    <AuthLayout>
      <>
        {show ? (
          <div className="lg:w-[70%] mx-auto border border-gray rounded-3xl p-6">
            <p className="text-3xl font-bold text-[#232323]">
              Check Your Inbox
            </p>
            <p className="text-[#6C6C6C] my-3">
              Check your inbox, spam or junk folder we've sent a secure link to
              your email. Follow the instructions to create a new password.
            </p>

            <button className="bg-primary w-full rounded-full text-[#FCFCFC] p-3 my-4">
              Resend Email
            </button>

            <Link href={"/auth/login"}>
              <button className="text-primary flex justify-center w-full rounded-full bg-[#E5F4FF] p-3 mb-4">
                <ArrowLeftIcon />
                <span className="ml-3">Back to Login</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="lg:w-[70%] mx-auto border border-gray rounded-3xl p-6">
            <p className="text-3xl font-bold text-[#232323]">
              Reset Your Password
            </p>
            <p className="text-[#6C6C6C] my-3">
              Don’t worry — it happens to the best of us. Enter the email linked
              to your account and we’ll send you instructions to reset your
              password.
            </p>

            <div className="my-4">
              <label htmlFor="" className="font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full rounded-md text-sm p-3 bg-[#F4F4F4]"
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
                ${loading ? 'border border-primary bg-[#E5F4FF] text-primary' : 'bg-primary text-[#FCFCFC]'}`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Spin size="small" style={{ color: '#0095FF' }} />
                </span>
              ) : "Send Reset Link"}
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

export default forgotPassword;
