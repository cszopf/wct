
import React from 'react';
import { X, ShieldAlert, ShieldCheck, Info } from 'lucide-react';

interface FraudTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FraudTrackerModal: React.FC<FraudTrackerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        
        {/* Header */}
        <div className="p-6 lg:p-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-header font-black text-[#004EA8]">Wire Fraud Tracker</h3>
              <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live Incident Map
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-8 py-4 bg-red-600 text-white flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-red-200" />
            <p className="text-[10px] lg:text-xs font-header font-black uppercase tracking-widest leading-none">
              WCT Security Protocol: Always verify wiring instructions via a direct phone call.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[9px] font-header font-black uppercase">ALTA Best Practices v4.0</span>
          </div>
        </div>

        {/* Map Content */}
        <div className="flex-grow relative bg-slate-100">
          <iframe 
            src="https://www.google.com/maps/d/embed?mid=1cdw8Xxy7bVa2V2EtDXwz3y6glW3X4558&ehbc=2E312F" 
            className="absolute inset-0 w-full h-full border-none"
            title="Fraud Tracker Map"
            loading="lazy"
          />
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <p className="text-[9px] font-header font-black text-slate-400 uppercase tracking-widest text-center sm:text-left">
            Data provided by secure industry monitoring. This map tracks reported wire fraud attempts in real-time.
          </p>
          <button 
            onClick={() => window.open('https://worldclasstitle.com/security', '_blank')}
            className="px-6 py-3 bg-[#004EA8] text-white rounded-full text-[10px] font-header font-black uppercase tracking-widest hover:bg-[#003375] transition-all whitespace-nowrap"
          >
            SECURITY CENTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default FraudTrackerModal;
