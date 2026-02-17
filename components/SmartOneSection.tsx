
import React, { useState } from 'react';
import { Smartphone, Home, Shield, Bell, AlertCircle } from 'lucide-react';

const SmartOneSection: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleActivate = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <section className="py-24 bg-blue-600 text-white rounded-[4rem] mx-6 mb-24 overflow-hidden relative">
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6">
              <Smartphone className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">WCT Smart One™</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">Your Home. Managed. Protected. Connected.</h2>
            <p className="text-lg lg:text-xl text-blue-100 mb-10 leading-relaxed max-w-xl">
              Our service doesn't end at the closing table. Smart One is your lifelong homeownership dashboard, providing protection alerts and concierge services.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12 w-full max-w-2xl text-left">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-blue-200 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Title Protection</h4>
                  <p className="text-sm text-blue-100">Instant alerts for any activity on your property title.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Bell className="w-6 h-6 text-blue-200 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Utility Concierge</h4>
                  <p className="text-sm text-blue-100">Seamless setup for water, electric, and internet.</p>
                </div>
              </div>
            </div>

            <div className="relative inline-block w-full sm:w-auto">
              <button 
                onClick={handleActivate}
                className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all hover:shadow-xl active:scale-[0.98]"
              >
                Activate Smart One (Free 90 Days)
              </button>
              {showNotification && (
                <div className="absolute top-full mt-4 left-0 right-0 bg-slate-900 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5 text-[#64CCC9]" />
                  <p className="text-xs font-bold whitespace-nowrap">Coming Soon to your Dashboard!</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
             {/* Mock Phone App UI */}
             <div className="bg-slate-900 w-[260px] sm:w-[300px] h-[520px] sm:h-[600px] rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col scale-90 sm:scale-100">
                <div className="h-6 w-1/3 bg-slate-800 rounded-b-2xl mx-auto mb-4" />
                <div className="px-6 flex-grow">
                   <div className="h-8 w-1/2 bg-slate-800 rounded-full mb-8" />
                   <div className="aspect-square bg-blue-500 rounded-3xl mb-8 flex items-center justify-center">
                      <Home className="w-20 h-20 text-white" />
                   </div>
                   <div className="space-y-4">
                      <div className="h-12 w-full bg-slate-800 rounded-2xl" />
                      <div className="h-12 w-full bg-slate-800 rounded-2xl" />
                      <div className="h-12 w-full bg-slate-800 rounded-2xl" />
                   </div>
                </div>
                <div className="p-6 bg-slate-800">
                   <div className="h-1 w-1/3 bg-slate-700 rounded-full mx-auto" />
                </div>
             </div>
             
             {/* Floating Achievement - Hidden on very small screens */}
             <div className="hidden sm:flex absolute top-20 right-0 bg-white p-4 rounded-2xl shadow-2xl text-slate-900 items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                   <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protected</p>
                   <p className="text-sm font-bold">Title Shield Active</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartOneSection;
