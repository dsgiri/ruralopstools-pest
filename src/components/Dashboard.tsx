import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { TOOLS } from '../data/tools';
import ToolCard from './ToolCard';
import { Activity, ThermometerSun, Sprout, Target } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
  favorites: string[];
  toggleFavorite: (id: string, e?: React.MouseEvent) => void;
}

export default function Dashboard({ onNavigate, favorites, toggleFavorite }: DashboardProps) {
  const [scoutsCount, setScoutsCount] = useState(0);
  const [trapsCount, setTrapsCount] = useState(0);

  useEffect(() => {
    try {
      const scoutsItem = localStorage.getItem('pest_scouting_logs');
      if (scoutsItem) {
        setScoutsCount(JSON.parse(scoutsItem).length);
      } else {
        setScoutsCount(3); // Default mock data length if never initialized
      }
      
      const trapsItem = localStorage.getItem('pest_trap_tracker');
      if (trapsItem) {
        setTrapsCount(JSON.parse(trapsItem).length);
      } else {
        setTrapsCount(3);
      }
    } catch {
      setScoutsCount(3);
      setTrapsCount(3);
    }
  }, []);

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'click', { element: `dashboard_nav_${view}` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex items-center justify-between">
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
          <div className="pl-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</h4>
            <p className="text-lg font-bold text-slate-800 relative z-10">System Online</p>
          </div>
          <Activity className="h-6 w-6 text-slate-300 relative z-0" strokeWidth={1.5} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex items-center justify-between">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <div className="pl-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Scouting</h4>
            <p className="text-lg font-bold text-slate-800 relative z-10">{scoutsCount} <span className="text-xs font-normal text-slate-500">Logs</span></p>
          </div>
          <Sprout className="h-6 w-6 text-amber-200 relative z-0" strokeWidth={1.5} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex items-center justify-between">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <div className="pl-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Traps</h4>
            <p className="text-lg font-bold text-slate-800 relative z-10">{trapsCount} <span className="text-xs font-normal text-slate-500">Records</span></p>
          </div>
          <Target className="h-6 w-6 text-blue-200 relative z-0" strokeWidth={1.5} />
        </div>

        <div 
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('Scouting')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex items-center justify-between cursor-pointer hover:bg-slate-50 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-emerald-500" 
          onClick={() => handleNavClick('Scouting')}
          aria-label="Navigate to log data"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <div className="pl-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Actions</h4>
            <p className="text-sm font-bold text-emerald-700 relative z-10 uppercase tracking-wider">Log Data</p>
          </div>
          <Sprout className="h-5 w-5 text-emerald-300 relative z-0" strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      {/* Tools Grid */}
      <section aria-labelledby="modules-heading">
        <div className="mb-4">
          <h2 id="modules-heading" className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-2">Decision Support Modules</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map(tool => (
            <ToolCard 
              key={tool.id}
              tool={tool}
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={toggleFavorite}
              onNavigate={handleNavClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
