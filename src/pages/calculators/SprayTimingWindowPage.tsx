import React from 'react';
import SprayTimingWindow from '../../components/calculators/SprayTimingWindow';
import { Link } from 'react-router-dom';
import { Droplet, ChevronDown } from 'lucide-react';

export default function SprayTimingWindowPage() {
  return (
    <div className="space-y-12 pb-12 w-full max-w-5xl mx-auto">
      {/* 1. Above the Fold */}
      <section className="bg-[#2a2a2a] text-slate-200 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl font-sans w-full">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
          <div className="bg-[#e0f2fe] p-3 rounded-xl text-sky-800 shadow-sm shrink-0">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">Spray Timing Window Checker</h1>
            <p className="text-sm text-slate-400 mt-1">Determine if current environmental conditions (wind, temperature, humidity) are safe and legal for pesticide application.</p>
          </div>
        </div>

        {/* Calculator Component */}
        <SprayTimingWindow />
      </section>

      {/* 2. Below the Fold (Supporting Context) */}
      <section className="space-y-8 px-2 sm:px-0 text-slate-800">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="mb-4 text-sm leading-relaxed">
            The Spray Timing Window tool checks current localized environmental parameters against standard regulatory thresholds to prevent chemical drift, volatilization, and rapid evaporation.
          </p>
          <h3 className="font-bold text-slate-800 mb-2 mt-6">Safety Threshold Logic</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 mb-6">
            <li><strong>Wind Speed:</strong> Must be between 3 and 10 mph. Dead calm risks temperature inversions, while high winds cause physical drift.</li>
            <li><strong>Temperature:</strong> Must be below 85°F to minimize volatilization of chemical compounds.</li>
            <li><strong>Humidity:</strong> Must be above 40%. Extremely low humidity causes droplets to evaporate before hitting the target canopy, increasing drift potential.</li>
          </ul>

          <h3 className="font-bold text-slate-800 mb-2">Assumptions & Limitations</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>Does not account for impending rainfall (wash-off risk), which must be checked via local forecast.</li>
            <li>Assumes standard application equipment. Specialized low-drift nozzles may alter acceptable operating windows.</li>
            <li>Does not dynamically read specific pesticide label requirements, which supersede any general recommendations.</li>
          </ul>
        </div>

        {/* 3. FAQ Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-slate-200 rounded-lg bg-slate-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 font-medium">
                Why is a "dead calm" wind (0 mph) considered unsafe for spraying?
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">
                Zero wind speed often indicates a temperature inversion, where a layer of warm air traps cooler air near the ground. Pesticide droplets suspended in this cool air can drift laterally for miles without settling, causing severe off-target damage.
              </div>
            </details>
            <details className="group border border-slate-200 rounded-lg bg-slate-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 font-medium">
                What does a Delta T value mean?
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">
                Delta T is an agricultural measure combining temperature and humidity to determine droplet evaporation rates. While this basic calculator checks thresholds individually, advanced spray management relies on the Delta T index (ideally between 2 and 8).
              </div>
            </details>
          </div>
        </div>

        {/* Related Tools */}
        <div className="pt-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/spray-decision" className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition flex items-center justify-between group">
              <div>
                <div className="font-bold text-slate-900">Spray Logs</div>
                <div className="text-xs text-slate-500 mt-1">Record your EPA compliance logs</div>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition">→</div>
            </Link>
            <Link to="/calculators/economic-threshold" className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition flex items-center justify-between group">
              <div>
                <div className="font-bold text-slate-900">Economic Threshold</div>
                <div className="text-xs text-slate-500 mt-1">Determine if spraying is profitable</div>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition">→</div>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-[10px] text-slate-400 text-center pt-8 border-t border-slate-200 px-4">
          <p>Disclaimer: THE LABEL IS THE LAW. This tool provides general guidance based on standard best practices. Always read and adhere strictly to the specific EPA-approved label instructions on the chemical you are applying, which dictate the legal operating parameters.</p>
        </div>
      </section>
    </div>
  );
}
