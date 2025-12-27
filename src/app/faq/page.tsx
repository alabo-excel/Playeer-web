'use client'

import ContactComp from '@/components/ContactComp';
import FooterNav from '@/components/FooterNav';
import HeaderNav from '@/components/HeaderNav';
import React, { useState } from 'react';

const FAQ_ITEMS = [
    {
        q: 'What is Playeer?',
        a: 'Playeer is a digital platform that helps football players showcase their talent and get discovered by scouts and clubs.'
    },
    {
        q: 'Who can use Playeer?',
        a: 'Playeer is built for grassroots and semi professional footballers, especially young players across Africa.'
    },
    {
        q: 'Is Playeer free to use?',
        a: 'Yes. Players can create a basic profile for free, with optional paid plans for more visibility.'
    },
    {
        q: 'How does Playeer help players get noticed?',
        a: 'Players upload their profile, match highlights, stats, and position details so scouts can find them easily.'
    },
    {
        q: 'Do I need an agent to use Playeer?',
        a: 'No. Playeer allows players to present themselves directly without needing an agent.'
    },
    {
        q: 'Is Playeer only for African players?',
        a: 'Playeer is starting in Africa but is open to players and scouts globally.'
    },
    {
        q: 'Are scouts and clubs verified on Playeer?',
        a: 'Yes. All scouts and clubs will go through a verification process before accessing player data.'
    },
    {
        q: 'Can young players under 18 join Playeer?',
        a: 'Yes. Under 18 players can join with parental or guardian consent.'
    },
    {
        q: 'How much does the premium plan cost?',
        a: 'The Rising Star plan costs ₦5,000 or $5 monthly, while the Pro Player plan costs ₦50,000 or $50 yearly.'
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