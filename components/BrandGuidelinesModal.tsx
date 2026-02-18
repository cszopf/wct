import React from 'react';
import { X, Download, Palette, Type, Layout, CheckCircle2 } from 'lucide-react';

interface BrandGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrandGuidelinesModal: React.FC<BrandGuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const colors = [
    { name: 'Primary Blue', hex: '#004EA8', description: 'PANTONE 2145 C', dark: true },
    { name: 'WCT Teal', hex: '#64CCC9', description: 'PANTONE 325 C', dark: false },
    { name: 'Light Blue', hex: '#B9D9EB', description: 'PANTONE 290 C', dark: false },
    { name: 'Muted Blue', hex: '#A2B2C8', description: 'PANTONE 536 C', dark: false },
    { name: 'White', hex: '#FFFFFF', description: 'CMYK 0, 0, 0, 0', dark: false },
  ];

  const handleDownload = () => {
    // In a real app, this would be a link to the actual PDF
    alert("Starting Brand Guidelines PDF Download...");
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        
        {/* Navigation Bar */}
        <div className="p-6 lg:px-10 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#004EA8] rounded-xl flex items-center justify-center text-white">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-header font-black text-[#004EA8] leading-none">Brand Identity</h3>
              <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mt-1">Version 2.0 / 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDownload}
              className="hidden sm:flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-header font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Brand Page Content */}
        <div className="flex-grow overflow-y-auto bg-slate-50/50 p-8 lg:p-16">
          <div className="max-w-4xl mx-auto space-y-24">
            
            {/* Logo Section */}
            <section>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-[10px] font-header font-black text-[#64CCC9] uppercase tracking-[0.3em]">01. Primary Identity</span>
                <div className="h-px bg-slate-200 flex-grow" />
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
                  <img 
                    src="https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w" 
                    alt="Primary Logo" 
                    className="max-w-[300px] w-full"
                  />
                  <p className="mt-8 text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Primary Logo (Full Color)</p>
                </div>
                <div className="space-y-6">
                  <h4 className="text-2xl font-header font-black text-slate-900">Logo Usage</h4>
                  <p className="text-slate-500 font-subheader leading-relaxed text-sm">
                    Our logo is the most immediate representation of our brand. It should be presented clearly and consistently with adequate white space.
                  </p>
                  <ul className="space-y-3">
                    {['Use Primary RGB for web and digital', 'Maintain clear space around the icon', 'Avoid distorting or stretching'].map((rule, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-header font-bold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#64CCC9]" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Color Palette */}
            <section>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-[10px] font-header font-black text-[#64CCC9] uppercase tracking-[0.3em]">02. Color Architecture</span>
                <div className="h-px bg-slate-200 flex-grow" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {colors.map((color) => (
                  <div key={color.hex} className="space-y-4">
                    <div 
                      className="h-32 lg:h-48 rounded-[2rem] shadow-sm border border-slate-200/50 flex flex-col justify-end p-6" 
                      style={{ backgroundColor: color.hex }}
                    >
                      <p className={`text-[10px] font-header font-black uppercase tracking-widest ${color.dark ? 'text-white' : 'text-slate-900'}`}>{color.hex}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-header font-black text-slate-900">{color.name}</h5>
                      <p className="text-[9px] font-header font-bold text-slate-400 uppercase tracking-tighter">{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Typography */}
            <section>
              <div className="flex items-center gap-4 mb-12">
                <span className="text-[10px] font-header font-black text-[#64CCC9] uppercase tracking-[0.3em]">03. Typography</span>
                <div className="h-px bg-slate-200 flex-grow" />
              </div>
              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <Type className="w-8 h-8 text-[#004EA8] mb-6" />
                    <h5 className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mb-4">Primary Header</h5>
                    <p className="text-5xl font-header font-black text-slate-900 tracking-wider">Aa</p>
                    <p className="text-xl font-header font-black text-slate-900 mt-2">Nunito Sans, Bold</p>
                    <p className="text-xs text-slate-500 font-subheader mt-4 leading-relaxed">Used for headlines and primary brand statements. High impact, clean, and professional.</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <Layout className="w-8 h-8 text-[#64CCC9] mb-6" />
                    <h5 className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mb-4">Subheaders & Body</h5>
                    <p className="text-5xl font-subheader font-bold text-slate-900 tracking-tight">Aa</p>
                    <p className="text-xl font-subheader font-bold text-slate-900 mt-2">Montserrat, Regular</p>
                    <p className="text-xs text-slate-500 font-subheader mt-4 leading-relaxed">Used for copy and sub-headlines. Highly legible and provides a sophisticated contrast.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile Download CTA */}
            <div className="sm:hidden pt-8">
              <button 
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-full text-xs font-header font-black uppercase tracking-widest"
              >
                <Download className="w-4 h-4" />
                Download Guidelines
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-8 bg-slate-900 shrink-0 flex items-center justify-between">
          <p className="text-[10px] font-header font-black text-slate-500 uppercase tracking-widest">© 2026 World Class Title Intellectual Property</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#64CCC9] rounded-full animate-pulse" />
            <p className="text-[10px] font-header font-black text-white uppercase tracking-widest">Brand System v3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandGuidelinesModal;