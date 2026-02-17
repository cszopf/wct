
import React, { useState } from 'react';
import { UserRole } from '../types';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isScrolled: boolean;
  onOrderClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange, isScrolled, onOrderClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const roles = Object.values(UserRole);
  const logoUrl = "https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w";

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img 
              src={logoUrl} 
              alt="World Class Title" 
              className="h-8 lg:h-12 w-auto object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#marketing" className="text-xs font-header font-bold text-slate-600 hover:text-[#004EA8] transition-colors">Marketing Studio</a>
            <a href="#tools" className="text-xs font-header font-bold text-slate-600 hover:text-[#004EA8] transition-colors">Tools</a>
            <a href="#team" className="text-xs font-header font-bold text-slate-600 hover:text-[#004EA8] transition-colors">Our Team</a>
            <a href="#resources" className="text-xs font-header font-bold text-slate-600 hover:text-[#004EA8] transition-colors">Resources</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/50 text-xs font-header font-bold text-slate-700 hover:bg-white transition-all">
                <span>FOR: <span className="text-[#004EA8]">{currentRole}</span></span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 overflow-hidden z-[60]">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => { onRoleChange(role); }}
                    className={`w-full text-left px-5 py-2.5 text-xs font-header font-bold transition-colors ${
                      currentRole === role ? 'bg-slate-50 text-[#004EA8]' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={onOrderClick}
              className="hidden lg:block px-6 py-2.5 bg-[#004EA8] text-white rounded-full text-xs font-header font-bold hover:bg-[#003375] transition-all hover:shadow-lg active:scale-95"
            >
              Order Title
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />
      <div 
        className={`fixed top-0 right-0 bottom-0 z-[110] w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b border-slate-100">
            <img src={logoUrl} alt="WCT" className="h-8 w-auto object-contain" />
            <button onClick={closeMenu} className="p-2 text-slate-400 hover:text-slate-900">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto py-8 px-6 space-y-8">
            <div className="space-y-1">
              <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mb-4">Navigation</p>
              <a href="#marketing" onClick={closeMenu} className="block py-3 text-lg font-header font-black text-[#004EA8]">Marketing Studio</a>
              <a href="#tools" onClick={closeMenu} className="block py-3 text-lg font-header font-black text-[#004EA8]">Power Tools</a>
              <a href="#team" onClick={closeMenu} className="block py-3 text-lg font-header font-black text-[#004EA8]">Our Team</a>
              <a href="#resources" onClick={closeMenu} className="block py-3 text-lg font-header font-black text-[#004EA8]">Education Hub</a>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mb-4">View Experience As:</p>
              <div className="grid grid-cols-1 gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => { onRoleChange(role); closeMenu(); }}
                    className={`flex items-center justify-between px-5 py-3 rounded-xl border text-xs font-header font-bold transition-all ${
                      currentRole === role 
                      ? 'bg-[#004EA8] border-[#004EA8] text-white' 
                      : 'bg-slate-50 border-slate-100 text-slate-600'
                    }`}
                  >
                    {role}
                    {currentRole === role && <ArrowRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100">
            <button 
              onClick={() => { onOrderClick?.(); closeMenu(); }}
              className="w-full py-4 bg-[#004EA8] text-white rounded-full text-xs font-header font-black tracking-widest hover:bg-[#003375] transition-all shadow-lg"
            >
              ORDER TITLE NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
