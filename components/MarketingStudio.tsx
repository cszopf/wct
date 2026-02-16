
import React from 'react';
import { MARKETING_PILLARS, MARKETING_PACKAGES } from '../constants';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';

const MarketingStudio: React.FC = () => {
  return (
    <section id="marketing" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#004EA8]/10 text-[#004EA8] rounded-full mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-header font-black uppercase tracking-widest">Exclusive for WCT Partners</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-header font-extrabold text-slate-900 mb-6">The WCT Marketing Studio</h2>
          <p className="text-xl text-slate-500 font-subheader max-w-3xl mx-auto leading-relaxed">
            World Class Title is a growth partner—not just a title company. We provide the professional marketing infrastructure you need to win the listing and grow your brand.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {MARKETING_PILLARS.map((pillar, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#64CCC9]/30 hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#004EA8] group-hover:bg-[#004EA8] group-hover:text-white transition-all mb-8">
                {/* Fixed: Added <any> to React.ReactElement to allow className property in cloneElement */}
                {React.cloneElement(pillar.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
              </div>
              <h3 className="text-lg font-header font-bold text-slate-900 mb-4">{pillar.title}</h3>
              <p className="text-sm text-slate-500 font-subheader leading-relaxed mb-8">{pillar.description}</p>
              <ul className="space-y-3">
                {pillar.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-[#64CCC9]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Packages Section */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl border border-slate-100">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3">
              <h3 className="text-3xl font-header font-extrabold text-[#004EA8] mb-6">Built to Match Your Strategy.</h3>
              <p className="text-slate-500 font-subheader mb-10 leading-relaxed">
                Choose the support level that matches your listing tier. From essential photography to complete social media takeovers.
              </p>
              <button className="group flex items-center gap-3 text-sm font-header font-bold text-[#004EA8] hover:text-[#003375] transition-colors">
                View Full Service Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="lg:w-2/3 grid sm:grid-cols-3 gap-6 w-full">
              {MARKETING_PACKAGES.map((pkg, i) => (
                <div key={i} className={`p-8 rounded-[2rem] flex flex-col relative overflow-hidden ${pkg.color} ${pkg.dark ? 'text-white' : 'text-slate-900'} ${pkg.popular ? 'ring-2 ring-[#64CCC9]' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-[#64CCC9] text-white text-[8px] font-header font-black px-4 py-1 rounded-bl-xl tracking-tighter">MOST POPULAR</div>
                  )}
                  <h4 className="text-xl font-header font-black mb-1">{pkg.name}</h4>
                  <p className={`text-[10px] font-header font-bold mb-6 opacity-60 uppercase tracking-widest`}>{pkg.price}</p>
                  <ul className="space-y-3 flex-grow mb-8">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="text-[11px] font-bold flex items-center gap-2">
                        <div className="w-1 h-1 bg-current opacity-40 rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-full text-[10px] font-header font-black transition-all ${pkg.dark ? 'bg-white text-slate-900' : 'bg-[#004EA8] text-white hover:bg-[#003375]'}`}>
                    SELECT PACKAGE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingStudio;
