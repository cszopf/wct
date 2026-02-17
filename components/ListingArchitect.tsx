
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  Sparkles, 
  PenTool, 
  MapPin, 
  Home, 
  Loader2, 
  ArrowRight, 
  Copy, 
  CheckCircle2, 
  Zap,
  Target,
  Palette,
  Download,
  ShieldAlert
} from 'lucide-react';

const ListingArchitect: React.FC = () => {
  const [details, setDetails] = useState('');
  const [tone, setTone] = useState<'Luxury' | 'Modern' | 'Narrative'>('Modern');
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const logoUrl = "https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w";

  const handleGenerate = async () => {
    if (!details.trim()) {
      setError("Please provide some property details or an address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Generate a high-end real estate listing description for World Class Title.
        Property Details: ${details}
        Desired Tone: ${tone}
        
        Instructions:
        1. Write a 300-word compelling listing description.
        2. Include a "Listing Alpha" section (3 bullet points identifying high-value selling features).
        3. Use professional, evocative language suitable for a growth-focused agent.`,
        config: {
          systemInstruction: `You are the WCT Listing Architect™, a high-end real estate copywriting engine.
          You help agents win listings by crafting descriptions that feel elite and exclusive.
          Always include a catchy headline and follow the WCT brand voice: confident, modern, and high-energy.`,
          temperature: 0.8
        }
      });

      if (!response.text) throw new Error("WCT Vision Engine: Analysis could not be completed.");
      setOutput(response.text);
    } catch (err: any) {
      console.error("WCT Architect Error:", err);
      setError("Vision Engine connection error. Please check your secure key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!output) return;

    const timestamp = new Date().toLocaleDateString();
    const formattedContent = output.split('\n').map(line => {
      if (line.startsWith('#') || line.includes('**')) {
        return `<p style="font-weight: 800; color: #004EA8; margin-top: 20px; font-size: 18px;">${line.replace(/#/g, '').replace(/\*\*/g, '').trim()}</p>`;
      }
      return `<p style="color: #475569; line-height: 1.6; margin-bottom: 12px; font-size: 14px;">${line}</p>`;
    }).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700;800&display=swap');
          body { font-family: 'Nunito Sans', sans-serif; padding: 60px; color: #1e293b; max-width: 800px; margin: 0 auto; background: #f8fafc; }
          .document { background: white; padding: 60px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; position: relative; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #004EA8; padding-bottom: 30px; margin-bottom: 40px; }
          .logo { height: 50px; }
          .title-area { text-align: right; }
          .tool-name { color: #64CCC9; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; }
          .report-title { color: #004EA8; font-weight: 800; font-size: 24px; margin-top: 5px; }
          .date { color: #94a3b8; font-size: 10px; margin-top: 5px; text-transform: uppercase; font-weight: 700; }
          .content { margin-bottom: 60px; }
          .disclaimer-box { background: #fff7ed; border: 1px solid #ffedd5; padding: 25px; border-radius: 15px; display: flex; gap: 20px; align-items: flex-start; }
          .disclaimer-icon { color: #f97316; font-weight: bold; font-size: 24px; }
          .disclaimer-text { color: #9a3412; font-size: 12px; line-height: 1.5; font-weight: 600; }
          .footer { text-align: center; margin-top: 40px; color: #cbd5e1; font-size: 10px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="document">
          <div class="header">
            <img src="${logoUrl}" class="logo" alt="WCT Logo">
            <div class="title-area">
              <div class="tool-name">Listing Architect™ Output</div>
              <div class="report-title">Marketing Asset</div>
              <div class="date">Generated: ${timestamp}</div>
            </div>
          </div>
          <div class="content">
            ${formattedContent}
          </div>
          <div class="disclaimer-box">
            <div class="disclaimer-icon">!</div>
            <div class="disclaimer-text">
              <strong>PROFESSIONAL REVIEW REQUIRED:</strong> This content was generated by the WCT Listing Architect™ AI engine. While highly accurate, this information is intended for marketing purposes only and should be reviewed by a World Class Title professional prior to final publication or use in legal documents. World Class Title assumes no liability for errors or omissions in AI-generated copy.
            </div>
          </div>
          <div class="footer">
            World Class Title | Your Growth Partner
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WCT-Listing-Architect-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="listing-architect" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#004EA8]/5 text-[#004EA8] rounded-full mb-6">
              <Zap className="w-4 h-4 text-[#64CCC9]" />
              <span className="text-[10px] font-header font-black uppercase tracking-widest">WCT Intelligence Tool</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-header font-extrabold text-[#004EA8] mb-6 leading-tight">
              Listing <br/><span className="text-[#64CCC9]">Architect™</span>
            </h2>
            <p className="text-xl text-slate-500 font-subheader leading-relaxed mb-8">
              Transform basic property specs into "World Class" marketing descriptions. Built to help agents win the listing presentation.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#64CCC9]">
                  <Target className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Growth Focused Copy</p>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#004EA8]">
                  <Palette className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Dynamic Tone Control</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#64CCC9]/10 blur-[100px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {['Modern', 'Luxury', 'Narrative'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t as any)}
                    className={`flex-1 py-3 px-6 rounded-2xl text-[10px] font-header font-black uppercase tracking-widest transition-all ${
                      tone === t 
                      ? 'bg-[#64CCC9] text-white shadow-xl shadow-[#64CCC9]/20' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {t} Tone
                  </button>
                ))}
              </div>

              <div className="relative mb-8">
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Paste property details, MLS stats, or a rough address..."
                  className="w-full h-48 bg-slate-800/50 border border-slate-700 rounded-[2rem] p-8 text-white font-subheader text-sm focus:outline-none focus:ring-2 focus:ring-[#64CCC9]/30 transition-all placeholder:text-slate-600 resize-none"
                />
                <div className="absolute bottom-6 right-8 flex items-center gap-2 text-[10px] font-header font-black text-slate-600 uppercase tracking-widest">
                   <PenTool className="w-3 h-3" />
                   Smart Input Active
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-6 bg-white text-slate-900 rounded-full font-header font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-[#64CCC9] hover:text-white transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Architecting Listing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate "World Class" Listing
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {output && (
                <div className="mt-12 p-10 bg-white rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-[#64CCC9]">
                        <Home className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-header font-extrabold text-slate-900 leading-tight">WCT Output</h4>
                        <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mt-0.5">Ready for MLS / Social</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleCopy}
                        className={`p-3 rounded-full transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        title="Copy to Clipboard"
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <button 
                        onClick={handleDownload}
                        className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-[#004EA8] hover:text-white transition-all"
                        title="Download Branded Asset"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose prose-slate max-w-none text-slate-600 font-subheader text-sm leading-relaxed whitespace-pre-wrap mb-10">
                    {output.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('#') || line.includes('**') ? 'font-bold text-slate-900' : ''}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex items-start gap-4">
                    <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-subheader leading-relaxed">
                      <strong>DISCLAIMER:</strong> This is an AI-generated marketing draft. It is recommended that this content be reviewed by a World Class Title professional before final distribution to ensure transaction accuracy and branding compliance.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-header font-black text-center uppercase tracking-widest">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingArchitect;
