import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const FooterAdmin = () => {
    return (
        <footer className="lg:fixed bottom-0 left-0 right-0 bg-white border-t border-[#DFDFDF] py-6 lg:px-8 z-40">
            <div className="px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
                {/* Social Links */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <span className="text-xs md:text-sm text-gray-700">Follow us:</span>
                    <div className="flex gap-3">
                        <a
                            href="https://linkedin.com/Playeer_africa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                        <a
                            href="https://twitter.com/Playeer_africa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter size={18} />
                        </a>
                        <a
                            href="https://instagram.com/Playeer_africa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={18} />
                        </a>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap gap-3 md:gap-6 justify-center md:justify-end w-full md:w-auto">
                    <Link href="/#about" className="text-xs md:text-sm text-gray-700 hover:text-primary transition-colors">
                        About
                    </Link>
                    <Link href="/terms" className="text-xs md:text-sm text-gray-700 hover:text-primary transition-colors">
                        Terms
                    </Link>
                    <Link href="/privacy-policy" className="text-xs md:text-sm text-gray-700 hover:text-primary transition-colors">
                        Privacy
                    </Link>
                    <Link href="mailto:hello@playeer.com" className="text-xs md:text-sm text-gray-700 hover:text-primary transition-colors">
                        Support
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default FooterAdmin;
