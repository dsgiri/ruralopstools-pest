import React, { useState } from 'react';
import { Bell, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'red-flag',
      title: 'MCL Violation Detected: Nitrate & Coliform',
      description: 'Lab verification chain indicates Nitrate (NO3) and Total Coliform levels exceed the Maximum Contaminant Level (MCL). This requires immediate regulatory reporting and remediation protocol initiation. Document processing finalized via AI Lab Report Parsing.',
      timestamp: 'Sampling Period: Q3',
      source: 'Logged to Compliance Vault'
    },
    {
      id: '2',
      type: 'standard',
      title: 'Codling Moth Catch Exceeds Threshold',
      description: 'Orchard Block A reported 18 moths per trap, exceeding the baseline threshold of 12. Biofix date should be established formally in the ledger if not already set. Prepare for cover sprays at ~250 DD.',
      timestamp: 'Triggered 2 hours ago',
      source: 'Trap Tracker'
    },
    {
      id: '3',
      type: 'disease',
      title: 'Late Blight Favorable Conditions Approaching',
      description: 'Extended periods of high humidity (>90%) and moderate temperatures are forecasted for the next 48 hours. Preventive fungicide programs must be documented for susceptible crops (Tomatoes, Potatoes).',
      timestamp: 'Triggered 1 day ago',
      source: 'Disease Forecast'
    }
  ]);
  const [inspectorMode, setInspectorMode] = useState(false);
  const [protocolInitiated, setProtocolInitiated] = useState(false);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-end mb-2 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">Threshold Alerts & Compliance Ledger</h2>
          <p className="text-xs text-slate-500">Review automated warnings generated from trap counts, scouting logs, and formal verification chains.</p>
        </div>
        <button 
          onClick={() => setInspectorMode(!inspectorMode)}
          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white rounded flex items-center shadow-sm transition-colors ${inspectorMode ? 'bg-emerald-600' : 'bg-slate-900'}`}
        >
          <ShieldCheck className="w-3 h-3 mr-1.5" />
          {inspectorMode ? 'Inspector Active' : 'Inspector Mode'}
        </button>
      </div>

      <div className="space-y-4 pt-2">
        {alerts.map((alert) => {
          if (alert.type === 'red-flag') {
            return (
              <div key={alert.id} className={`flex p-4 border ${inspectorMode ? 'border-emerald-200' : 'border-red-200'} bg-white shadow-sm rounded-xl overflow-hidden relative transition-all`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${inspectorMode ? 'bg-emerald-500' : 'bg-red-600'}`}></div>
                <div className="flex-shrink-0 mt-0.5 pl-2">
                  <AlertTriangle className={`h-5 w-5 ${inspectorMode ? 'text-emerald-500' : 'text-red-600'}`} />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-widest rounded ${inspectorMode ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {inspectorMode ? 'Audit Mode Active' : 'Red Flag Priority'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{alert.title}</h4>
                  <div className="text-xs text-slate-600 font-medium">
                    <p>{alert.description}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex flex-wrap items-center gap-2">
                    <span className="flex items-center"><Bell className="h-3 w-3 mr-1" /> {alert.source}</span>
                    <span className="text-slate-300">|</span>
                    <span>{alert.timestamp}</span>
                    <span className="text-slate-300">|</span>
                    <span className={protocolInitiated ? 'text-emerald-500' : 'text-red-500'}>
                      {protocolInitiated ? 'Verification: Protocol Active' : 'Verification: Pending Human Verification'}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex flex-col gap-2">
                  {!protocolInitiated ? (
                    <button 
                      onClick={() => setProtocolInitiated(true)}
                      className="text-[10px] font-bold uppercase tracking-widest bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded transition-colors border border-red-100 flex items-center"
                    >
                      Initiate Protocol
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded border border-emerald-100 flex items-center">
                      <Check className="h-3 w-3 mr-1" /> Protocol Active
                    </span>
                  )}
                  <button onClick={() => dismissAlert(alert.id)} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600">Dismiss</button>
                </div>
              </div>
            );
          }
          
          const isDisease = alert.type === 'disease';
          return (
            <div key={alert.id} className={`flex p-4 border border-slate-200 bg-white shadow-sm rounded-xl overflow-hidden relative ${isDisease ? 'opacity-90' : ''}`}>
              <div className={`absolute top-0 left-0 w-1 h-full ${isDisease ? 'bg-amber-400' : 'bg-amber-500'}`}></div>
              <div className="flex-shrink-0 mt-0.5 pl-2">
                <AlertTriangle className={`h-5 w-5 ${isDisease ? 'text-amber-400' : 'text-amber-500'}`} />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="text-sm font-bold text-slate-900 mb-1">{alert.title}</h4>
                <div className="text-xs text-slate-600 font-medium">
                  <p>{alert.description}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                  <Bell className="h-3 w-3 mr-1" /> {alert.timestamp} from <span className="ml-1 text-slate-500">{alert.source}</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button onClick={() => dismissAlert(alert.id)} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600">Dismiss</button>
              </div>
            </div>
          );
        })}
        
        {alerts.length === 0 && (
          <div className="text-center p-8 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-slate-500 text-sm font-medium">
            No active alerts or ledger warnings.
          </div>
        )}
      </div>
    </div>
  );
}
