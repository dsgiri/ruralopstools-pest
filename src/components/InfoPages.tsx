import React from 'react';
import { ViewState } from '../types';

interface InfoPagesProps {
  view: ViewState;
}

export default function InfoPages({ view }: InfoPagesProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
      <div className="p-6 sm:p-8">
        {view === 'About' && (
          <div className="space-y-4 text-slate-700 max-w-none">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 border-b border-slate-100 pb-4">About Pest</h2>
            <p className="text-sm font-medium leading-relaxed">
              Pest is an integrated pest management and pest risk decision-support hub, proudly part of the Rural Ops Tools ecosystem.
            </p>
            <p className="text-xs leading-relaxed">
              Our mission is to help farmers, crop advisers, and rural producers monitor pest risk, disease risk, insect pressure, spray timing, and weather-linked risk. 
            </p>
            <p className="text-xs leading-relaxed">
              By utilizing actionable risk cards, scouting tools, and tracking metrics, we aim to support decision-making that reduces unnecessary sprays, improves intervention timing, and encourages effective Integrated Pest Management (IPM) practices.
            </p>
          </div>
        )}

        {view === 'Legal' && (
          <div className="space-y-4 text-slate-700 max-w-none">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 border-b border-slate-100 pb-4">Legal & Terms</h2>
            <div className="bg-amber-50 border border-amber-200 p-4 mb-6 rounded flex items-start gap-3">
              <span className="text-amber-500 font-bold">⚠</span>
              <div>
                <h3 className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-1">Informational Purposes Only</h3>
                <p className="text-amber-900 text-xs font-medium">
                  All pest guidance provided within this application is for informational support only. The results are based on forecasting models and simulated pressure indices.
                </p>
              </div>
            </div>
            <ul className="space-y-3 pl-4 list-[square] text-xs font-medium text-slate-600">
              <li>Thresholds, resistance management strategies, official pesticide labels, and local regulations <strong className="text-slate-900">always govern</strong> pest control decisions.</li>
              <li>This app does not replace professional agronomy, legal, insurance, or safety advice.</li>
              <li>Users are entirely responsible for verifying critical operational decisions independently.</li>
              <li>We assume no liability for crop damage, off-target impacts, or misapplied treatments resulting from the use of these tools.</li>
            </ul>
          </div>
        )}

        {view === 'License' && (
          <div className="space-y-4 text-slate-700 max-w-none">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 border-b border-slate-100 pb-4">License</h2>
            <p className="text-xs font-medium leading-relaxed">
              The use of applications hosted under ruralopstools.com is subject to our master licensing agreement. Data inputs remain the property of the user, while the forecasting models and structural software remain proprietary where applicable.
            </p>
          </div>
        )}

        {view === 'Privacy' && (
          <div className="space-y-4 text-slate-700 max-w-none">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 border-b border-slate-100 pb-4">Privacy Policy</h2>
            <p className="text-xs leading-relaxed">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <h3 className="text-sm font-bold text-slate-800 mt-4">1. Information We Collect</h3>
            <p className="text-xs leading-relaxed">
              We collect information you provide directly to us when you use our application, such as pest scouting logs, trap counts, field names, and usage data. We may also collect standard technical information such as your IP address, browser type, and interactions with the application.
            </p>
            <h3 className="text-sm font-bold text-slate-800 mt-4">2. How We Use Your Information</h3>
            <p className="text-xs leading-relaxed">
              We use the information we collect to provide, maintain, and improve our pest management dashboard, to compute pest risk models, and to save your preferences locally. We may also use this information for analytical purposes and to display relevant advertisements.
            </p>
            <h3 className="text-sm font-bold text-slate-800 mt-4">3. Data Storage and Local Storage</h3>
            <p className="text-xs leading-relaxed">
              Much of the data you enter (such as scouting logs and trap records) is stored locally on your device via browser localStorage to ensure privacy and offline capabilities. Clearing your browser data may result in the loss of this information.
            </p>
            <h3 className="text-sm font-bold text-slate-800 mt-4">4. Third-Party Services and Advertising</h3>
            <p className="text-xs leading-relaxed">
              We may use third-party advertising partners (such as Google AdSense) to serve ads when you visit our website. These companies may use cookies and similar technologies to collect non-personal information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <h3 className="text-sm font-bold text-slate-800 mt-4">5. Your Choices</h3>
            <p className="text-xs leading-relaxed">
              You can manage your cookie preferences through our cookie banner or your browser settings. You may also clear your local storage at any time, though this will delete your saved application data.
            </p>
            <h3 className="text-sm font-bold text-slate-800 mt-4">6. Contact Us</h3>
            <p className="text-xs leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@ruralopstools.com.
            </p>
          </div>
        )}

        {view === 'Contact' && (
          <div className="space-y-4 text-slate-700 max-w-none">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 border-b border-slate-100 pb-4">Contact Us</h2>
            <p className="text-xs font-medium leading-relaxed mb-6">
              For support, inquiries, or feedback regarding the Pest module, please contact the network administration.
            </p>
            <div className="bg-slate-50 p-6 rounded border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
              <a href="mailto:support@ruralopstools.com" className="text-emerald-700 hover:underline block mb-5 text-sm font-bold">support@ruralopstools.com</a>
              
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Parent Network</p>
              <a href="https://ruralopstools.com" className="text-emerald-700 hover:underline text-sm font-bold">ruralopstools.com</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
