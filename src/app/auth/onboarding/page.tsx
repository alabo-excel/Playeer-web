'use client'

import HeaderNav from '@/components/HeaderNav';
import PricingComp from '@/components/PricingComp';
import { Camera } from 'lucide-react';
import React, { useState } from "react";

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    alert("Form submitted: " + JSON.stringify(form));
  };

  return (
    <>
      <HeaderNav scroll={true} />
      <section className={`${step === 3 ? '' : 'lg:w-[55%]'} max-w-7xl my-24 bg-white lg:mx-auto mx-4 bg-[#E5E5E5] rounded-2xl border border-gray p-10`}>
        <form onSubmit={handleSubmit}>
          {/* Step indicators */}
          <div className="flex justify-center mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-1/2 h-2 mx-1 rounded-full ${step >= s ? "bg-primary" : "bg-[#FCFCFC]"}`}
              />
            ))}
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div>
              <div className='lg:w-[40%]'>
                <p className="text-3xl font-bold">Tell Us About You</p>
                <p className='text-sm text-[#6C6C6C] my-3'>This helps scouts and agents understand your football background and current level.</p>
              </div>
              <div className='flex mb-10'>
                <div className='relative'>
                  <div className='w-32 h-32 rounded-full border border-primary bg-[#E5F4FF]'></div>
                  <button className='p-3 absolute top-18 right-0 text-primary rounded-full bg-white'>
                    <Camera />
                  </button>
                </div>
                <div className='my-auto ml-6'>
                  <p className='font-semibold'>Upload Profile Picture</p>
                  <p className='text-sm text-[#5F5F5F]'>Image should be in Jpeg, jpg, png.</p>
                </div>
              </div>
              <div className='grid lg:grid-cols-2 gap-6'>
                <div>
                  <label className='font-semibold mb-2'>Date of Birth</label>
                  <input type="date" className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' />
                </div>
                <div>
                  <label className='font-semibold mb-2'>Country</label>
                  <select className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' >
                    <option className='hidden' value="">Select your country</option>
                  </select>
                </div>
                <div>
                  <label className='font-semibold mb-2'>City</label>
                  <select className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' >
                    <option className='hidden' value="">Enter your city</option>
                  </select>
                </div>
                <div>
                  <label className='font-semibold mb-2'>Gender</label>
                  <select className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' >
                    <option className='hidden' value="">Select gender</option>
                  </select>
                </div>
                <div>
                  <label className='font-semibold mb-2'>Height</label>
                  <input type="text" placeholder='e.g., 178 cm' className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' />
                </div>
                <div>
                  <label className='font-semibold mb-2'>Weight</label>
                  <input placeholder='e.g., 70 kg' type="text" className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className='lg:w-[45%]'>
                <p className="text-3xl font-bold">Your Football Background</p>
                <p className='text-sm text-[#6C6C6C] my-3'>Add your history – academies, local clubs, and competitions you’ve played in.</p>
              </div>
              <div className='grid lg:grid-cols-2 gap-6'>
                <div>
                  <label className='font-semibold mb-2'>Current Team/Academy</label>
                  <input placeholder='e.g., Future Stars Academy' type="text" className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' />
                </div>

                <div>
                  <label className='font-semibold mb-2'>Previous Clubs</label>
                  <input placeholder='List your previous clubs' type="text" className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' />
                </div>

                <div>
                  <label className='font-semibold mb-2'>Years of Experience</label>
                  <input placeholder='e.g., 3 years' type="text" className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' />
                </div>

                <div>
                  <label className='font-semibold mb-2'>Main Position</label>
                  <select className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]'>
                    <option className="hidden">Select</option>
                  </select>
                </div>
                <div className='lg:col-span-2 grid lg:grid-cols-3 gap-6'>
                  <div>
                    <label className='font-semibold mb-2'>Secondary Position</label>
                    <select className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]'>
                      <option className="hidden">Select</option>
                    </select>
                  </div>

                  <div>
                    <label className='font-semibold mb-2'>Dominant Foot</label>
                    <select className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]'>
                      <option className="hidden">Choose one</option>
                    </select>
                  </div>
                  <div>
                    <label className='font-semibold mb-2'>Jersey Number</label>
                    <input type="number" placeholder='Enter Jersey Number' className='p-3 text-[#B6B6B6] rounded-md w-full bg-[#F4F4F4]' />
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <div className='lg:w-[35%]'>
                <p className="text-3xl font-bold">Choose How You Want to Start</p>
                <p className='text-sm text-[#6C6C6C] my-3'>You can begin with the Free plan or unlock full features with a Pro account.</p>
              </div>
              <PricingComp />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-6">

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-20 py-2 rounded-full bg-primary text-white"
              >
                Continue
              </button>
            ) : null}
          </div>
        </form>
      </section>
    </>
  );
};

export default OnboardingForm;