
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
  Sparkles,
  X,
  Plus,
  Download,
  Info
} from 'lucide-react';

const ClosingGuard: React.FC = () => {
  const [contractFiles, setContractFiles] = useState<File[]>([]);
  const [disclosureFile, setDisclosureFile] = useState<File | null>(null);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileToPart = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          if (!base64Data) throw new Error("Could not extract document data");
          resolve({
            inlineData: {
              data: base64Data,
              mimeType: file.type || 'application/pdf',
            },
          });
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleContractFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setContractFiles(prev => [...prev, ...newFiles]);
      setError(null);
    }
  };

  const removeContractFile = (index: number) => {
    setContractFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCompare = async () => {
    if (contractFiles.length === 0 || !disclosureFile) {
      setError("Please upload at least one Purchase Contract/Addendum and the Closing Disclosure.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setComparisonResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const contractParts = await Promise.all(contractFiles.map(f => fileToPart(f)));
      const disclosurePart = await fileToPart(disclosureFile);

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          {
            parts: [
              ...contractParts as any[],
              disclosurePart as any,
              { text: "Execute WCT Smart Audit. Compare all contract addendums against the closing disclosure for total synchronization. Look for discrepancies in Sale Price, Earnest Money, Seller Credits, or Repair Allowances." }
            ]
          }
        ],
        config: {
          systemInstruction: `You are the World Class Title (WCT) Smart Audit Engine. Your goal is to ensure 100% transaction precision.
          
          Analyze the provided documents: 
          1. The Purchase Contract and all its Addendums (Extensions, Price Adjustments, Repair Credits).
          2. The Closing Disclosure (CD).
          
          Task: Cross-reference these documents with extreme scrutiny. 
          
          Structure your report:
          - **WCT SMART AUDIT SUMMARY**: Overall status (SYNCHRONIZED or DISCREPANCY DETECTED).
          - **DATA BREAKDOWN**: Key financial data points (Sale Price, EM, Credits) from BOTH the contract and the CD.
          - **CRITICAL ALIGNMENT CHECK**: Explicitly state if they match or highlight the specific dollar difference.
          - **ACTION ITEMS**: What the agent or closer needs to do next to rectify any issues.
          
          Tone: Professional, high-precision, and elite. Use Markdown for bolding and tables.`,
          thinkingConfig: { thinkingBudget: 2000 }
        }
      });

      if (!response.text) {
        throw new Error("Smart Engine: No valid extraction could be made. Ensure text is clear.");
      }

      setComparisonResult(response.text);
    } catch (err: any) {
      console.error("WCT Audit Error:", err);
      setError(err.message || "An unexpected error occurred. Please ensure files are under 10MB and the API key is valid.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!comparisonResult) return;
    const blob = new Blob([comparisonResult], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WCT-SmartAudit-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="closing-guard" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Brand Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#64CCC9]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#004EA8]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-header font-black uppercase tracking-widest">WCT Proprietary Tool</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-header font-extrabold text-[#004EA8] mb-6 leading-tight">
              Closing Guard™ <br/><span className="text-[#64CCC9]">Smart Audit</span>
            </h2>
            <p className="text-xl text-slate-500 font-subheader leading-relaxed mb-8">
              Experience the power of proactive closing. Our Smart Audit Engine cross-references your entire file history to ensure total financial alignment.
            </p>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 text-[#004EA8] rounded-xl flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 font-subheader leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">How it works:</span>
                Upload your contract, addendums, and final CD. Our AI identifies discrepancies before they become delays.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 bg-white rounded-[3rem] p-8 lg:p-12 border border-slate-100 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${contractFiles.length > 0 ? 'bg-teal-50/20 border-teal-200' : 'bg-slate-50 border-slate-200 hover:border-[#004EA8]'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${contractFiles.length > 0 ? 'bg-teal-50 text-teal-600' : 'bg-white text-slate-400 shadow-sm'}`}>
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-widest">Contracts & Addendums</h3>
                  
                  <div className="w-full space-y-2 mb-6 max-h-40 overflow-y-auto">
                    {contractFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <span className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">{file.name}</span>
                        <button onClick={() => removeContractFile(idx)} className="p-1 text-slate-400 hover:text-red-500 transition-colors"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>

                  <label className="cursor-pointer px-6 py-3 bg-[#004EA8] text-white rounded-full text-[10px] font-header font-black hover:bg-[#003375] transition-all uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <Plus className="w-3 h-3" />
                    {contractFiles.length > 0 ? 'Add More' : 'Select Files'}
                    <input type="file" className="hidden" multiple accept="image/*,application/pdf" onChange={handleContractFileChange} />
                  </label>
                </div>
              </div>

              <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${disclosureFile ? 'bg-teal-50/20 border-teal-200' : 'bg-slate-50 border-slate-200 hover:border-[#004EA8]'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${disclosureFile ? 'bg-teal-50 text-teal-600' : 'bg-white text-slate-400 shadow-sm'}`}>
                    <FileSearch className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-widest">Closing Disclosure</h3>
                  
                  {disclosureFile && (
                     <div className="w-full px-4 py-2 bg-white rounded-xl border border-teal-100 mb-6 flex items-center justify-between shadow-sm">
                        <span className="text-[10px] font-bold text-teal-700 truncate max-w-[180px]">{disclosureFile.name}</span>
                        <button onClick={() => setDisclosureFile(null)} className="p-1 text-teal-400 hover:text-red-500 transition-colors"><X className="w-3 h-3" /></button>
                     </div>
                  )}

                  <label className="cursor-pointer px-6 py-3 bg-[#004EA8] text-white rounded-full text-[10px] font-header font-black hover:bg-[#003375] transition-all uppercase tracking-widest shadow-lg">
                    {disclosureFile ? 'Change File' : 'Select File'}
                    <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => setDisclosureFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleCompare}
                disabled={contractFiles.length === 0 || !disclosureFile || isLoading}
                className="group relative px-12 py-6 bg-[#004EA8] text-white rounded-full font-header font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-[#003375] disabled:opacity-50 transition-all active:scale-95"
              >
                <div className="flex items-center gap-4">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing Smart Audit...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Initiate Smart Audit</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </div>
              </button>

              {error && (
                <div className="mt-8 flex items-start gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <p className="text-xs font-bold leading-tight uppercase tracking-wider">{error}</p>
                </div>
              )}

              {comparisonResult && (
                <div className="mt-12 w-full p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#004EA8] shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-header font-extrabold text-[#004EA8]">WCT Audit Results</h4>
                        <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Smart Engine v3.2 ACTIVE</p>
                      </div>
                    </div>
                    <button onClick={handleDownloadReport} className="p-3 bg-white text-slate-600 rounded-full hover:bg-slate-100 shadow-sm transition-all">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="prose prose-slate max-w-none text-slate-600 font-subheader text-sm leading-relaxed whitespace-pre-wrap">
                    {comparisonResult.split('\n').map((line, i) => {
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>');
                      return <div key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formatted }} />;
                    })}
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
