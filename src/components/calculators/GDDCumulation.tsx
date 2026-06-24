import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';

const PESTS = [
  { id: 'cew', name: 'Corn earworm', baseTemp: 55, peakGDD: 1500 },
  { id: 'faw', name: 'Fall armyworm', baseTemp: 50, peakGDD: 1800 },
  { id: 'sa', name: 'Soybean aphid', baseTemp: 50, peakGDD: 1200 },
  { id: 'bw', name: 'Bollworm', baseTemp: 60, peakGDD: 2000 },
];

export default function GDDCumulation() {
  const [selectedPest, setSelectedPest] = useState(PESTS[0]);
  const [highTemp, setHighTemp] = useState(88);
  const [lowTemp, setLowTemp] = useState(64);
  const [daysAccumulated, setDaysAccumulated] = useState(55);

  const todaysGDD = Math.max(0, ((highTemp + lowTemp) / 2) - selectedPest.baseTemp);
  
  // Simulated cumulative GDD based on days
  const avgHistoricalGDD = 25; 
  const cumulativeGDD = Math.round(daysAccumulated * avgHistoricalGDD + todaysGDD);
  
  const progressToPeak = Math.min(100, Math.round((cumulativeGDD / selectedPest.peakGDD) * 100));
  
  const daysToPeak = progressToPeak >= 100 ? 0 : Math.ceil((selectedPest.peakGDD - cumulativeGDD) / avgHistoricalGDD);

  const stages = [
    { name: 'Egg hatch', threshold: 10 },
    { name: '1st instar', threshold: 30 },
    { name: 'Peak larvae', threshold: 60 },
    { name: 'Pupation', threshold: 85 },
    { name: 'Adult flight', threshold: 100 },
  ];

  let currentStageIndex = stages.findIndex(s => progressToPeak <= s.threshold);
  if (currentStageIndex === -1) currentStageIndex = stages.length - 1;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {PESTS.map(pest => (
              <button
                key={pest.id}
                onClick={() => setSelectedPest(pest)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors border ${
                  selectedPest.id === pest.id
                    ? 'bg-[#3a3a3a] text-white border-slate-500'
                    : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                {pest.name}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex justify-between items-center sm:w-32 shrink-0">
                <label className="text-sm font-bold text-slate-400">Today's high (°F)</label>
                <span className="text-sm font-bold text-white sm:hidden">{highTemp}°F</span>
              </div>
              <input
                type="range"
                min="50"
                max="110"
                value={highTemp}
                onChange={(e) => setHighTemp(Number(e.target.value))}
                className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{highTemp}°F</span>
            </div>
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex justify-between items-center sm:w-32 shrink-0">
                <label className="text-sm font-bold text-slate-400">Today's low (°F)</label>
                <span className="text-sm font-bold text-white sm:hidden">{lowTemp}°F</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                value={lowTemp}
                onChange={(e) => setLowTemp(Number(e.target.value))}
                className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{lowTemp}°F</span>
            </div>
            <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
              <div className="flex justify-between items-center sm:w-32 shrink-0">
                <label className="text-sm font-bold text-slate-400">Days accumulated</label>
                <span className="text-sm font-bold text-white sm:hidden">{daysAccumulated} days</span>
              </div>
              <input
                type="range"
                min="1"
                max="120"
                value={daysAccumulated}
                onChange={(e) => setDaysAccumulated(Number(e.target.value))}
                className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
              <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{daysAccumulated} d</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
              <span>Cumulative GDD progress to peak flight</span>
              <span>{progressToPeak}%</span>
            </div>
            <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressToPeak}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">
              {stages.map((stage, i) => (
                <span 
                  key={stage.name} 
                  className={`flex-1 text-center ${i === currentStageIndex ? 'text-green-400' : ''}`}
                >
                  {stage.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#1e1e1e] p-4 rounded-xl">
              <div className="text-xs font-bold text-slate-400 mb-1">Today's GDD</div>
              <div className="text-xl font-bold text-white">{todaysGDD.toFixed(1)} GDD</div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl border border-amber-900/30">
              <div className="text-xs font-bold text-slate-400 mb-1">Cumulative GDD</div>
              <div className="text-xl font-bold text-amber-500">{cumulativeGDD.toLocaleString()} GDD</div>
            </div>
            <div className="bg-[#1e1e1e] p-4 rounded-xl">
              <div className="text-xs font-bold text-slate-400 mb-1">Days to peak</div>
              <div className="text-xl font-bold text-white">{daysToPeak} days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
