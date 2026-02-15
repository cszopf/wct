
import React from 'react';

const TrustBar: React.FC = () => {
  const stats = [
    { label: "Google Rating", value: "4.8★" },
    { label: "Licensed States", value: "9 States" },
    { label: "Years in Business", value: "20+" },
    { label: "Successful Closings", value: "17,000+" }
  ];

  return (
    <div className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center lg:text-left">
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
