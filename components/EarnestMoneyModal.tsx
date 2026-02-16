
import React, { useState } from 'react';
import { X, Landmark, ChevronRight, ShieldCheck, CreditCard } from 'lucide-react';

const STATES = [
  'Ohio', 'Michigan', 'Pennsylvania', 'New Jersey', 'Florida', 
  'Kentucky', 'Indiana', 'Virginia', 'Tennessee'
];

interface EarnestMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EarnestMoneyModal: React.FC<EarnestMoneyModalProps> = ({ isOpen, onClose }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-header font-black text-[#004EA8]">Earnest Money</h3>
            <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mt-1">Secure Bank Transfer via Stripe</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        <div className="p-8">
          {!selectedState ? (
            <>
              <p className="text-sm text-slate-500 font-subheader mb-6">
                Please select the state where the property is located to ensure your funds are routed to the correct escrow account.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {STATES.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#64CCC9] hover:bg-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-[#64CCC9]">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <span className="font-header font-bold text-xs text-slate-700">{state}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#64CCC9]" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-header font-black text-slate-900 mb-2">Routing to {selectedState} Escrow</h4>
              <p className="text-sm text-slate-500 mb-8 font-subheader leading-relaxed">
                We use Stripe Bank Pay for secure, direct earnest money transfers. You will be redirected to Stripe to securely link your bank account.
              </p>
              <button 
                onClick={() => window.open('https://stripe.com/payments/bank-transfers', '_blank')}
                className="w-full py-5 bg-[#004EA8] text-white rounded-full font-header font-black text-xs tracking-widest hover:bg-[#003375] transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                PROCEED TO STRIPE SECURE PAY
                <CreditCard className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setSelectedState(null)}
                className="mt-4 text-[10px] font-header font-black text-slate-400 uppercase tracking-widest hover:text-[#004EA8]"
              >
                Change State
              </button>
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-6 flex items-center justify-center gap-4 border-t border-slate-100">
          <div className="flex items-center gap-2 opacity-40">
            <div className="h-4 w-12 bg-slate-300 rounded" />
            <div className="h-4 w-12 bg-slate-300 rounded" />
          </div>
          <span className="text-[9px] font-header font-black text-slate-400 uppercase tracking-widest">Bank-Grade 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default EarnestMoneyModal;
