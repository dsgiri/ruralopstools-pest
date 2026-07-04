import React, { useState } from 'react';
import { ViewState } from '../types';
import { Bug, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const NAV_ITEMS: { label: string; view: ViewState }[] = [
  { label: 'Risk', view: 'Risk' },
  { label: 'Disease', view: 'Disease' },
  { label: 'Scouting', view: 'Scouting' },
  { label: 'Traps', view: 'Traps' },
  { label: 'Spray', view: 'Spray' },
  { label: 'Alerts', view: 'Alerts' },
  { label: 'Favorites', view: 'Favorites' },
  { label: 'Calculators', view: 'Calculators' }
];

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setIsOpen(false);
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'click', { element: `nav_button_${view}` });
    }
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-2 bg-white border-b border-slate-200 z-50 shadow-sm shrink-0 relative" role="banner">
      <div className="flex items-center gap-4 cursor-pointer min-h-[48px]" onClick={() => handleNav('Home')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleNav('Home')} aria-label="Go to Home">
        <div className="flex items-center bg-emerald-700 text-white px-3 py-2 rounded font-bold text-lg">
          RuralOpsTools
        </div>
        <div className="hidden sm:block h-6 w-px bg-slate-300"></div>
        <div className="flex flex-col justify-center">
          <h1 className="text-lg sm:text-xl font-bold leading-none flex items-center m-0">
            Pest
          </h1>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 h-full" role="navigation" aria-label="Main Navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.view}
            aria-current={currentView === item.view ? 'page' : undefined}
            onClick={() => handleNav(item.view)}
            className={`text-sm font-semibold transition-colors border-b-2 min-h-[48px] flex items-center ${
              currentView === item.view
                ? 'text-emerald-700 border-emerald-700'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:border-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
        <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-sm font-bold text-slate-500 ml-2" aria-hidden="true">
          JD
        </div>
      </nav>

      <div className="flex items-center md:hidden">
        <button
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-500 hover:bg-slate-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden z-50">
          <nav className="px-4 py-2 space-y-1" role="navigation" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                aria-current={currentView === item.view ? 'page' : undefined}
                onClick={() => handleNav(item.view)}
                className={`block w-full text-left px-3 py-3 rounded-md text-sm font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  currentView === item.view
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
