import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

const CROPS = [
  { id: 'corn', name: 'Corn', valPerAcre: 936 },
  { id: 'soy', name: 'Soybeans', valPerAcre: 650 },
  { id: 'cot', name: 'Cotton', valPerAcre: 850 },
  { id: 'sorg', name: 'Sorghum', valPerAcre: 500 },
];

export default function TrapCountROI() {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [acresManaged, setAcresManaged] = useState(500);
  const [trapLeadDays, setTrapLeadDays] = useState(10);
  const [yieldSavedPercent, setYieldSavedPercent] = useState(8);

  const valueAtRisk = acresManaged * selectedCrop.valPerAcre;
  const yieldSaved = valueAtRisk * (yieldSavedPercent / 100);
  
  // Base cost of trapping program for estimation (e.g. $2.50 per day lead time per acre equivalent roughly, or static base + per acre)
  // According to blueprint: If ROI is 150x, estimated trap/monitoring cost is ~$250 total: $37,440 / 150 = $249.60
  const estimatedTrapCost = 250; 
  const roi = Math.round(yieldSaved / estimatedTrapCost);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${Math.round(val / 1000)}K`;
    return `$${Math.round(val)}`;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {CROPS.map(crop => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors border ${
                  selectedCrop.id === crop.id
                    ? 'bg-[#3a3a3a] text-white border-slate-500'
                    : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                {crop.name}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex justify-between items-center sm:w-48 shrink-0">
                <label className="text-sm font-bold text-slate-400">Acres managed</label>
                <span className="text-sm font-bold text-white sm:hidden">{acresManaged} ac</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={acresManaged}
                onChange={(e) => setAcresManaged(Number(e.target.value))}
                className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{acresManaged} ac</span>
            </div>
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex justify-between items-center sm:w-48 shrink-0">
                <label className="text-sm font-bold text-slate-400">Trap detection lead (days)</label>
                <span className="text-sm font-bold text-white sm:hidden">{trapLeadDays} days</span>
              </div>
              <input
                type="range"
                min="1"
                max="21"
                value={trapLeadDays}
                onChange={(e) => setTrapLeadDays(Number(e.target.value))}
                className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{trapLeadDays} days</span>
            </div>
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex justify-between items-center sm:w-48 shrink-0">
                <label className="text-sm font-bold text-slate-400">Yield saved by early spray (%)</label>
                <span className="text-sm font-bold text-white sm:hidden">{yieldSavedPercent}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={yieldSavedPercent}
                onChange={(e) => setYieldSavedPercent(Number(e.target.value))}
                className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{yieldSavedPercent}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e1e1e] p-4 rounded-xl col-span-2">
              <div className="text-xs font-bold text-slate-400 mb-1">Crop value at risk</div>
              <div className="text-xl font-bold text-white">{formatCurrency(valueAtRisk)}</div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl">
              <div className="text-xs font-bold text-slate-400 mb-1">Yield saved ($)</div>
              <div className="text-xl font-bold text-green-400">${yieldSaved.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl">
              <div className="text-xs font-bold text-slate-400 mb-1">ROI on trapping</div>
              <div className="text-xl font-bold text-green-500">{roi}x return</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
