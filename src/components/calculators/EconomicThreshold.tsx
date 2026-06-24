import React, { useState } from 'react';
import { CircleDollarSign } from 'lucide-react';

export default function EconomicThreshold() {
  const [cropValue, setCropValue] = useState<number | ''>(5.20);
  const [yieldPotential, setYieldPotential] = useState<number | ''>(180);
  const [sprayCost, setSprayCost] = useState<number | ''>(22);
  const [yieldLossPerUnit, setYieldLossPerUnit] = useState(0.8);
  const [currentCount, setCurrentCount] = useState(18);

  const cv = Number(cropValue) || 0;
  const yp = Number(yieldPotential) || 0;
  const sc = Number(sprayCost) || 0;

  const grossCropValue = cv * yp;
  const threshold = (grossCropValue > 0 && yieldLossPerUnit > 0) 
    ? sc / (grossCropValue * (yieldLossPerUnit / 100))
    : 0;
    
  const thresholdRounded = Math.max(1, Math.round(threshold));
  const percentAbove = thresholdRounded > 0 
    ? Math.round(((currentCount - thresholdRounded) / thresholdRounded) * 100)
    : 0;

  const isJustified = currentCount >= thresholdRounded;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Crop value ($/bu)</label>
              <input
                type="number"
                value={cropValue}
                onChange={(e) => setCropValue(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-bold focus:outline-none focus:border-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Yield potential (bu/ac)</label>
              <input
                type="number"
                value={yieldPotential}
                onChange={(e) => setYieldPotential(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-bold focus:outline-none focus:border-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Spray cost ($/ac)</label>
              <input
                type="number"
                value={sprayCost}
                onChange={(e) => setSprayCost(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm font-bold focus:outline-none focus:border-slate-500"
              />
            </div>
          </div>

          <div className="space-y-6 border-t border-slate-700 pt-6">
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex justify-between items-center sm:w-48 shrink-0">
                <label className="text-sm font-bold text-slate-400">% yield loss per pest unit</label>
                <span className="text-sm font-bold text-white sm:hidden">{yieldLossPerUnit.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={yieldLossPerUnit}
                onChange={(e) => setYieldLossPerUnit(Number(e.target.value))}
                className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{yieldLossPerUnit.toFixed(1)}%</span>
            </div>
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex justify-between items-center sm:w-48 shrink-0">
                <label className="text-sm font-bold text-slate-400">Current pest count</label>
                <span className="text-sm font-bold text-white sm:hidden">{currentCount} /100 sweep</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={currentCount}
                onChange={(e) => setCurrentCount(Number(e.target.value))}
                className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <span className="hidden sm:block w-24 text-right text-sm font-bold text-white">{currentCount} /100 sw</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e1e1e] p-4 rounded-xl">
              <div className="text-xs font-bold text-slate-400 mb-1">Economic threshold</div>
              <div className="text-xl font-bold text-white">{thresholdRounded} pests</div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl">
              <div className="text-xs font-bold text-slate-400 mb-1">Gross crop value</div>
              <div className="text-xl font-bold text-white">${grossCropValue.toLocaleString(undefined, {maximumFractionDigits:0})}/ac</div>
            </div>
          </div>

          <div className={`p-4 rounded-lg flex items-center justify-between ${
            isJustified ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'
          }`}>
            <span className="text-sm font-bold flex items-center gap-2">
              {isJustified ? '✓' : '✕'} {isJustified ? `Spray justified — pest count ${percentAbove}% above threshold` : 'Do not spray — below economic threshold'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
