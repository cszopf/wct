
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import TrustSection from './components/TrustSection';
import MarketingStudio from './components/MarketingStudio';
import DynamicValuePanel from './components/DynamicValuePanel';
import PowerTools from './components/PowerTools';
import TeamSection from './components/TeamSection';
import SmartOneSection from './components/SmartOneSection';
import EducationHub from './components/EducationHub';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import ClosingGuard from './components/ClosingGuard';
import OrderTitleModal from './components/OrderTitleModal';
import EarnestMoneyModal from './components/EarnestMoneyModal';
import { X, ShieldCheck, Key, ArrowRight, ExternalLink } from 'lucide-react';

const QuoteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl h-[80vh] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-slate-100 rounded-full transition-colors z-10 text-slate-900 border border-slate-200">
          <X className="w-6 h-6" />
        </button>
        <iframe 
          src="https://www.worldclasstitle.com/get-a-quote" 
          className="w-full h-full border-none"
          title="Get a Quote"
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.AGENT);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isEarnestOpen, setIsEarnestOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else {
        // Fallback for non-AI Studio environments
        setHasKey(!!process.env.API_KEY);
      }
    };
    checkKey();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // Assume success after trigger per instructions to avoid race conditions
      setHasKey(true);
    }
  };

  const handleToolAction = (action: string) => {
    switch(action) {
      case 'Order Title':
        setIsOrderOpen(true);
        break;
      case 'Earnest Money':
        setIsEarnestOpen(true);
        break;
      case 'Fraud Tracker':
        window.open('https://worldclasstitle.com/security', '_blank');
        break;
      case 'Schedule Closing':
        window.open('https://www.worldclasstitle.com/schedule-closing', '_blank');
        break;
      case 'Marketing Studio':
        document.getElementById('marketing')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Smart Login':
        window.open('https://smarttitle.space/', '_blank');
        break;
    }
  };

  if (hasKey === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#004EA8]/10 border-t-[#004EA8] rounded-full animate-spin" />
      </div>
    );
  }

  if (hasKey === false) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center relative overflow-hidden border border-slate-100">
          <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 ring-8 ring-teal-50/50">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-header font-extrabold text-[#004EA8] mb-4 tracking-tight">WCT Secure Connection</h1>
          <p className="text-slate-500 font-subheader mb-10 leading-relaxed">
            To activate our proprietary <span className="font-bold text-[#004EA8]">Smart Audit™</span> engine and growth tools, please connect your secure API key.
          </p>
          <div className="space-y-4">
            <button 
              onClick={handleConnectKey}
              className="w-full py-6 bg-[#004EA8] text-white rounded-full font-header font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-[#003375] transition-all flex items-center justify-center gap-4 group"
            >
              <Key className="w-5 h-5" />
              Connect Secure Key
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              className="inline-flex items-center gap-2 text-[10px] font-header font-black text-slate-400 hover:text-[#004EA8] transition-colors uppercase tracking-widest"
            >
              Billing Documentation <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentRole={role} 
        onRoleChange={setRole} 
        isScrolled={isScrolled} 
        onOrderClick={() => setIsOrderOpen(true)}
      />
      
      <main>
        <Hero role={role} onOpenQuote={() => setIsQuoteOpen(true)} />
        <TrustBar />
        <MarketingStudio />
        <TrustSection />
        <ClosingGuard />
        <DynamicValuePanel role={role} />
        <div id="tools">
          <PowerTools onToolClick={handleToolAction} />
        </div>
        <SmartOneSection />
        <div id="team">
          <TeamSection />
        </div>
        <div id="resources">
          <EducationHub role={role} />
        </div>
      </main>

      <Footer />
      <Assistant role={role} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <OrderTitleModal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} />
      <EarnestMoneyModal isOpen={isEarnestOpen} onClose={() => setIsEarnestOpen(false)} />
    </div>
  );
};

export default App;
