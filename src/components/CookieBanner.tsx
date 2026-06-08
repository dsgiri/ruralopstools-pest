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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 sm:p-6 shadow-2xl z-[100] flex flex-col sm:flex-row items-center justify-between gap-4" role="dialog" aria-label="Cookie consent">
      <div className="text-white text-sm max-w-4xl font-medium">
        We use cookies to ensure you get the best experience on our website, analyze site traffic, and serve targeted advertisements. By continuing to use our site, you consent to our use of cookies in accordance with our Privacy Policy.
      </div>
      <div className="flex gap-3 flex-shrink-0">
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
