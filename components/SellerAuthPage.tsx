
import React from 'react';
import { ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';

const SellerAuthPage: React.FC = () => {
  const jotformUrl = "https://form.jotform.com/cszopf/seller-authorization";
  const logoUrl = "https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img 
              src={logoUrl} 
              alt="World Class Title" 
              className="h-8 lg:h-10 w-auto object-contain"
            />
          </a>
          <div className="hidden sm:flex items-center gap-2 text-[#004EA8]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-header font-bold uppercase tracking-widest">Secure Verification</span>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title & Subtitle */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-5xl font-header font-black text-[#004EA8] mb-4">
              Seller Verification
            </h1>
            <p className="text-lg text-slate-600 font-subheader max-w-2xl mx-auto">
              Complete this short form so we can verify your identity and begin your title work.
            </p>
          </div>

          {/* Jotform Embed Container */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden mb-8">
            <div className="w-full bg-slate-900 p-4 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-grow mx-4">
                <div className="bg-slate-800 rounded-full py-1 px-4 text-[10px] text-slate-400 font-mono truncate">
                  worldclasstitle.com/sellerauth
                </div>
              </div>
            </div>
            
            <div className="relative w-full" style={{ minHeight: '1200px' }}>
              <iframe
                id="JotFormIFrame-212305251974048"
                title="Seller Authorization"
                src={jotformUrl}
                allowTransparency={true}
                allowFullScreen={true}
                allow="geolocation; microphone; camera"
                frameBorder="0"
                style={{
                  width: '100%',
                  minHeight: '1200px',
                  border: 'none',
                }}
                scrolling="yes"
              />
            </div>
          </div>

          {/* Fallback Button */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-slate-400 font-subheader">Having trouble with the form above?</p>
            <a 
              href={jotformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#004EA8] text-white rounded-full font-header font-bold text-sm hover:bg-[#003375] transition-all shadow-lg group"
            >
              Open the form in a new tab
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-slate-200 bg-white text-center">
        <p className="text-xs text-slate-400 font-subheader">
          &copy; {new Date().getFullYear()} World Class Title. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default SellerAuthPage;
