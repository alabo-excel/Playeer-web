'use client'


import ContactComp from '@/components/ContactComp';
import FooterNav from '@/components/FooterNav';
import HeaderNav from '@/components/HeaderNav';
import React from 'react';

const terms = () => {
    return (
        <>
            <HeaderNav scroll />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose max-w-none">
                    <div className="w-full" style={{ aspectRatio: '16/9' }}>
                        <iframe
                            title="Playeer Terms"
                            src="https://docs.google.com/document/d/1r5OyVzV8Y3mm0hO3Lidw-KByQhReCrGv/preview"
                            className="w-full h-full"
                        />
                    </div>

                    {/* <p className="text-sm text-[#6C6C6C] mt-4">If the document doesn't load, open it directly: <a href="https://docs.google.com/document/d/1r5OyVzV8Y3mm0hO3Lidw-KByQhReCrGv/edit" target="_blank" rel="noreferrer" className="text-primary">View Terms on Google Docs</a></p> */}
                </div>
            </main>
            <ContactComp />
            <FooterNav />
        </>
    );
};

export default terms;