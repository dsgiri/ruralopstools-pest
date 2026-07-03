import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setIsVisible(false);
  };

  const handleManage = () => {
    // For now, this can just act similarly or open a modal in the future
    alert('Cookie preferences management coming soon.');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 sm:p-6 shadow-2xl z-[100] flex flex-col sm:flex-row items-center justify-between gap-4" role="dialog" aria-label="Cookie consent">
      <div className="text-white text-sm max-w-4xl font-medium">
        We use cookies to ensure you get the best experience on our website, analyze site traffic, and serve targeted advertisements. By continuing to use our site, you consent to our use of cookies in accordance with our Privacy Policy.
      </div>
      <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
        <button 
          onClick={handleManage}
          className="text-slate-300 hover:text-white px-4 py-3 text-sm font-bold transition-colors min-h-[48px]"
          aria-label="Manage cookies"
        >
          Manage
        </button>
        <button 
          onClick={handleReject}
          className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded text-sm font-bold shadow-sm transition-colors min-h-[48px]"
          aria-label="Reject non-essential cookies"
        >
          Reject All
        </button>
        <button 
          onClick={handleAccept}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded text-sm font-bold shadow-sm transition-colors min-h-[48px]"
          aria-label="Accept cookies"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
