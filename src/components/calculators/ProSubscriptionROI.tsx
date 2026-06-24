import React, { useState } from 'react';
import { Receipt } from 'lucide-react';

export default function ProSubscriptionROI() {
  const [acresManaged, setAcresManaged] = useState(800);
  const [avgCropValue, setAvgCropValue] = useState(900);
  const [avoidedSprays, setAvoidedSprays] = useState(2);
  const [sprayCost, setSprayCost] = useState(22);

  const savedPerSpray = acresManaged * sprayCost;
  const annualSavings = savedPerSpray * avoidedSprays;
  
  const annualSubCost = 288;
  const netRoi = annualSavings - annualSubCost;
  const multiplier = (annualSavings / annualSubCost).toFixed(1);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex justify-between items-center sm:w-48 shrink-0">
              <label className="text-sm font-bold text-slate-400">Acres you manage</label>
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
            <span className="hidden sm:block w-20 text-right text-sm font-bold text-white">{acresManaged} ac</span>
          </div>
          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex justify-between items-center sm:w-48 shrink-0">
              <label className="text-sm font-bold text-slate-400">Avg crop value ($/ac)</label>
              <span className="text-sm font-bold text-white sm:hidden">${avgCropValue}/ac</span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={avgCropValue}
              onChange={(e) => setAvgCropValue(Number(e.target.value))}
              className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <span className="hidden sm:block w-20 text-right text-sm font-bold text-white">${avgCropValue}/ac</span>
          </div>
          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex justify-between items-center sm:w-48 shrink-0">
              <label className="text-sm font-bold text-slate-400">Avoided bad sprays/yr</label>
              <span className="text-sm font-bold text-white sm:hidden">{avoidedSprays} sprays</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={avoidedSprays}
              onChange={(e) => setAvoidedSprays(Number(e.target.value))}
              className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <span className="hidden sm:block w-20 text-right text-sm font-bold text-white">{avoidedSprays} sp</span>
          </div>
          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex justify-between items-center sm:w-48 shrink-0">
              <label className="text-sm font-bold text-slate-400">Spray cost ($/ac)</label>
              <span className="text-sm font-bold text-white sm:hidden">${sprayCost}/ac</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={sprayCost}
              onChange={(e) => setSprayCost(Number(e.target.value))}
              className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <span className="hidden sm:block w-20 text-right text-sm font-bold text-white">${sprayCost}/ac</span>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-8">
          {avoidedSprays > 0 && (
            <div className="space-y-2">
              {Array.from({ length: avoidedSprays }).map((_, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-bold">Avoided spray {i + 1}</span>
                  <span className="text-green-400 font-bold">${savedPerSpray.toLocaleString()} saved</span>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e1e1e] p-4 rounded-xl">
              <div className="text-xs font-bold text-slate-400 mb-1">Annual subscription cost</div>
              <div className="text-xl font-bold text-white">${annualSubCost}/yr</div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl">
              <div className="text-xs font-bold text-slate-400 mb-1">Annual savings</div>
              <div className="text-xl font-bold text-green-400">${annualSavings.toLocaleString()}/yr</div>
            </div>
          </div>

          <div className="bg-green-900/30 text-green-400 border border-green-800 p-4 rounded-lg flex items-center justify-between">
            <span className="text-sm font-bold">
              Pays for itself {multiplier}x over — ROI of ${netRoi.toLocaleString()}/yr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
