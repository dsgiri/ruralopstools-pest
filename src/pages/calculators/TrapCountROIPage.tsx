import React from 'react';
import TrapCountROI from '../../components/calculators/TrapCountROI';
import { Link } from 'react-router-dom';
import { BarChart3, ChevronDown } from 'lucide-react';

export default function TrapCountROIPage() {
  return (
    <div className="space-y-12 pb-12 w-full max-w-5xl mx-auto">
      {/* 1. Above the Fold */}
      <section className="bg-[#2a2a2a] text-slate-200 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl font-sans w-full">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
          <div className="bg-[#fce7f3] p-3 rounded-xl text-pink-800 shadow-sm shrink-0">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">Trap Count ROI Estimator</h1>
            <p className="text-sm text-slate-400 mt-1">Calculate the financial value of early pest detection compared to reactive late responses.</p>
          </div>
        </div>

        {/* Calculator Component */}
        <TrapCountROI />
      </section>

      {/* 2. Below the Fold (Supporting Context) */}
      <section className="space-y-8 px-2 sm:px-0 text-slate-800">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="mb-4 text-sm leading-relaxed">
            The Trap Count Return on Investment (ROI) estimator compares the baseline costs of maintaining a physical trap network (labor and materials) against the potential crop loss averted by catching an infestation early.
          </p>
          <h3 className="font-bold text-slate-800 mb-2 mt-6">Formulas</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 mb-6">
            <li><strong>Total Trap Cost:</strong> (Trap Material Cost + Weekly Labor Cost) × Number of Traps</li>
            <li><strong>Saved Crop Value:</strong> Gross Crop Value × Expected Yield Savings Percentage</li>
            <li><strong>Net ROI:</strong> Saved Crop Value - Total Trap Cost</li>
          </ul>

          <h3 className="font-bold text-slate-800 mb-2">Assumptions & Limitations</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>Assumes the early detection directly leads to a highly effective spray application.</li>
            <li>Assumes a standard 12-week monitoring season for labor calculations.</li>
            <li>Does not account for the indirect costs of late sprays, such as increased chemical resistance or secondary pest flare-ups.</li>
          </ul>
        </div>

        {/* 3. FAQ Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-slate-200 rounded-lg bg-slate-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 font-medium">
                Are pheromone traps an effective control method by themselves?
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">
                Generally, no. Except in specific "mating disruption" scenarios, traps are monitoring tools meant to track population density and timing, not to suppress the overall population.
              </div>
            </details>
            <details className="group border border-slate-200 rounded-lg bg-slate-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 font-medium">
                How often should traps be checked?
                <span className="transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed">
                To maximize ROI, traps should typically be checked 1-2 times per week during peak flight seasons. Less frequent checking delays biofix detection, negating the value of the traps.
              </div>
            </details>
          </div>
        </div>

        {/* Related Tools */}
        <div className="pt-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/calculators/degree-days" className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition flex items-center justify-between group">
              <div>
                <div className="font-bold text-slate-900">Degree-Day Tracker</div>
                <div className="text-xs text-slate-500 mt-1">Track thermal accumulation</div>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition">→</div>
            </Link>
            <Link to="/trap-tracker" className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition flex items-center justify-between group">
              <div>
                <div className="font-bold text-slate-900">Trap Logs</div>
                <div className="text-xs text-slate-500 mt-1">Record field trap counts</div>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition">→</div>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-[10px] text-slate-400 text-center pt-8 border-t border-slate-200 px-4">
          <p>Disclaimer: ROI estimates are conceptual and meant for general farm budgeting purposes. Yield savings from early detection are highly variable and depend entirely on the subsequent management actions taken.</p>
        </div>
      </section>
    </div>
  );
}
