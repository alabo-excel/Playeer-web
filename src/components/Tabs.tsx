'use client'

import React, { useState } from 'react';

const tabData = [
  { label: 'Privacy & Visibility Settings', content: <div>This is the Overview section.</div> },
  { label: 'Notification Preferences', content: <div>This is the Stats section.</div> },
  { label: 'Language & Regional Preferences', content: <div>This is the Videos section.</div> },
  { label: 'Account & App Behavior', content: <div>This is the Settings section.</div> },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-x-auto">
        {tabData.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-6 py-3 text-sm font-semibold focus:outline-none transition-colors duration-200 relative
              ${activeTab === idx ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
            {activeTab === idx && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-1 bg-primary rounded-t-xl transition-all duration-300" />
            )}
          </button>
        ))}
      </div>
      <div className="p-6 bg-[#FCFCFC] rounded-b-xl min-h-[120px]">
        {tabData[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs; 