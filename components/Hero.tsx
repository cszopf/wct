
import React from 'react';
import { UserRole } from '../types';
import { ROLE_CONTENT } from '../constants';
import { 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  Cpu, 
  ExternalLink,
  Monitor,
  Layout,
  MousePointer2,
  Lock,
  Wifi,
  Clock
} from 'lucide-react';

interface HeroProps {
  role: UserRole;
  onOpenQuote?: () => void;
}

const Hero: React.FC<HeroProps> = ({ role, onOpenQuote }) => {
  const content = ROLE_CONTENT[role];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background Brand Accent */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-[#B9D9EB]/10 rounded-l-[15rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#004EA8]/5 border border-[#004EA8]/10 rounded-full mb-8">
              <div className="flex -space-x-1">
                <Database className="w-3.5 h-3.5 text-[#004EA8]" />
                <Cpu className="w-3.5 h-3.5 text-[#64CCC9]" />
              </div>
              <span className="text-[10px] font-header font-black uppercase tracking-[0.2em] text-[#004EA8]">Fastest Data + Proprietary Tech</span>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-header font-extrabold text-[#004EA8] leading-[1] mb-8">
              {content.headline}
            </h1>
            
            <p className="text-xl text-slate-500 font-subheader leading-relaxed mb-12 max-w-xl">
              {content.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <a 
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-[#004EA8] text-white rounded-full font-header font-bold text-sm flex items-center justify-center gap-3 hover:bg-[#003375] transition-all hover:shadow-2xl group active:scale-[0.98]"
              >
                {content.primaryCTA}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={onOpenQuote}
                className="px-10 py-5 bg-white text-[#004EA8] border-2 border-[#B9D9EB] rounded-full font-header font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                Get a Quote
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#64CCC9] border border-slate-100">
                   <Zap className="w-5 h-5 fill-current" />
                </div>
                <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest leading-tight">
                  <span className="text-slate-900">40% Faster</span><br/> Clear-to-Close
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#004EA8] border border-slate-100">
                   <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest leading-tight">
                  <span className="text-slate-900">100% Secure</span><br/> Wire Protocol
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* The Experience Visualization - High-Tech Browser Frame */}
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-tr from-[#004EA8]/20 via-[#64CCC9]/10 to-[#B9D9EB]/20 rounded-[4rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity" />
              
              <div className="relative rounded-[3rem] bg-slate-900 border-[12px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden aspect-[4/5] lg:aspect-square flex flex-col">
                {/* Browser Toolbar */}
                <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-grow max-w-md mx-6">
                    <div className="bg-slate-900/80 backdrop-blur rounded-full py-1.5 px-5 flex items-center gap-3 border border-slate-700">
                      <Lock className="w-3 h-3 text-[#64CCC9]" />
                      <span className="text-[9px] text-slate-400 font-mono tracking-tighter truncate opacity-70">
                        {content.link.replace('https://', '')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 opacity-50">
                    <Wifi className="w-4 h-4 text-white" />
                    <Monitor className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Interactive Dashboard Content Mockup */}
                <div className="flex-grow bg-slate-50 relative overflow-hidden flex flex-col">
                   {/* Experience Role Label */}
                   <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                      <div className="bg-slate-900 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
                         <div className="w-2 h-2 bg-[#64CCC9] rounded-full animate-pulse shadow-[0_0_10px_#64CCC9]" />
                         <span className="text-[10px] font-header font-black text-white uppercase tracking-widest">{content.experienceLabel} Experience</span>
                      </div>
                   </div>

                   {/* Agent Perspective Marker */}
                   {role === UserRole.AGENT && (
                     <div className="absolute top-6 right-6 z-20 animate-in fade-in zoom-in duration-700">
                        <div className="bg-white px-4 py-2 rounded-xl shadow-xl border-2 border-[#004EA8] flex items-center gap-3">
                           <Layout className="w-4 h-4 text-[#004EA8]" />
                           <span className="text-[10px] font-header font-black text-[#004EA8] uppercase tracking-[0.1em]">Agent Perspective Active</span>
                        </div>
                     </div>
                   )}

                   {/* High-Fidelity Mock UI */}
                   <div className="p-8 mt-16 space-y-8 flex-grow">
                      <div className="flex items-center justify-between mb-4">
                         <div className="space-y-3">
                            <div className="h-2 w-32 bg-slate-200 rounded-full" />
                            <div className="h-8 w-64 bg-slate-900 rounded-2xl" />
                         </div>
                         <div className="w-16 h-16 bg-[#004EA8] rounded-[1.5rem] shadow-xl flex items-center justify-center text-white ring-8 ring-[#004EA8]/10">
                            <Zap className="w-8 h-8" />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         <div className="p-6 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-4 group/card hover:shadow-xl transition-all">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#64CCC9] group-hover/card:bg-[#64CCC9] group-hover/card:text-white transition-all">
                               <Database className="w-5 h-5" />
                            </div>
                            <div className="space-y-2">
                               <div className="h-3 w-16 bg-slate-100 rounded-full" />
                               <div className="h-2 w-24 bg-slate-50 rounded-full" />
                            </div>
                         </div>
                         <div className="p-6 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-4 group/card hover:shadow-xl transition-all">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#004EA8] group-hover/card:bg-[#004EA8] group-hover/card:text-white transition-all">
                               <Cpu className="w-5 h-5" />
                            </div>
                            <div className="space-y-2">
                               <div className="h-3 w-16 bg-slate-100 rounded-full" />
                               <div className="h-2 w-24 bg-slate-50 rounded-full" />
                            </div>
                         </div>
                      </div>

                      <div className="p-8 bg-white rounded-[3rem] shadow-xl border border-[#B9D9EB]/30 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#64CCC9]/10 to-transparent pointer-events-none" />
                         <div className="flex items-center gap-6 mb-8">
                            <div className="relative">
                               <div className="w-16 h-16 rounded-full border-[6px] border-[#B9D9EB]/20 border-t-[#004EA8] animate-spin-slow" />
                               <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-xs font-header font-black text-[#004EA8]">WCT</span>
                               </div>
                            </div>
                            <div>
                               <p className="text-[11px] font-header font-black text-[#64CCC9] uppercase tracking-widest leading-none mb-1">Status: Proprietary Search Active</p>
                               <p className="text-lg font-bold text-slate-900">Synchronizing Fastest Data</p>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-center gap-4">
                               <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]"><Zap className="w-3 h-3 text-white" /></div>
                               <div className="h-2.5 w-full bg-slate-100 rounded-full relative overflow-hidden">
                                  <div className="absolute inset-0 bg-[#004EA8] w-[85%] rounded-full" />
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center"><Clock className="w-3 h-3 text-slate-500" /></div>
                               <div className="h-2.5 w-full bg-slate-100 rounded-full relative overflow-hidden">
                                  <div className="absolute inset-0 bg-slate-300 w-[60%] rounded-full" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Interactive Call to Action Overlay */}
                   <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/10 transition-all flex items-center justify-center group/overlay cursor-pointer" onClick={() => window.open(content.link, '_blank')}>
                      <div className="p-6 bg-white/95 backdrop-blur shadow-2xl rounded-[2.5rem] opacity-0 group-hover/overlay:opacity-100 translate-y-8 group-hover/overlay:translate-y-0 transition-all duration-500 flex flex-col items-center gap-4 border border-white">
                         <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white mb-2">
                            <ExternalLink className="w-8 h-8" />
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mb-1">Experience Live</p>
                            <p className="text-lg font-extrabold text-[#004EA8]">Launch Dashboard</p>
                         </div>
                         <div className="flex items-center gap-2 px-4 py-1.5 bg-[#64CCC9]/10 rounded-full">
                            <MousePointer2 className="w-3.5 h-3.5 text-[#64CCC9]" />
                            <span className="text-[9px] font-header font-black text-[#64CCC9] uppercase tracking-widest">Interactive Prototype</span>
                         </div>
                      </div>
                   </div>

                   {/* Bottom Navigation Mock */}
                   <div className="bg-white border-t border-slate-200 px-8 py-5 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <Layout className="w-5 h-5 text-slate-300" />
                         <div className="h-2 w-24 bg-slate-100 rounded-full" />
                      </div>
                      <div className="flex gap-3">
                         <div className="h-8 w-8 bg-slate-50 rounded-lg" />
                         <div className="h-8 w-8 bg-[#004EA8]/5 rounded-lg border border-[#004EA8]/10" />
                      </div>
                   </div>
                </div>
              </div>

              {/* Floating Performance Indicator */}
              <div className="absolute -right-12 top-1/4 bg-[#64CCC9] p-6 rounded-[2.5rem] shadow-2xl border-4 border-white translate-x-4 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                       <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <p className="text-[10px] font-header font-black text-white/70 uppercase tracking-widest leading-none mb-1">Data Pipeline</p>
                       <p className="text-2xl font-black text-white leading-none tracking-tighter">ELITE SPEED</p>
                    </div>
                 </div>
              </div>

              {/* Proprietary Badge */}
              <div className="absolute -left-12 bottom-1/4 bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl border-4 border-slate-800 -translate-x-4 animate-in fade-in slide-in-from-left-8 duration-1000 delay-500">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-[#004EA8] rounded-full flex items-center justify-center ring-4 ring-[#004EA8]/30">
                       <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <p className="text-[10px] font-header font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Platform</p>
                       <p className="text-sm font-bold text-white leading-tight uppercase tracking-tight">PROPRIETARY<br/>WCT ENGINE v3</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
