import api from '@/utils/api';
import React, { useState } from 'react';

type Props = {
    isOpen?: boolean;
    onClose?: () => void;
    playerId?: string;
};

const PlayerEnquiry: React.FC<Props> = ({ isOpen = false, onClose, playerId }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [inquiryType, setInquiryType] = useState("");
    const [designation, setDesignation] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    if (!isOpen) return null;

    const validate = () => {
        const e: { [key: string]: string } = {};
        if (!name.trim()) e.name = "Name is required";
        if (!email.trim()) e.email = "Email is required";
        if (!inquiryType) e.inquiryType = "Please select an inquiry type";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setLoading(true);
            setErrors({});
            // Lazy import api to match project helper
            const payload = {
                name,
                email,
                phone,
                inquiryType,
                designation,
                message,
                playerId: playerId || null,
            } as any;

            await api.post('/player-enquiries', payload);
            // Close modal on success
            if (onClose) onClose();
            // reset
            setName(""); setEmail(""); setPhone(""); setInquiryType(""); setDesignation(""); setMessage("");
        } catch (err: any) {
            let msg = 'Failed to submit enquiry';
            if (err?.response?.data?.message) msg = err.response.data.message;
            setErrors({ submit: msg });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
                aria-hidden
            />

            <div className="relative w-[900px] max-w-[95%] bg-white rounded-2xl shadow-lg p-8">
                <button
                    className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="h-4 w-4 text-gray-700"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-extrabold mb-6">Player Inquiry</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600 block mb-2">Name</label>
                            <input value={name} onChange={(ev) => setName(ev.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" placeholder="Enter Name" />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 block mb-2">Email</label>
                            <input value={email} onChange={(ev) => setEmail(ev.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" placeholder="Email Address" />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-2">Phone</label>
                            <input value={phone} onChange={(ev) => setPhone(ev.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" placeholder="Phone Number" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 block mb-2">Inquiry Type</label>
                            <select value={inquiryType} onChange={(ev) => setInquiryType(ev.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white">
                                <option value="">Select</option>
                                <option value="player_signing">Player Signing</option>
                                <option value="negotiations">Negotiations</option>
                                <option value="more_information">More Information</option>
                                <option value="expression_of_interest">Expression of Interest</option>
                                <option value="others">Others</option>
                            </select>
                            {errors.inquiryType && <p className="text-xs text-red-500 mt-1">{errors.inquiryType}</p>}
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-2">Designation</label>
                            <select value={designation} onChange={(ev) => setDesignation(ev.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white">
                                <option value="">Select</option>
                                <option value="agent">Agent</option>
                                <option value="scout">Scout</option>
                                <option value="club">Club</option>
                                <option value="academy">Academy</option>
                                <option value="coach">Coach</option>
                                <option value="broker">Broker</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 block mb-2">Email</label>
                            <input className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" placeholder="Email Address" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 block mb-2">Message</label>
                        <textarea value={message} onChange={(ev) => setMessage(ev.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm h-32 resize-none" placeholder="Message..." />
                    </div>
                    {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
                    <div className="flex justify-end">
                        <button type="submit" disabled={loading} className="inline-flex items-center px-16 py-3 bg-blue-600 text-white rounded-full text-sm shadow disabled:opacity-60">
                            {loading ? 'Sending...' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlayerEnquiry;