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
import OrderTitleModal from './components/OrderTitleModal';
import EarnestMoneyModal from './components/EarnestMoneyModal';
import FraudTrackerModal from './components/FraudTrackerModal';
import BrandGuidelinesModal from './components/BrandGuidelinesModal';
import { getPortalDestination } from './utils';
import { X, Zap } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const QuoteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl h-[80vh] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-6 lg:p-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="text-xl lg:text-2xl font-header font-black text-[#004EA8]">Get a Quote</h3>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow relative bg-slate-100">
          <iframe 
            src="https://worldclasstitle.titlecapture.com/login" 
            className="absolute inset-0 w-full h-full border-none"
            title="Get a Quote"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

const DemoModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-blue-50 text-[#004EA8] rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-header font-black text-[#004EA8] mb-4">Demo Experience</h3>
        <p className="text-slate-600 font-subheader mb-8">
          This is a demonstration of the World Class Title digital experience. Some features may be limited in this preview environment.
        </p>
        <button 
          onClick={onConfirm}
          className="w-full py-4 bg-[#004EA8] text-white rounded-full font-header font-bold text-sm hover:bg-[#003375] transition-all"
        >
          GOT IT
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wct_active_role');
      if (saved) {
        const found = Object.values(UserRole).find(r => r.toLowerCase() === saved.toLowerCase());
        if (found) return found;
      }
    }
    return UserRole.BUYER;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isEarnestOpen, setIsEarnestOpen] = useState(false);
  const [isFraudOpen, setIsFraudOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [pendingLink, setPendingLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('wct_active_role', newRole.toLowerCase());
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
        setIsFraudOpen(true);
        break;
      case 'Schedule Closing':
        window.open('https://worldclasstitle.as.me/schedule/7dabae28', '_blank');
        break;
      case 'Marketing Studio':
        const marketingEl = document.getElementById('marketing');
        if (marketingEl) marketingEl.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Smart Login':
        window.location.href = getPortalDestination(role);
        break;
    }
  };

  const handleHeroCTAClick = (currentRole: UserRole) => {
    const destination = getPortalDestination(currentRole);
    setPendingLink(destination);
    setIsDemoOpen(true);
  };

  const handleDemoConfirm = () => {
    if (pendingLink) {
      window.location.href = pendingLink;
    }
    setIsDemoOpen(false);
    setPendingLink('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentRole={role} 
        onRoleChange={handleRoleChange} 
        isScrolled={isScrolled} 
        onOrderClick={() => setIsOrderOpen(true)}
      />
      
      <main>
        <Hero 
          role={role} 
          onOpenQuote={() => setIsQuoteOpen(true)} 
          onHeroCTAClick={handleHeroCTAClick}
        />
        <TrustBar />
        <MarketingStudio />
        <TrustSection />
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

      <Footer onBrandClick={() => setIsBrandOpen(true)} />
      
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <OrderTitleModal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} />
      <EarnestMoneyModal isOpen={isEarnestOpen} onClose={() => setIsEarnestOpen(false)} />
      <FraudTrackerModal isOpen={isFraudOpen} onClose={() => setIsFraudOpen(false)} />
      <BrandGuidelinesModal isOpen={isBrandOpen} onClose={() => setIsBrandOpen(false)} />
      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        onConfirm={handleDemoConfirm}
      />
      <SpeedInsights />
    </div>
  );
};

export default App;