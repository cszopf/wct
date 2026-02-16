
import React from 'react';
import { UserRole } from '../types';
import { ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange, isScrolled }) => {
  const roles = Object.values(UserRole);
  const logoUrl = "https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Official Logo Branding */}
        <a href="/" className="flex items-center">
          <img 
            src={logoUrl} 
            alt="World Class Title" 
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#marketing" className="text-xs font-header font-bold text-slate-600 hover:text-[#004EA8] transition-colors">Marketing Studio</a>
          <a href="#tools" className="text-xs font-header font-bold text-slate-600 hover:text-[#004EA8] transition-colors">Tools</a>
          <a href="#team" className="text-xs font-header font-bold text-slate-600 hover:text-[#004EA8] transition-colors">Our Team</a>
          <a href="#resources" className="text-xs font-header font-bold text-slate-600 hover:text-[#004EA8] transition-colors">Resources</a>
        </nav>

        {/* Right Section */}
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
                  onClick={() => onRoleChange(role)}
                  className={`w-full text-left px-5 py-2.5 text-xs font-header font-bold transition-colors ${
                    currentRole === role ? 'bg-slate-50 text-[#004EA8]' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button className="hidden lg:block px-6 py-2.5 bg-[#004EA8] text-white rounded-full text-xs font-header font-bold hover:bg-[#003375] transition-all hover:shadow-lg active:scale-95">
            Order Title
          </button>
          
          <button className="lg:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
