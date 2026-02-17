
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
import ListingArchitect from './components/ListingArchitect';
import ClosingGuard from './components/ClosingGuard';
import OrderTitleModal from './components/OrderTitleModal';
import EarnestMoneyModal from './components/EarnestMoneyModal';
import { X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        const marketingEl = document.getElementById('marketing');
        if (marketingEl) marketingEl.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Smart Login':
        window.open('https://smarttitle.space/', '_blank');
        break;
    }
  };

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
        <ListingArchitect />
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
