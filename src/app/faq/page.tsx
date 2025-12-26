'use client'

import ContactComp from '@/components/ContactComp';
import FooterNav from '@/components/FooterNav';
import HeaderNav from '@/components/HeaderNav';
import React, { useState } from 'react';

const FAQ_ITEMS = [
    {
        q: 'How does BillPilot work?',
        a: 'BillPilot connects securely to your bill accounts and automates payments on your behalf. Simply link your accounts, set your preferences, and we’ll handle everything automatically - from payment scheduling to sending reminders before due dates.'
    },
    {
        q: 'Is my payment information safe?',
        a: 'Yes — we use bank-grade encryption and store minimal sensitive data. Payments are processed through trusted payment providers and we never share your credentials.'
    },
    {
        q: 'Can I cancel at any time?',
        a: 'You can cancel your subscription anytime from your account settings. Any scheduled payments already processed will follow the payment provider rules.'
    },
    {
        q: 'What types of bills can I automate?',
        a: 'Electricity, water, internet, subscriptions, loan repayments and most recurring bills are supported. If you don’t see a bill provider, contact support and we’ll add it.'
    },
    {
        q: 'How do I contact support?',
        a: 'Use the contact form below or email support@billpilot.example and we’ll respond within 24 hours.'
    }
];

const faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <>
            <HeaderNav scroll />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center my-32">
                    <span className="inline-block bg-[#9810FA]/10 text-[#9810FA] px-3 py-1 rounded-full text-sm font-medium">Frequently Asked Questions</span>
                    <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-[#1F1F1F]">Questions? <br /> We&apos;ve got answers</h2>
                    <p className="mt-2 text-sm text-[#6C6C6C]">Everything you need to know about BillPilot and how it works</p>
                </div>

                <div className="space-y-3">
                    {FAQ_ITEMS.map((item, idx) => {
                        const open = openIndex === idx;
                        return (
                            <div key={idx} className={`bg-white border border-[#EAEAEA] rounded-xl shadow-sm overflow-hidden`}>
                                <button
                                    onClick={() => setOpenIndex(open ? null : idx)}
                                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                                    aria-expanded={open}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1969FE" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /></svg>
                                        </div> */}

                                        <img src="/images/help.svg" alt="" />
                                        <span className="font-bold text-sm sm:text-base">{item.q}</span>
                                    </div>
                                    <div className="text-[#6C6C6C]">{open ? '▴' : '▾'}</div>
                                </button>

                                {open && (
                                    <div className="px-5 pb-5 pt-2 text-sm text-[#6C6C6C]">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            <ContactComp />
            <FooterNav />
        </>
    );
};

export default faq;