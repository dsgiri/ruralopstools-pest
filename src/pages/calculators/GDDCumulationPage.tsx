import React from 'react';
import GDDCumulation from '../../components/calculators/GDDCumulation';
import { Link } from 'react-router-dom';
import { Thermometer, ChevronDown } from 'lucide-react';

export default function GDDCumulationPage() {
  return (
    <div className="space-y-12 pb-12 w-full max-w-5xl mx-auto">
      {/* 1. Above the Fold */}
      <section className="bg-[#2a2a2a] text-slate-200 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl font-sans w-full">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
          <div className="bg-[#E4DAC5] p-3 rounded-xl text-slate-800 shadow-sm shrink-0">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">Degree-Day Accumulation</h1>
            <p className="text-sm text-slate-400 mt-1">Daily GDD calculator to track pest developmental stages based on thermal heat unit accumulation.</p>
          </div>
        </div>

        {/* Calculator Component */}
        <GDDCumulation />
      </section>

      {/* 2. Below the Fold (Supporting Context) */}
      <section className="space-y-8 px-2 sm:px-0 text-slate-800">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="mb-4 text-sm leading-relaxed">
            Growing Degree Days (GDD) are a measure of heat accumulation used by horticulturists, gardeners, and farmers to predict plant and animal development rates such as the date that a flower will bloom, or a crop will reach maturity, or a pest will emerge.
          </p>
          <h3 className="font-bold text-slate-800 mb-2 mt-6">Formulas</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 mb-6">
            <li><strong>Daily GDD:</strong> ((Daily High + Daily Low) / 2) - Base Temperature</li>
            <li>If the daily high or low drops below the base temperature, it is usually adjusted to equal the base temperature before calculating the average (modified sine wave method).</li>
          </ul>

          <h3 className="font-bold text-slate-800 mb-2">Assumptions & Limitations</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>This calculator uses a simplified average calculation method, not the complex hourly sine-curve integration method.</li>
            <li>Pest emergence thresholds are generalized and can vary significantly based on microclimates and genetic variations in local populations.</li>
          </ul>
        </div>

        {/* 3. FAQ Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-slate-200 rounded-lg bg-slate-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 font-medium">
                Why does base temperature matter?
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">
                Insects are cold-blooded and require a certain amount of heat to develop. The base temperature is the threshold below which no significant development occurs. For many common agricultural pests, this is around 50°F, but it varies by species.
              </div>
            </details>
            <details className="group border border-slate-200 rounded-lg bg-slate-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 font-medium">
                When should I start accumulating GDDs?
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">
                The biofix date (starting point) depends on the pest. Sometimes it is January 1st, but often it is based on a specific biological event, such as the first sustained capture of adult moths in pheromone traps in your specific region.
              </div>
            </details>
          </div>
        </div>

        {/* Related Tools */}
        <div className="pt-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/calculators/economic-threshold" className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition flex items-center justify-between group">
              <div>
                <div className="font-bold text-slate-900">Economic Threshold</div>
                <div className="text-xs text-slate-500 mt-1">Determine if spraying is profitable</div>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition">→</div>
            </Link>
            <Link to="/disease-models" className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition flex items-center justify-between group">
              <div>
                <div className="font-bold text-slate-900">Disease Models</div>
                <div className="text-xs text-slate-500 mt-1">Check infection risk conditions</div>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition">→</div>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-[10px] text-slate-400 text-center pt-8 border-t border-slate-200 px-4">
          <p>Disclaimer: GDD calculations provided are estimates meant to aid in scouting operations. Weather variations within a field can cause actual biological development to differ from regional predictions. Always verify pest presence through physical field scouting.</p>
        </div>
      </section>
    </div>
  );
}
