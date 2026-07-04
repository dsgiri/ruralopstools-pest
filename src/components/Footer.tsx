import React from 'react';
import { ViewState } from '../types';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[10px] font-medium text-slate-500 shrink-0" role="contentinfo">
      <nav className="flex flex-wrap justify-center gap-4 mb-3 sm:mb-0" aria-label="Footer Navigation">
        <button onClick={() => onNavigate('About')} className="hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded p-2 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">About</button>
        <button onClick={() => onNavigate('Contact')} className="hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded p-2 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">Contact</button>
        <button onClick={() => onNavigate('Privacy')} className="hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded p-2 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">Privacy Policy</button>
        <button onClick={() => onNavigate('Legal')} className="hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded p-2 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">Legal</button>
        <button onClick={() => onNavigate('License')} className="hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded p-2 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">License</button>
      </nav>
      <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-400 text-center sm:text-left min-h-[48px]">
        <span className="italic">Guidance is informational only. Verify pesticide labels and regs.</span>
        <div className="hidden sm:block h-3 w-px bg-slate-200 mx-2" aria-hidden="true"></div>
        <span className="hidden sm:block font-bold">Part of Rural Ops Tools System</span>
      </div>
    </footer>
  );
}
