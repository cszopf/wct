
import React from 'react';
import { UserRole } from '../types';
import { ROLE_CONTENT } from '../constants';

interface DynamicValuePanelProps {
  role: UserRole;
}

const DynamicValuePanel: React.FC<DynamicValuePanelProps> = ({ role }) => {
  const content = ROLE_CONTENT[role];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Tailored for: {role}</p>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Built Specifically for Your Needs</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.valueProps.map((prop, i) => (
            <div key={i} className="group p-10 rounded-3xl bg-white border border-slate-100 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-8">
                {prop.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{prop.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {prop.description}
              </p>
              <div className="h-1 w-12 bg-slate-200 rounded-full group-hover:w-full group-hover:bg-blue-500 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicValuePanel;
