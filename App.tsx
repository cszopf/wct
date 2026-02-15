
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
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

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.AGENT);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentRole={role} 
        onRoleChange={setRole} 
        isScrolled={isScrolled} 
      />
      
      <main>
        <Hero role={role} />
        <TrustBar />
        
        <MarketingStudio />
        
        <TrustSection />
        
        <DynamicValuePanel role={role} />
        
        <div id="tools">
          <PowerTools />
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
      <Analytics />
    </div>
  );
};

export default App;
