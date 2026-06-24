/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InfoPages from './components/InfoPages';
import { ViewState } from './types';
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

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('Home');
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
      window.gtag('event', 'page_view', { page_path: `/${currentView.toLowerCase()}` });
    }

    // Dynamic SEO Management
    const seoData: Record<ViewState, { title: string; description: string }> = {
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
      License: { title: 'Software License | RUC Pest', description: 'Software licensing information and open source attributions.' },
    };

    const { title, description } = seoData[currentView] || seoData.Home;
    
    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }
  }, [currentView]);

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

  const renderView = () => {
    switch (currentView) {
      case 'Home': return <Dashboard onNavigate={setCurrentView} favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'Risk': return <RiskOverview />;
      case 'Disease': return <DiseaseOverview />;
      case 'Scouting': return <ScoutingLog />;
      case 'Traps': return <TrapTracker />;
      case 'Spray': return <SprayDecision />;
      case 'Alerts': return <AlertsPanel />;
      case 'Favorites': return <FavoritesView onNavigate={setCurrentView} favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'Calculators': return <CalculatorsView />;
      case 'About':
      case 'Contact':
      case 'Legal':
      case 'License':
        return <InfoPages view={currentView} />;
      default: return <Dashboard onNavigate={setCurrentView} favorites={favorites} toggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full text-slate-900 overflow-hidden bg-[#f1f5f9] font-sans">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 animate-in fade-in duration-500" onScroll={handleMainScroll} role="main">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          <div className="flex-1 min-w-0">
            {renderView()}
          </div>
        </div>
      </main>
      <Footer onNavigate={setCurrentView} />
      <CookieBanner />
    </div>
  );
}
