import React, { useState } from 'react';
import { AlertCircle, ArrowUpRight, ArrowDownRight, Wind, Droplets, Thermometer } from 'lucide-react';
import { ViewState } from '../types';

const mockRiskData = [
  { id: '1', pest: 'Corn Earworm', crop: 'Sweet Corn', risk: 'High', trend: 'up', severity: 'Critical', region: 'North Field' },
  { id: '2', pest: 'Aphids', crop: 'Soybeans', risk: 'Moderate', trend: 'flat', severity: 'Watch', region: 'East Block' },
  { id: '3', pest: 'Colorado Potato Beetle', crop: 'Potatoes', risk: 'Low', trend: 'down', severity: 'Safe', region: 'South Center' },
  { id: '4', pest: 'Spider Mites', crop: 'Alfalfa', risk: 'High', trend: 'up', severity: 'Critical', region: 'West Field' },
];

interface RiskOverviewProps {
  onNavigate?: (view: ViewState) => void;
}

export default function RiskOverview({ onNavigate }: RiskOverviewProps) {
  const [selectedCrop, setSelectedCrop] = useState('All Crops');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">Pest Risk Forecast</h2>
          <p className="text-xs text-slate-500 max-w-3xl">Monitor regional and field-level pest pressure driven by degree-day accumulations and weather conditions.</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            className="bg-white border text-xs border-slate-300 text-slate-900 rounded py-1.5 pl-2 pr-6 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium uppercase tracking-wider"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option>All Crops</option>
            <option>Sweet Corn</option>
            <option>Soybeans</option>
            <option>Potatoes</option>
            <option>Alfalfa</option>
          </select>
        </div>
      </div>

      {/* Weather Context Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Avg Temp</span>
            <span className="text-xl font-bold tracking-tight">84°F</span>
          </div>
          <Thermometer className="h-6 w-6 opacity-30" />
        </div>
        <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Humidity</span>
            <span className="text-xl font-bold tracking-tight">68%</span>
          </div>
          <Droplets className="h-6 w-6 opacity-30" />
        </div>
        <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Wind Speed</span>
            <span className="text-xl font-bold tracking-tight">8 mph</span>
          </div>
          <Wind className="h-6 w-6 opacity-30" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-h-0">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-700">Active Risk Models</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[9px] font-bold sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-2">Target Pest</th>
                <th scope="col" className="px-4 py-2">Crop & Field</th>
                <th scope="col" className="px-4 py-2">Current Risk</th>
                <th scope="col" className="px-4 py-2">Trend</th>
                <th scope="col" className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockRiskData.filter(r => selectedCrop === 'All Crops' || r.crop === selectedCrop).map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                      {row.risk === 'High' && <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>}
                      {row.risk === 'Moderate' && <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>}
                      {row.risk === 'Low' && <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>}
                      <span className="text-slate-800 font-bold">{row.pest}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-700">{row.crop}</div>
                    <div className="text-[10px] text-slate-500">{row.region}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                      row.risk === 'High' ? 'bg-red-100 text-red-700' :
                      row.risk === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-bold">
                    <div className={`flex items-center text-[10px] uppercase tracking-wider ${row.trend === 'up' ? 'text-red-600' : row.trend === 'down' ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {row.trend === 'up' ? '↑ Rising' : row.trend === 'down' ? '↓ Falling' : '— Flat'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button 
                      onClick={() => onNavigate && onNavigate('Spray')}
                      className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {mockRiskData.filter(r => selectedCrop === 'All Crops' || r.crop === selectedCrop).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500 italic">
                    No active pest risks recorded for {selectedCrop}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ArrowRight needed as a fallback for flat trend
function ArrowRight(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
