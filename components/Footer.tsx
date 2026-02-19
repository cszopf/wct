import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Facebook, Instagram, ExternalLink } from 'lucide-react';

interface FooterProps {
  onBrandClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBrandClick }) => {
  const licensedStates = [
    'Ohio', 'Michigan', 'Pennsylvania', 'New Jersey', 'Florida', 
    'Kentucky', 'Indiana', 'Virginia', 'Tennessee'
  ];

  const logoUrl = "https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w";

  return (
    <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8">
              <img 
                src={logoUrl} 
                alt="World Class Title" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-slate-500 font-subheader mb-10 leading-relaxed text-sm">
              Ohio's highest-rated title agency. Delivering a modern closing experience powered by Smart technology and human expertise.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/worldclasstitle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-[#004EA8] hover:text-white hover:border-[#004EA8] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/worldclasstitle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-[#004EA8] hover:text-white hover:border-[#004EA8] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest mb-8">Licensed States</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {licensedStates.map(state => (
                <div key={state} className="flex items-center gap-2 text-sm font-subheader font-semibold text-slate-500">
                  <div className="w-1 h-1 bg-[#64CCC9] rounded-full" />
                  {state}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm font-subheader font-semibold text-slate-500">
              <li><a href="#marketing" className="hover:text-[#004EA8] transition-colors">Marketing Studio</a></li>
              <li><a href="#tools" className="hover:text-[#004EA8] transition-colors">Growth Dashboard</a></li>
              <li><a href="#resources" className="hover:text-[#004EA8] transition-colors">Market Insights</a></li>
              <li><a href="#team" className="hover:text-[#004EA8] transition-colors">Team Directory</a></li>
              <li>
                <button 
                  onClick={(e) => { e.preventDefault(); onBrandClick(); }} 
                  className="hover:text-[#004EA8] transition-colors text-left outline-none"
                >
                  WCT Brand Guidelines
                </button>
              </li>
              <li>
                <a 
                  href="https://smarttitleventures.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#004EA8] transition-colors flex items-center gap-1.5 text-[#64CCC9] font-bold"
                >
                  Smart Title Ventures
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest mb-8">Contact</h4>
            <ul className="space-y-6 text-sm font-subheader font-semibold text-slate-500">
              <li className="flex items-start gap-4"><Phone className="w-5 h-5 text-[#64CCC9] shrink-0" /> 614-882-8022</li>
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#64CCC9] shrink-0" />
                <a href="mailto:info@worldclasstitle.com" className="hover:text-[#004EA8] transition-colors">info@worldclasstitle.com</a>
              </li>
              <li className="flex items-start gap-4 text-xs"><MapPin className="w-5 h-5 text-[#64CCC9] shrink-0" /> 5040 Pine Creek Drive, Westerville, OH 43081</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">
            <span>© 2026 World Class Title</span>
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#64CCC9]" />
            <span className="text-[10px] font-header font-black text-slate-600 uppercase tracking-[0.2em]">ALTA Best Practices Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;