
import React, { useState } from 'react';
// Added Search to the list of icons imported from lucide-react
import { X, MapPin, User, FileText, Upload, ArrowRight, Loader2, CheckCircle2, Search } from 'lucide-react';

interface OrderTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderTitleModal: React.FC<OrderTitleModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-2xl font-header font-black text-[#004EA8]">Order Title</h3>
            <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mt-1">Start Your New Closing</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-3xl font-header font-black text-slate-900 mb-4">Order Received!</h4>
            <p className="text-slate-500 font-subheader mb-8 leading-relaxed">
              Your title order has been submitted to our processing team. You'll receive an email confirmation and a link to your Smart Dashboard shortly.
            </p>
            <button 
              onClick={onClose}
              className="px-12 py-4 bg-[#004EA8] text-white rounded-full font-header font-black text-xs tracking-widest hover:bg-[#003375] transition-all"
            >
              CLOSE WINDOW
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
            <div className="flex-grow overflow-y-auto p-10 space-y-10">
              {/* Step 1: Property Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-[#004EA8]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest">Property Information</h4>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="Search Property Address..." 
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-header font-bold focus:outline-none focus:ring-2 focus:ring-[#004EA8]/10 focus:border-[#004EA8] transition-all"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Step 2: People Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-[#004EA8]">
                    <User className="w-4 h-4" />
                  </div>
                  <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest">Transaction Parties</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Agent Name / Company</label>
                    <input type="text" required className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Lender Name (Optional)</label>
                    <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Buyer Name(s)</label>
                    <input type="text" required className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Seller Name(s)</label>
                    <input type="text" required className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" />
                  </div>
                </div>
              </div>

              {/* Step 3: Document Upload */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-[#004EA8]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest">Upload Contract & Docs</h4>
                </div>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl cursor-pointer hover:border-[#64CCC9] hover:bg-white transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#64CCC9] mb-2" />
                    <p className="text-[10px] font-header font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900">Drag & Drop or Click to Upload</p>
                  </div>
                  <input type="file" className="hidden" multiple />
                </label>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 shrink-0">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#004EA8] text-white rounded-full font-header font-black text-sm tracking-widest hover:bg-[#003375] transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    SUBMITTING ORDER...
                  </>
                ) : (
                  <>
                    SUBMIT TITLE ORDER
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderTitleModal;
