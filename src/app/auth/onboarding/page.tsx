'use client'

import HeaderNav from '@/components/HeaderNav';
import React from 'react';

const onboarding = () => {
  return (
    <>
      <HeaderNav scroll={true} />

      <section className='w-[70%] mt-20 bg-white mx-auto rounded-2xl border border-gray p-4'></section>
    </>
  );
};

export default onboarding;