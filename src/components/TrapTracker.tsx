import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const DEFAULT_TRAP_DATA = [
  { id: '1', date: '2023-08-15', location: 'Orchard Block A', pest: 'Codling Moth', count: 18, prevCount: 5, threshold: 12 },
  { id: '2', date: '2023-08-15', location: 'Corn Field 2', pest: 'Fall Armyworm', count: 3, prevCount: 4, threshold: 10 },
  { id: '3', date: '2023-08-14', location: 'Greenhouse 1', pest: 'Whiteflies', count: 45, prevCount: 40, threshold: 50 },
];

export default function TrapTracker() {
  const [traps, setTraps] = useState(() => {
    try {
      const saved = localStorage.getItem('pest_trap_tracker');
      return saved ? JSON.parse(saved) : DEFAULT_TRAP_DATA;
    } catch {
      return DEFAULT_TRAP_DATA;
    }
  });

  const [targetPest, setTargetPest] = useState('Codling Moth');
  const [location, setLocation] = useState('');
  const [count, setCount] = useState<number | ''>(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    localStorage.setItem('pest_trap_tracker', JSON.stringify(traps));
  }, [traps]);

  const handleLogCatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || count === '') return;
    
    // Find previous count for the same location and pest
    const previousLogs = traps.filter((t: { location: string; pest: string; count: number }) => t.location === location && t.pest === targetPest);
    const prevCount = previousLogs.length > 0 ? previousLogs[0].count : 0;
    
    // Simple mock threshold mapping
    const thresholdMap: Record<string, number> = {
      'Codling Moth': 12,
      'Fall Armyworm': 10,
      'Whiteflies': 50
    };

    const newEntry = {
      id: Date.now().toString(),
      date,
      location,
      pest: targetPest,
      count: Number(count),
      prevCount,
      threshold: thresholdMap[targetPest] || 20
    };

    setTraps([newEntry, ...traps]);
    
    // reset some form fields
    setCount(0);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">Trap Count Tracker</h2>
        <p className="text-xs text-slate-500 max-w-3xl">Monitor daily or weekly trap catches to track population spikes and establish biofix dates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {traps.map((trap: { id: string; count: number; prevCount: number; threshold: number; pest: string; location: string; date: string }) => {
            const isSpike = trap.count > trap.prevCount;
            const isOverThreshold = trap.count >= trap.threshold;
            
            return (
              <div key={trap.id} className={`bg-white border rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col ${isOverThreshold ? 'border-red-300' : 'border-slate-200'}`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${isOverThreshold ? 'bg-red-500' : isSpike ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                <div className="flex justify-between items-start mb-2 pl-2">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 flex items-center">
                      <Target className="h-4 w-4 mr-1.5 text-slate-400" />
                      {trap.pest}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{trap.location} &bull; {trap.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900 leading-none">{trap.count}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1">Found</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 mt-auto border-t border-slate-100 pl-2">
                  <div className={`flex items-center text-[10px] font-bold uppercase tracking-widest ${isSpike ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {isSpike ? <TrendingUp className="mr-1 h-3 w-3" /> : trap.count < trap.prevCount ? <TrendingDown className="mr-1 h-3 w-3" /> : <Minus className="mr-1 h-3 w-3" />}
                    {isSpike ? 'Rising Trend' : trap.count < trap.prevCount ? 'Falling Trend' : 'Stable Trend'} 
                    <span className="text-slate-400 ml-1 font-semibold normal-case">(Prev: {trap.prevCount})</span>
                  </div>
                  
                  {isOverThreshold ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-red-100 text-red-700">
                      Exceeds Threshold ({trap.threshold})
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600">
                      Below Threshold ({trap.threshold})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {traps.length === 0 && (
             <div className="text-center p-8 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-slate-500 text-sm font-medium">
                No trap records found. Use quick entry to log a catch.
             </div>
          )}
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg h-fit border border-slate-800 sticky top-6">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Quick Entry</h3>
          <form className="space-y-4" onSubmit={handleLogCatch}>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Target Pest</label>
              <select value={targetPest} onChange={(e) => setTargetPest(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-medium tracking-wide">
                <option>Codling Moth</option>
                <option>Fall Armyworm</option>
                <option>Whiteflies</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Location</label>
              <input required value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white font-medium placeholder-slate-500" placeholder="e.g. Orchard Row 1P" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Count</label>
                  <input required value={count} onChange={(e) => setCount(e.target.value ? Number(e.target.value) : '')} type="number" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white text-center font-bold" min="0" />
               </div>
               <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Date</label>
                  <input required value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white font-medium" />
               </div>
            </div>
            <button type="submit" className="w-full mt-4 bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] uppercase font-bold tracking-widest py-2 px-4 rounded transition-colors border border-emerald-600">
              Log Catch
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
