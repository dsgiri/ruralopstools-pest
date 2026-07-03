import React from 'react';
import EconomicThreshold from '../../components/calculators/EconomicThreshold';
import { Link } from 'react-router-dom';
import { CircleDollarSign, ChevronDown } from 'lucide-react';

export default function EconomicThresholdPage() {
  return (
    <div className="space-y-12 pb-12 w-full max-w-5xl mx-auto">
      {/* 1. Above the Fold */}
      <section className="bg-[#2a2a2a] text-slate-200 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl font-sans w-full">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
          <div className="bg-[#D1F2D6] p-3 rounded-xl text-emerald-800 shadow-sm shrink-0">
            <CircleDollarSign className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">Economic Threshold Calculator</h1>
            <p className="text-sm text-slate-400 mt-1">Determine if it is financially worth spraying by calculating the break-even pest count based on crop value and application costs.</p>
          </div>
        </div>

        {/* Calculator Component */}
        <EconomicThreshold />
      </section>

      {/* 2. Below the Fold (Supporting Context) */}
      <section className="space-y-8 px-2 sm:px-0 text-slate-800">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="mb-4 text-sm leading-relaxed">
            The Economic Threshold (ET) represents the pest population density at which control measures should be initiated to prevent an increasing pest population from reaching the economic injury level (EIL).
          </p>
          <h3 className="font-bold text-slate-800 mb-2 mt-6">Formulas</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 mb-6">
            <li><strong>Gross Crop Value:</strong> Crop Value ($/bu) × Yield Potential (bu/ac)</li>
            <li><strong>Threshold (pests):</strong> Spray Cost / (Gross Crop Value × (Yield Loss % / 100))</li>
          </ul>

          <h3 className="font-bold text-slate-800 mb-2">Assumptions & Limitations</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>Assumes a linear relationship between pest count and yield loss, which may not hold true for extreme infestations.</li>
            <li>Does not account for secondary pest outbreaks or the impact on beneficial insects.</li>
            <li>Assumes 100% efficacy of the spray application, which is rarely achieved in field conditions.</li>
          </ul>
        </div>

        {/* 3. FAQ Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-slate-200 rounded-lg bg-slate-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 font-medium">
                What if my crop value fluctuates during the season?
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">
                You should use the most realistic expected market value at harvest, minus any remaining storage or transport costs. If prices are highly volatile, consider running the calculator with a conservative estimate to ensure you don't over-invest in spray.
              </div>
            </details>
            <details className="group border border-slate-200 rounded-lg bg-slate-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 font-medium">
                Why is the threshold lower when crop prices are high?
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">
                When the crop is worth more, even a small percentage of yield loss translates to a large dollar amount. Therefore, it becomes economically justifiable to spray at lower pest populations to protect that high-value crop.
              </div>
            </details>
          </div>
        </div>

        {/* Related Tools */}
        <div className="pt-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/calculators/spray-window" className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition flex items-center justify-between group">
              <div>
                <div className="font-bold text-slate-900">Spray Timing Window</div>
                <div className="text-xs text-slate-500 mt-1">Check current conditions for application</div>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition">→</div>
            </Link>
            <Link to="/calculators/trap-roi" className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition flex items-center justify-between group">
              <div>
                <div className="font-bold text-slate-900">Trap Count ROI</div>
                <div className="text-xs text-slate-500 mt-1">Estimate value of early detection</div>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition">→</div>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-[10px] text-slate-400 text-center pt-8 border-t border-slate-200 px-4">
          <p>Disclaimer: This calculator provides generalized estimates based on standard agricultural models. Actual economic thresholds may vary by region, specific crop variety, and local environmental conditions. Always consult with a certified agronomist or local extension office before making definitive pesticide application decisions. RUC Pest assumes no liability for crop loss or misapplication.</p>
        </div>
      </section>
    </div>
  );
}
