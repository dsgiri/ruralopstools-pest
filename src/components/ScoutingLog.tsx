import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, X } from 'lucide-react';
import { ScoutingRecord } from '../types';

const DEFAULT_SCOUTS: ScoutingRecord[] = [
  { id: '1', date: '2023-08-14', field: 'North Block', crop: 'Soybeans', pest: 'Stink Bugs', count: 12, severity: 'Moderate', notes: 'Visible pod damage in 15% of samples.' },
  { id: '2', date: '2023-08-12', field: 'West Field', crop: 'Corn', pest: 'Rootworm', count: 4, severity: 'Low', notes: 'Adults present, silk clipping minimal.' },
  { id: '3', date: '2023-08-10', field: 'East Grove', crop: 'Apples', pest: 'Codling Moth', count: 0, severity: 'Low', notes: 'Clean visual inspection.' },
];

export default function ScoutingLog() {
  const [scouts, setScouts] = useState<ScoutingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('pest_scouting_logs');
      return saved ? JSON.parse(saved) : DEFAULT_SCOUTS;
    } catch {
      return DEFAULT_SCOUTS;
    }
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [newField, setNewField] = useState('');
  const [newCrop, setNewCrop] = useState('');
  const [newPest, setNewPest] = useState('');
  const [newCount, setNewCount] = useState<number | ''>('');
  const [newSeverity, setNewSeverity] = useState('Low');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('pest_scouting_logs', JSON.stringify(scouts));
  }, [scouts]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newField || !newCrop || !newPest) return;

    const entry: ScoutingRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      field: newField,
      crop: newCrop,
      pest: newPest,
      count: Number(newCount) || 0,
      severity: newSeverity,
      notes: newNotes,
    };

    setScouts([entry, ...scouts]);
    setIsFormOpen(false);
    
    // Reset form
    setNewField('');
    setNewCrop('');
    setNewPest('');
    setNewCount('');
    setNewSeverity('Low');
    setNewNotes('');
  };

  const filteredScouts = scouts.filter(s => 
    s.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.pest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">Scouting Log</h2>
          <p className="text-xs text-slate-500 max-w-xl">Ground-truth your risk forecasts by logging physical field observations.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center shadow-sm transition-colors"
        >
          <Plus className="h-3 w-3 mr-1" />
          New Entry
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
          <button onClick={() => setIsFormOpen(false)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-bold text-slate-800 mb-4">Add Scouting Record</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Field</label>
                <input required value={newField} onChange={e => setNewField(e.target.value)} type="text" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="e.g. North Block" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Crop</label>
                <input required value={newCrop} onChange={e => setNewCrop(e.target.value)} type="text" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="e.g. Soybeans" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Pest/Target</label>
                <input required value={newPest} onChange={e => setNewPest(e.target.value)} type="text" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="e.g. Stink Bugs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Count</label>
                <input type="number" min="0" value={newCount} onChange={e => setNewCount(e.target.value ? Number(e.target.value) : '')} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Severity</label>
                <select value={newSeverity} onChange={e => setNewSeverity(e.target.value)} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none">
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Notes</label>
                <input value={newNotes} onChange={e => setNewNotes(e.target.value)} type="text" className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="Optional notes" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-xs font-bold">
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-0">
        <div className="p-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Search className="h-3 w-3 text-slate-400" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search field, crop, pest..." 
              className="block w-full pl-8 pr-2 py-1.5 border border-slate-300 rounded text-xs leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            />
          </div>
          <button className="px-3 py-1.5 bg-white border border-slate-300 rounded shadow-sm text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50">
            Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[9px] font-bold sticky top-0 border-b border-slate-100">
              <tr>
                <th scope="col" className="px-4 py-2">Field & Crop</th>
                <th scope="col" className="px-4 py-2">Pest / Target</th>
                <th scope="col" className="px-4 py-2">Observation</th>
                <th scope="col" className="px-4 py-2">Severity</th>
                <th scope="col" className="px-4 py-2 text-right">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredScouts.map(scout => (
                <tr key={scout.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-bold text-slate-800 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-emerald-500" /> {scout.field}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium ml-4">{scout.crop}</div>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">
                    {scout.pest}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-semibold text-slate-700">Count: {scout.count}</div>
                    <div className="text-[10px] text-slate-400">{scout.date}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                       scout.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                       scout.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                       scout.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                       'bg-blue-100 text-blue-700'
                     }`}>
                       {scout.severity} Risk
                     </span>
                  </td>
                  <td className="px-4 py-3 text-right max-w-[200px] truncate text-[10px] italic text-slate-500" title={scout.notes || ''}>
                    {scout.notes || '--'}
                  </td>
                </tr>
              ))}
              {filteredScouts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-xs">
                    No scouting records found.
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
