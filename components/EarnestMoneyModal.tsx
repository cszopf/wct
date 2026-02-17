
import React from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface EarnestMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATE_LINKS = [
  { name: 'OHIO', url: 'https://keybox.payload.co/world-class-title/payment/world-class-title---ohio' },
  { name: 'FLORIDA', url: 'https://keybox.payload.co/world-class-title/payment/world-class-title---florida' },
  { name: 'PENNSYLVANIA', url: 'https://keybox.payload.co/world-class-title/payment/world-class-title---pa' },
  { name: 'NEW JERSEY', url: 'https://keybox.payload.co/world-class-title/payment/world-class-title-nj' },
  { name: 'VIRGINIA', url: 'https://keybox.payload.com/world-class-title/payment/world-class-title-va' },
  { name: 'All Other States', url: 'https://keybox.payload.co/world-class-title/payment/world-class-title---ohio' },
];

const EarnestMoneyModal: React.FC<EarnestMoneyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#F8F9FA] w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10 text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 lg:p-12 overflow-y-auto">
          {/* Header section matching screenshot style */}
          <div className="text-center mb-10">
            <h3 className="text-[#64CCC9] text-4xl lg:text-5xl font-subheader font-light mb-6">
              Send Earnest Money
            </h3>
            <p className="text-[#004EA8] text-sm lg:text-base font-subheader leading-relaxed max-w-xl mx-auto">
              Earnest money is collected by title companies to protect the interests of both the buyer and the seller in real estate transactions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
            {STATE_LINKS.map((state) => (
              <a
                key={state.name}
                href={state.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 px-6 rounded-lg font-header font-bold text-xs lg:text-sm tracking-widest text-center transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
                  state.name === 'All Other States' 
                  ? 'bg-[#64CCC9] text-white' 
                  : 'bg-[#64CCC9] text-white'
                }`}
              >
                {state.name === 'All Other States' ? state.name : `Send Earnest Money – ${state.name}`}
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </a>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-[#64CCC9]" />
              <span className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">
                Secure Bank Encryption via Keybox
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-subheader max-w-xs text-center opacity-70">
              You will be redirected to our secure payment processor to complete your transaction.
            </p>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="bg-[#E9ECEF] py-4 text-center">
          <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">
            World Class Title | Escrow Services
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarnestMoneyModal;
