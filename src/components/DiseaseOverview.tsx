import React, { useState } from 'react';
import { ViewState } from '../types';

const mockDiseases = [
  { id: '1', disease: 'Late Blight', crop: 'Tomatoes', status: 'High Risk Window', conditions: '72°F + 90% RH (12h)', date: 'Today' },
  { id: '2', disease: 'Powdery Mildew', crop: 'Squash', status: 'Moderate', conditions: 'Moderate Temp, High RH', date: 'Upcoming' },
  { id: '3', disease: 'Apple Scab', crop: 'Apples', status: 'Infection Event', conditions: 'Continuous Leaf Wetness', date: 'Active' },
];

interface DiseaseOverviewProps {
  onNavigate?: (view: ViewState) => void;
}

export default function DiseaseOverview({ onNavigate }: DiseaseOverviewProps) {
  const [sensorsEnabled, setSensorsEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">Disease Risk Forecast</h2>
        <p className="text-xs text-slate-500 max-w-3xl">Monitor temperature, humidity, and leaf wetness combinations that trigger disease outbreaks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockDiseases.map(d => (
          <div key={d.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${
              d.status.includes('High') || d.status.includes('Infection') ? 'bg-red-500' : 'bg-amber-500'
            }`}></div>
            <div className="flex justify-between items-start mb-2 pl-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.date}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                d.status.includes('High') || d.status.includes('Infection') ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {d.status}
              </span>
            </div>
            
            <h4 className="text-lg font-bold mb-1 pl-2 text-slate-800">{d.disease}</h4>
            <p className="text-xs font-semibold text-slate-700 mb-2 pl-2 border-b border-slate-100 pb-2">{d.crop}</p>
            
            <div className="mb-4 pl-2">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trigger Conditions</p>
              <p className="text-xs text-slate-600 font-medium">{d.conditions}</p>
            </div>
            
            <div className="mt-4 flex items-center justify-between gap-2 pl-2">
               <button 
                onClick={() => onNavigate && onNavigate('Spray')}
                className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest hover:underline w-full text-left"
               >
                 View Strategy
               </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${sensorsEnabled ? 'bg-emerald-50 border-emerald-100' : 'bg-blue-50 border-blue-100'}`}>
        <div>
          <h4 className={`text-xs font-bold uppercase tracking-widest ${sensorsEnabled ? 'text-emerald-900' : 'text-blue-900'}`}>Leaf Wetness Sensors</h4>
          <p className={`text-xs mt-1 max-w-xl font-medium ${sensorsEnabled ? 'text-emerald-800' : 'text-blue-800'}`}>
            {sensorsEnabled ? 'Sensors are active and transmitting micro-climate data.' : 'Integration with localized IoT sensors is currently disabled. Update to validate micro-climate.'}
          </p>
        </div>
        <button 
          onClick={() => setSensorsEnabled(!sensorsEnabled)}
          className={`px-3 py-1.5 text-white text-[10px] uppercase font-bold rounded shadow-sm transition-colors tracking-widest whitespace-nowrap ${sensorsEnabled ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {sensorsEnabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    </div>
  );
}
