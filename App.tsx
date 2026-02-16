
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
import { X, ShieldCheck, Key, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react';

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

// Fix: Added missing default export and completed the component structure
const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.AGENT);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isEarnestOpen, setIsEarnestOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [envError, setEnvError] = useState<string | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // Check for key in current process.env
      const envKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;
      
      // Check for AI Studio environment
      const isAIStudio = !!(window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function');
      
      if (isAIStudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        // If we have an env key OR the user has selected one, we are good
        setHasKey(!!envKey || selected);
      } else {
        // In standard environments, we rely strictly on process.env.API_KEY
        if (!!envKey) {
          setHasKey(true);
        } else {
          setHasKey(false);
          setEnvError("Environment configuration missing: API_KEY is required for live deployment.");
        }
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
      try {
        await window.aistudio.openSelectKey();
        // Race condition: assume success as per instructions
        setHasKey(true);
      } catch (err) {
        console.error("Key selection failed", err);
      }
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#004EA8]/10 border-t-[#004EA8] rounded-full animate-spin" />
          <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">WCT Secure Initializing...</p>
        </div>
      </div>
    );
  }

  if (hasKey === false) {
    const isAIStudio = !!(window.aistudio && typeof window.aistudio.openSelectKey === 'function');

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl p-12 lg:p-16 border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#64CCC9]/10 to-transparent" />
          
          <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 ring-8 ring-teal-50/50">
            <ShieldCheck className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-header font-extrabold text-[#004EA8] mb-6">WCT Secure Access</h1>
          
          {envError && !isAIStudio ? (
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl mb-8 flex items-start gap-4 text-left">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <p className="font-header font-black text-xs text-red-700 uppercase tracking-widest mb-2">Configuration Required</p>
                <p className="text-xs text-red-600 leading-relaxed font-subheader">
                  This application requires an <code className="bg-red-100 px-1.5 py-0.5 rounded">API_KEY</code> environment variable to function. Please configure your hosting environment to provide this variable.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 font-subheader leading-relaxed mb-10">
              To activate our proprietary <span className="text-[#004EA8] font-bold">Smart Audit™</span> and growth tools, a secure project connection is required.
            </p>
          )}
          
          <div className="space-y-4">
            {isAIStudio && (
              <button 
                onClick={handleConnectKey}
                className="w-full py-6 bg-[#004EA8] text-white rounded-full font-header font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-[#003375] transition-all flex items-center justify-center gap-4 group"
              >
                <Key className="w-5 h-5" />
                Connect Secure Key
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-header font-black text-slate-400 hover:text-[#004EA8] transition-colors uppercase tracking-widest"
            >
              Billing Documentation
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-50">
             <img 
               src="https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w" 
               alt="WCT" 
               className="h-6 mx-auto opacity-30 grayscale"
             />
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
        <TeamSection />
        <EducationHub role={role} />
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
