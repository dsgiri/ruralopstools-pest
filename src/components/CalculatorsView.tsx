import React from 'react';
import { Link } from 'react-router-dom';
import { Thermometer, CircleDollarSign, Droplet, BarChart3, ChevronRight } from 'lucide-react';

const CALCULATORS = [
  { 
    id: 'gdd', 
    path: '/calculators/degree-days',
    title: 'Degree-Day Accumulation', 
    desc: 'Daily GDD calculator with pest stage tracker based on thermal heat unit accumulation.', 
    icon: Thermometer, 
    color: 'text-slate-800', 
    bg: 'bg-[#E4DAC5]',
    metrics: ['Biofix Tracking', 'Pest Stages']
  },
  { 
    id: 'threshold', 
    path: '/calculators/economic-threshold',
    title: 'Economic Thresholds', 
    desc: 'Is it worth spraying? Calculate break-even pest counts based on crop value and spray costs.', 
    icon: CircleDollarSign, 
    color: 'text-emerald-800', 
    bg: 'bg-[#D1F2D6]',
    metrics: ['Cost/Acre', 'Yield Protection']
  },
  { 
    id: 'spray', 
    path: '/calculators/spray-window',
    title: 'Spray Timing Window', 
    desc: 'Determine if current wind, temperature, and humidity conditions are safe for application.', 
    icon: Droplet, 
    color: 'text-sky-800', 
    bg: 'bg-[#e0f2fe]',
    metrics: ['Drift Risk', 'Volatilization']
  },
  { 
    id: 'trap', 
    path: '/calculators/trap-roi',
    title: 'Trap Count ROI', 
    desc: 'Calculate the financial value of early pest detection compared to reactive late responses.', 
    icon: BarChart3, 
    color: 'text-pink-800', 
    bg: 'bg-[#fce7f3]',
    metrics: ['Labor Costs', 'Crop Savings']
  },
];

export default function CalculatorsView() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Agricultural Calculators</h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Interactive decision-support tools and ROI estimators to optimize your pest management strategy and financial returns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CALCULATORS.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link 
              key={calc.id} 
              to={calc.path}
              className="group block bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className={`${calc.bg} ${calc.color} p-4 rounded-xl shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{calc.title}</h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {calc.desc}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-4">
                    {calc.metrics.map((metric, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 pt-2 text-slate-400 group-hover:text-slate-900 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
