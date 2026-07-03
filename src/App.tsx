/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { useLocation, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InfoPages from './components/InfoPages';
import Dashboard from './components/Dashboard';
import RiskOverview from './components/RiskOverview';
import DiseaseOverview from './components/DiseaseOverview';
import ScoutingLog from './components/ScoutingLog';
import TrapTracker from './components/TrapTracker';
import SprayDecision from './components/SprayDecision';
import AlertsPanel from './components/AlertsPanel';
import FavoritesView from './components/FavoritesView';
import CalculatorsView from './components/CalculatorsView';
import CookieBanner from './components/CookieBanner';

// Import individual calculators
import GDDCumulationPage from './pages/calculators/GDDCumulationPage';
import EconomicThresholdPage from './pages/calculators/EconomicThresholdPage';
import SprayTimingWindowPage from './pages/calculators/SprayTimingWindowPage';
import TrapCountROIPage from './pages/calculators/TrapCountROIPage';

import { ViewState } from './types';

const routeMap: Record<string, ViewState> = {
  '/': 'Home',
  '/risk-forecast': 'Risk',
  '/disease-models': 'Disease',
  '/scouting-log': 'Scouting',
  '/trap-tracker': 'Traps',
  '/spray-decision': 'Spray',
  '/alerts': 'Alerts',
  '/favorites': 'Favorites',
  '/calculators': 'Calculators',
  '/about': 'About',
  '/contact': 'Contact',
  '/legal': 'Legal',
  '/privacy': 'Privacy',
  '/license': 'License'
};

const viewToPathMap: Record<ViewState, string> = {
  Home: '/',
  Risk: '/risk-forecast',
  Disease: '/disease-models',
  Scouting: '/scouting-log',
  Traps: '/trap-tracker',
  Spray: '/spray-decision',
  Alerts: '/alerts',
  Favorites: '/favorites',
  Calculators: '/calculators',
  About: '/about',
  Contact: '/contact',
  Legal: '/legal',
  Privacy: '/privacy',
  License: '/license'
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Helper to determine the current view based on path
  const getCurrentView = (path: string): ViewState => {
    if (path.startsWith('/calculators/')) return 'Calculators';
    return routeMap[path] || 'Home';
  };

  const currentView: ViewState = getCurrentView(location.pathname);

  // Shim to keep existing components that expect onNavigate to work
  const setCurrentView = (view: ViewState) => {
    navigate(viewToPathMap[view] || '/');
  };

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pest_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pest_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'page_view', { page_path: location.pathname });
    }

    // Dynamic SEO Management
    const seoData: Record<ViewState | string, { title: string; description: string }> = {
      Home: { title: 'Pest Management Dashboard | RUC Pest', description: 'Overview of pest risks, scouting logs, and agricultural compliance.' },
      Risk: { title: 'Pest Risk Forecast | RUC Pest', description: 'Advanced degree-day accumulation and pest risk forecasting.' },
      Disease: { title: 'Crop Disease Models | RUC Pest', description: 'Monitor infection conditions and plant disease outbreak probabilities.' },
      Scouting: { title: 'Field Scouting Logs | RUC Pest', description: 'Digital scouting records, pest identification, and field observation logs.' },
      Traps: { title: 'Trap Count Tracker | RUC Pest', description: 'Record and visualize pheromone trap counts for moth flights and insect swarms.' },
      Spray: { title: 'Spray Records & Compliance | RUC Pest', description: 'Manage EPA-compliant spray records and pesticide application logs.' },
      Alerts: { title: 'Threshold Alerts | RUC Pest', description: 'Automated push alerts for economic pest thresholds and weather risks.' },
      Favorites: { title: 'Favorite Tools | RUC Pest', description: 'Quick access to your most used pest management tools.' },
      Calculators: { title: 'Agricultural ROI Calculators | RUC Pest', description: 'Interactive tools for economic thresholds, spray timing, and GDD accumulation.' },
      About: { title: 'About Us | RUC Pest', description: 'Learn about RUC Pest and our mission to optimize pest management.' },
      Contact: { title: 'Contact Support | RUC Pest', description: 'Get in touch with the RUC Pest support and agricultural advisory team.' },
      Legal: { title: 'Terms & Privacy | RUC Pest', description: 'Legal terms, privacy policy, and compliance information for RUC Pest.' },
      Privacy: { title: 'Privacy Policy | RUC Pest', description: 'Privacy policy detailing data collection, usage, and storage for RUC Pest.' },
      License: { title: 'Software License | RUC Pest', description: 'Software licensing information and open source attributions.' },
      '/calculators/degree-days': { title: 'GDD Calculator | RUC Pest', description: 'Degree-day accumulation calculator.' },
      '/calculators/economic-threshold': { title: 'Economic Threshold Calculator | RUC Pest', description: 'Economic threshold calculator for spraying.' },
      '/calculators/spray-window': { title: 'Spray Timing Window | RUC Pest', description: 'Spray timing window checker.' },
      '/calculators/trap-roi': { title: 'Trap Count ROI | RUC Pest', description: 'Trap count ROI estimator.' },
    };

    const data = seoData[location.pathname] || seoData[currentView] || seoData.Home;
    
    document.title = data.title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', data.description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', data.description);
      document.head.appendChild(metaDesc);
    }
  }, [currentView, location.pathname]);

  const handleMainScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.scrollHeight === target.clientHeight) return; // avoid divide by zero if no scroll
    const scrollPercent = Math.round((target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100);
    if (scrollPercent >= 50 && scrollPercent <= 52) {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-ignore
        window.gtag('event', 'scroll', { percent: 50 });
      }
    }
  };

  const toggleFavorite = (toolId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  return (
    <div className="flex flex-col h-screen w-full text-slate-900 overflow-hidden bg-[#f1f5f9] font-sans">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 animate-in fade-in duration-500" onScroll={handleMainScroll} role="main">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-6">
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <Routes>
              <Route path="/" element={<Dashboard onNavigate={setCurrentView} favorites={favorites} toggleFavorite={toggleFavorite} />} />
              <Route path="/risk-forecast" element={<RiskOverview onNavigate={setCurrentView} />} />
              <Route path="/disease-models" element={<DiseaseOverview onNavigate={setCurrentView} />} />
              <Route path="/scouting-log" element={<ScoutingLog />} />
              <Route path="/trap-tracker" element={<TrapTracker />} />
              <Route path="/spray-decision" element={<SprayDecision />} />
              <Route path="/alerts" element={<AlertsPanel />} />
              <Route path="/favorites" element={<FavoritesView onNavigate={setCurrentView} favorites={favorites} toggleFavorite={toggleFavorite} />} />
              
              <Route path="/calculators" element={<CalculatorsView />} />
              <Route path="/calculators/degree-days" element={<GDDCumulationPage />} />
              <Route path="/calculators/economic-threshold" element={<EconomicThresholdPage />} />
              <Route path="/calculators/spray-window" element={<SprayTimingWindowPage />} />
              <Route path="/calculators/trap-roi" element={<TrapCountROIPage />} />

              <Route path="/about" element={<InfoPages view="About" />} />
              <Route path="/contact" element={<InfoPages view="Contact" />} />
              <Route path="/privacy" element={<InfoPages view="Privacy" />} />
              <Route path="/legal" element={<InfoPages view="Legal" />} />
              <Route path="/license" element={<InfoPages view="License" />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer onNavigate={setCurrentView} />
      <CookieBanner />
    </div>
  );
}
