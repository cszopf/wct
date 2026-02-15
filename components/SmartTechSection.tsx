
import React from 'react';
import { ShieldCheck, Eye, Search, Zap, Layout } from 'lucide-react';

const SmartTechSection: React.FC = () => {
  const features = [
    { title: "Automated Workflows", description: "Smart title search pipelines ensure zero delays.", icon: <Search /> },
    { title: "Real-Time Status", description: "Know exactly where your closing stands, 24/7.", icon: <Eye /> },
    { title: "Fraud Protection", description: "Bank-grade security layers protect your transaction.", icon: <ShieldCheck /> },
    { title: "Faster Clear-to-Close", description: "Our tech finds issues before they become delays.", icon: <Zap /> }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full mb-6">
              <Layout className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Technology Advantage</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">The Intelligence Behind Every Closing</h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Traditional title is reactive. Smart is proactive. Our proprietary Smart Spaces engine monitors every transaction detail in real-time.
            </p>
            
            <div className="space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    {React.cloneElement(f.icon as React.ReactElement, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{f.title}</h4>
                    <p className="text-slate-600">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-200 aspect-square rounded-[3rem] overflow-hidden shadow-inner relative flex items-center justify-center">
              {/* Mock Smart Dashboard UI */}
              <div className="bg-white w-[90%] h-[80%] rounded-2xl shadow-2xl p-6 border border-white flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-4 w-32 bg-slate-100 rounded-full" />
                  <div className="flex gap-2">
                    <div className="h-4 w-4 bg-blue-500 rounded-full" />
                    <div className="h-4 w-4 bg-slate-200 rounded-full" />
                  </div>
                </div>
                
                <div className="space-y-4 flex-grow">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg" />
                      <div className="space-y-2 flex-grow">
                        <div className="h-3 w-[60%] bg-slate-100 rounded-full" />
                        <div className="h-2 w-[40%] bg-slate-50 rounded-full" />
                      </div>
                      <div className="h-4 w-12 bg-green-50 rounded-full" />
                    </div>
                  ))}
                </div>

                <div className="mt-auto h-32 bg-blue-50 rounded-xl flex flex-col items-center justify-center">
                   <div className="relative w-20 h-20">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path className="text-blue-500" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-700">85%</span>
                      </div>
                   </div>
                   <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-2">Closing Progress</p>
                </div>
              </div>
              
              <div className="absolute top-1/2 -left-12 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce hover:animate-none">
                <ShieldCheck className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Fraud Shield</p>
                  <p className="text-sm font-bold">Encrypted & Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartTechSection;
