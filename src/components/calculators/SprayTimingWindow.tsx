import React, { useState } from 'react';
import { Droplet } from 'lucide-react';

export default function SprayTimingWindow() {
  const [windSpeed, setWindSpeed] = useState(7);
  const [temperature, setTemperature] = useState(81);
  const [humidity, setHumidity] = useState(58);
  const [rainInterval, setRainInterval] = useState(26);
  const [adjuvantAdded, setAdjuvantAdded] = useState(false);

  // Status evaluators
  const getWindStatus = (wind: number) => {
    if (wind < 3) return { text: 'too calm', ok: false, color: 'text-amber-400' };
    if (wind <= 10) return { text: 'good', ok: true, color: 'text-slate-300' };
    if (wind <= 15) return { text: 'caution', ok: true, color: 'text-amber-400' };
    return { text: 'too windy', ok: false, color: 'text-red-400' };
  };

  const getTempStatus = (temp: number) => {
    if (temp < 50) return { text: 'too cold', ok: false, color: 'text-amber-400' };
    if (temp <= 85) return { text: 'ideal', ok: true, color: 'text-slate-300' };
    if (temp <= 90) return { text: 'marginal', ok: true, color: 'text-amber-400' };
    return { text: 'too hot', ok: false, color: 'text-red-400' };
  };

  const getHumidityStatus = (hum: number) => {
    if (hum < 40) return { text: 'too dry', ok: false, color: 'text-amber-400' };
    if (hum <= 60) return { text: 'adequate', ok: true, color: 'text-slate-300' };
    return { text: 'ideal', ok: true, color: 'text-slate-300' };
  };

  const getRainStatus = (hours: number, adjuvant: boolean) => {
    const threshold = adjuvant ? 6 : 24;
    if (hours >= threshold) return { text: 'safe', ok: true, color: 'text-slate-300' };
    return { text: 'washout risk', ok: false, color: 'text-red-400' };
  };

  const windStatus = getWindStatus(windSpeed);
  const tempStatus = getTempStatus(temperature);
  const humStatus = getHumidityStatus(humidity);
  const rainStatus = getRainStatus(rainInterval, adjuvantAdded);

  const allGood = windStatus.ok && tempStatus.ok && humStatus.ok && rainStatus.ok;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex justify-between items-center sm:w-48 shrink-0">
              <label className="text-sm font-bold text-slate-400">Wind speed (mph)</label>
              <span className="text-sm font-bold text-white sm:hidden">{windSpeed} mph</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{windSpeed} mph</span>
          </div>
          
          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex justify-between items-center sm:w-48 shrink-0">
              <label className="text-sm font-bold text-slate-400">Temperature (°F)</label>
              <span className="text-sm font-bold text-white sm:hidden">{temperature}°F</span>
            </div>
            <input
              type="range"
              min="40"
              max="110"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{temperature}°F</span>
          </div>

          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex justify-between items-center sm:w-48 shrink-0">
              <label className="text-sm font-bold text-slate-400">Relative humidity (%)</label>
              <span className="text-sm font-bold text-white sm:hidden">{humidity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{humidity}%</span>
          </div>

          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <div className="flex justify-between items-center sm:w-48 shrink-0">
              <label className="text-sm font-bold text-slate-400">Hours since last rain</label>
              <span className="text-sm font-bold text-white sm:hidden">{rainInterval} hrs</span>
            </div>
            <input
              type="range"
              min="0"
              max="72"
              value={rainInterval}
              onChange={(e) => setRainInterval(Number(e.target.value))}
              className="w-full flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <span className="hidden sm:block w-16 text-right text-sm font-bold text-white">{rainInterval} hrs</span>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <label className="w-48 text-sm font-bold text-slate-400 shrink-0">Adjuvant / spreader-sticker added</label>
            <div className="flex-1 flex justify-end">
               <button
                onClick={() => setAdjuvantAdded(!adjuvantAdded)}
                className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${adjuvantAdded ? 'bg-slate-400' : 'bg-slate-700'}`}
                aria-pressed={adjuvantAdded}
               >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${adjuvantAdded ? 'translate-x-6' : 'translate-x-0'}`}></div>
               </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className={`font-bold flex items-center gap-2 ${windStatus.ok ? 'text-green-500' : 'text-red-500'}`}>
                {windStatus.ok ? '✓' : '✕'} Wind speed
              </span>
              <span className={`font-bold ${windStatus.color}`}>{windSpeed} mph — {windStatus.text}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className={`font-bold flex items-center gap-2 ${tempStatus.ok ? 'text-green-500' : 'text-red-500'}`}>
                {tempStatus.ok ? '✓' : '✕'} Temperature
              </span>
              <span className={`font-bold ${tempStatus.color}`}>{temperature}°F — {tempStatus.text}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className={`font-bold flex items-center gap-2 ${humStatus.ok ? 'text-green-500' : 'text-red-500'}`}>
                {humStatus.ok ? '✓' : '✕'} Humidity
              </span>
              <span className={`font-bold ${humStatus.color}`}>{humidity}% — {humStatus.text}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className={`font-bold flex items-center gap-2 ${rainStatus.ok ? 'text-green-500' : 'text-red-500'}`}>
                {rainStatus.ok ? '✓' : '✕'} Rain-free interval
              </span>
              <span className={`font-bold ${rainStatus.color}`}>{rainInterval} hrs — {rainStatus.text}</span>
            </div>
          </div>

          <div className={`p-4 rounded-lg flex items-center justify-between ${
            allGood ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-amber-900/30 text-amber-400 border border-amber-800'
          }`}>
            <span className="text-sm font-bold flex items-center gap-2">
              {allGood ? '✓ All conditions met — good window to spray now' : '✕ Conditions marginal — delay spray if possible'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
