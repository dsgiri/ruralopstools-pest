import React, { useState } from 'react';
import GDDCumulation from './calculators/GDDCumulation';
import EconomicThreshold from './calculators/EconomicThreshold';
import SprayTimingWindow from './calculators/SprayTimingWindow';
import TrapCountROI from './calculators/TrapCountROI';
import { Thermometer, CircleDollarSign, Droplet, BarChart3 } from 'lucide-react';

const TABS = [
  { id: 'gdd', label: 'Degree-Days', title: 'Degree-day accumulation', desc: 'Daily GDD calculator with pest stage tracker', icon: Thermometer, color: 'text-slate-800', bg: 'bg-[#E4DAC5]' },
  { id: 'threshold', label: 'Thresholds', title: 'Economic threshold calculator', desc: 'Is it worth spraying? Break-even pest count.', icon: CircleDollarSign, color: 'text-emerald-800', bg: 'bg-[#D1F2D6]' },
  { id: 'spray', label: 'Spray Window', title: 'Spray timing window checker', desc: 'Wind, temp & humidity go/no-go decision', icon: Droplet, color: 'text-sky-800', bg: 'bg-[#e0f2fe]' },
  { id: 'trap', label: 'Trap ROI', title: 'Trap count ROI estimator', desc: 'Value of early detection vs. late response', icon: BarChart3, color: 'text-pink-800', bg: 'bg-[#fce7f3]' },
];

export default function CalculatorsView() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeTabData = TABS.find(t => t.id === activeTab) || TABS[0];
  const ActiveIcon = activeTabData.icon;

  return (
    <div className="space-y-6 pb-12 w-full max-w-5xl mx-auto">
      {/* Tabs Navigation */}
      <div className="flex w-full overflow-x-auto custom-scrollbar gap-2 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${
              activeTab === tab.id
                ? 'bg-slate-800 text-white border border-slate-800 shadow-md transform scale-[1.02]'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Calculator Container */}
      <div className="bg-[#2a2a2a] text-slate-200 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl w-full font-sans">
        {/* Dynamic Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
          <div className={`${activeTabData.bg} p-3 rounded-xl ${activeTabData.color} shadow-sm shrink-0`}>
            <ActiveIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">{activeTabData.title}</h2>
            <p className="text-sm text-slate-400 mt-1">{activeTabData.desc}</p>
          </div>
        </div>

        {/* Calculator Content */}
        <div className="w-full">
          {activeTab === 'gdd' && <GDDCumulation />}
          {activeTab === 'threshold' && <EconomicThreshold />}
          {activeTab === 'spray' && <SprayTimingWindow />}
          {activeTab === 'trap' && <TrapCountROI />}
        </div>
      </div>
    </div>
  );
}
