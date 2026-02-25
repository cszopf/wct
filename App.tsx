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
import SellerAuthModal from './components/SellerAuthModal';
import SellerAuthPage from './components/SellerAuthPage';
import { getPortalDestination } from './utils';
import { X, Zap } from 'lucide-react';

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
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isEarnestOpen, setIsEarnestOpen] = useState(false);
  const [isFraudOpen, setIsFraudOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isSellerAuthOpen, setIsSellerAuthOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [pendingLink, setPendingLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Check for /sellerauth path
    if (window.location.pathname === '/sellerauth') {
      setIsSellerAuthOpen(true);
    }

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
      case 'Seller Auth':
        setIsSellerAuthOpen(true);
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

  // Route Handling
  if (typeof window !== 'undefined' && window.location.pathname === '/sellerauth') {
    return <SellerAuthPage />;
  }

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
          onOpenQuote={() => window.open('https://worldclasstitle.titlecapture.com/login', '_blank')} 
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
      
      <OrderTitleModal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} />
      <EarnestMoneyModal isOpen={isEarnestOpen} onClose={() => setIsEarnestOpen(false)} />
      <FraudTrackerModal isOpen={isFraudOpen} onClose={() => setIsFraudOpen(false)} />
      <BrandGuidelinesModal isOpen={isBrandOpen} onClose={() => setIsBrandOpen(false)} />
      <SellerAuthModal isOpen={isSellerAuthOpen} onClose={() => setIsSellerAuthOpen(false)} />
      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        onConfirm={handleDemoConfirm}
      />
    </div>
  );
};

export default App;