
import React from 'react';
import { UserRole } from '../types';
import { ArrowUpRight, BookOpen, Video, FileText, Shield, Smartphone } from 'lucide-react';

interface EducationHubProps {
  role: UserRole;
}

const EducationHub: React.FC<EducationHubProps> = ({ role }) => {
  const getResources = () => {
    switch(role) {
      case UserRole.BUYER:
        return [
          { title: "What is Title Insurance?", type: "Guide", icon: <BookOpen className="w-5 h-5" />, link: "#" },
          { title: "Wire Fraud Safety Checklist", type: "Security", icon: <FileText className="w-5 h-5" />, link: "#" },
          { title: "Your Closing Timeline", type: "Process", icon: <Video className="w-5 h-5" />, link: "#" }
        ];
      case UserRole.AGENT:
        return [
          { title: "Marketing Resource Kit", type: "Growth", icon: <ArrowUpRight className="w-5 h-5" />, link: "#" },
          { title: "CE Course Schedule", type: "Education", icon: <BookOpen className="w-5 h-5" />, link: "#" },
          { title: "Market Insights January 2026", type: "Report", icon: <FileText className="w-5 h-5" />, link: "https://marketstatsreports.showingtime.com/CR/sst/2026-01/Entire-MLS.pdf" }
        ];
      case UserRole.SELLER:
        return [
          { title: "Seller Net Sheet Guide", type: "Financial", icon: <FileText className="w-5 h-5" />, link: "#" },
          { title: "Preparing for Closing Day", type: "Prep", icon: <Video className="w-5 h-5" />, link: "#" },
          { title: "Mortgage Payoff Prep", type: "Guide", icon: <BookOpen className="w-5 h-5" />, link: "#" }
        ];
      default:
        return [
          { title: "Title Market Trends", type: "Report", icon: <ArrowUpRight className="w-5 h-5" />, link: "#" },
          { title: "Compliance Standards", type: "Legal", icon: <Shield className="w-5 h-5" />, link: "#" },
          { title: "Smart Integration API", type: "Tech", icon: <Smartphone className="w-5 h-5" />, link: "#" }
        ];
    }
  };

  const resources = getResources();

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">The Education Hub</h2>
            <p className="text-lg text-slate-600">Resources tailored for {role}s to ensure a smooth, informed transaction.</p>
          </div>
          <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Resources
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((res, i) => (
            <a 
              key={i} 
              href={res.link} 
              target={res.link !== "#" ? "_blank" : "_self"}
              className="group p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-xl transition-all cursor-pointer block"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {res.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.type}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{res.title}</h3>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-900">
                {res.link !== "#" ? "Open PDF" : "Read Now"}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationHub;
