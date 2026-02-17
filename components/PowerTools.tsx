
import React from 'react';
import { TOOLS } from '../constants';
import { ChevronRight } from 'lucide-react';

interface PowerToolsProps {
  onToolClick: (action: string) => void;
}

const PowerTools: React.FC<PowerToolsProps> = ({ onToolClick }) => {
  return (
    <section className="py-24 bg-slate-900 rounded-[4rem] mx-6 mb-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 blur-[100px]" />
      <div className="max-w-7xl mx-auto px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need, One Place.</h2>
            <p className="text-lg text-slate-400">Streamline your closing with our suite of digital tools designed for speed and security.</p>
          </div>
          <button 
            onClick={() => onToolClick('Smart Login')}
            className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors"
          >
            Access WCT Smart Spaces
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {TOOLS.map((tool, i) => (
            <button 
              key={i} 
              onClick={() => onToolClick(tool.title)}
              className="group p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all flex flex-col items-center text-center"
            >
              <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <p className="text-sm font-bold text-white mb-4">{tool.title}</p>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerTools;
