
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  FileSearch, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Loader2,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ClosingGuard: React.FC = () => {
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [disclosureFile, setDisclosureFile] = useState<File | null>(null);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileToPart = async (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCompare = async () => {
    if (!contractFile || !disclosureFile) {
      setError("Please upload both the Purchase Contract and the Closing Disclosure.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setComparisonResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const contractPart = await fileToPart(contractFile);
      const disclosurePart = await fileToPart(disclosureFile);

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          {
            parts: [
              contractPart as any,
              disclosurePart as any,
              { text: `You are a professional real estate title auditor. 
              Analyze these two documents: 
              1. The Purchase Contract
              2. The Closing Disclosure (CD)
              
              Identify if they are aligned or if there are discrepancies in:
              - Sale Price
              - Earnest Money / Deposit amounts
              - Seller Credits
              - Prorated taxes (if visible)
              - Commissions (if visible)
              
              Format your response as a professional audit report with:
              - A summary "Status" (Aligned or Action Required)
              - A detailed breakdown of each category
              - Specific callouts for any differences found.
              
              If the documents are not clear, state what might be missing.` }
            ]
          }
        ],
        config: {
          temperature: 0.2, // Keep it precise for auditing
        }
      });

      setComparisonResult(response.text || "Could not generate audit report.");
    } catch (err) {
      console.error("Comparison Error:", err);
      setError("An error occurred during the audit. Please ensure you've uploaded clear images of the documents.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="closing-guard" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-header font-black uppercase tracking-widest">WCT Proprietary Tool</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-header font-extrabold text-[#004EA8] mb-6 leading-tight">
              Closing Guard™ <br/><span className="text-[#64CCC9]">AI Audit</span>
            </h2>
            <p className="text-xl text-slate-500 font-subheader leading-relaxed mb-8">
              Don't let errors derail your closing. Our proprietary AI tool compares your Purchase Contract with your Closing Disclosure to ensure every dollar is accounted for.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#004EA8] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Verify Sale Price</h4>
                  <p className="text-sm text-slate-500">Instant confirmation that the agreed price matches the final disclosure.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#004EA8] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Credit Alignment</h4>
                  <p className="text-sm text-slate-500">We ensure seller credits and repair offsets are correctly applied.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 bg-slate-50 rounded-[3rem] p-8 lg:p-12 border border-slate-100 shadow-inner">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Purchase Contract Upload */}
              <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${contractFile ? 'bg-white border-teal-200' : 'bg-white/50 border-slate-200 hover:border-[#004EA8]'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${contractFile ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Purchase Contract</h3>
                  <p className="text-xs text-slate-500 mb-6">Upload original contract image or PDF</p>
                  
                  <label className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-header font-black hover:bg-slate-50 transition-all uppercase tracking-widest">
                    {contractFile ? 'Change File' : 'Select File'}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,application/pdf"
                      onChange={(e) => setContractFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  {contractFile && <p className="mt-3 text-[10px] text-teal-600 font-bold truncate max-w-full">{contractFile.name}</p>}
                </div>
              </div>

              {/* Closing Disclosure Upload */}
              <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${disclosureFile ? 'bg-white border-teal-200' : 'bg-white/50 border-slate-200 hover:border-[#004EA8]'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${disclosureFile ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                    <FileSearch className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Closing Disclosure</h3>
                  <p className="text-xs text-slate-500 mb-6">Upload latest CD draft</p>
                  
                  <label className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-header font-black hover:bg-slate-50 transition-all uppercase tracking-widest">
                    {disclosureFile ? 'Change File' : 'Select File'}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,application/pdf"
                      onChange={(e) => setDisclosureFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  {disclosureFile && <p className="mt-3 text-[10px] text-teal-600 font-bold truncate max-w-full">{disclosureFile.name}</p>}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleCompare}
                disabled={!contractFile || !disclosureFile || isLoading}
                className="group relative px-12 py-6 bg-[#004EA8] text-white rounded-full font-header font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-[#003375] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <div className="flex items-center gap-4">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Documents...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Run AI Audit</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </div>
              </button>

              {error && (
                <div className="mt-8 flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                  <AlertTriangle className="w-5 h-5" />
                  <p className="text-sm font-bold">{error}</p>
                </div>
              )}

              {comparisonResult && (
                <div className="mt-12 w-full p-8 lg:p-12 bg-white rounded-[2.5rem] shadow-2xl border border-teal-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-header font-extrabold text-[#004EA8]">Audit Results</h4>
                      <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">WCT Intelligence Engine</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-600 font-subheader leading-relaxed whitespace-pre-wrap">
                      {comparisonResult}
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Generated by Gemini Pro</p>
                    <button className="text-xs font-header font-black text-[#004EA8] hover:text-[#64CCC9] transition-colors flex items-center gap-2">
                      DOWNLOAD REPORT
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingGuard;
