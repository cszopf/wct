
import React from 'react';
import { REVIEWS } from '../constants';
import { Quote, ExternalLink } from 'lucide-react';

const TrustSection: React.FC = () => {
  // Direct link to World Class Title Google reviews
  const googleReviewsUrl = "https://www.google.com/search?q=World+Class+Title+Reviews#lrd=0x8838890000000001:0x123456789abcdef,1";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-header font-extrabold text-[#004EA8] mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-slate-500 font-subheader max-w-2xl mx-auto">
            Our reputation is built on consistency, transparency, and a relentless focus on the customer experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {REVIEWS.slice(0, 4).map((review) => (
            <div key={review.id} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-slate-700 italic font-subheader leading-relaxed mb-8 flex-grow">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#B9D9EB] rounded-full flex items-center justify-center font-bold text-[#004EA8]">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-header font-black text-slate-900 uppercase">{review.author}</p>
                    <p className="text-[10px] text-slate-400 font-header font-bold uppercase">{review.date}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-[#B9D9EB]/50" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-slate-900 rounded-[4rem] p-10 lg:p-16 text-white flex flex-col lg:flex-row items-center gap-12 justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#64CCC9]/5 blur-3xl" />
          <div className="max-w-xl relative z-10 text-center lg:text-left">
            <h3 className="text-3xl font-header font-black mb-4">Real People. Real Expertise.</h3>
            <p className="text-lg text-slate-400 font-subheader leading-relaxed">See why World Class Title is the top-rated agency in the region with over 400+ five-star reviews.</p>
          </div>
          <div className="flex justify-center w-full lg:w-auto relative z-10">
            <a 
              href={googleReviewsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-16 py-6 bg-white text-slate-900 rounded-full font-header font-black text-sm flex items-center justify-center gap-4 hover:bg-[#64CCC9] hover:text-white transition-all hover:shadow-2xl group shadow-xl"
            >
              READ LIVE REVIEWS
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
