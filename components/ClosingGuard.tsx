
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
  Download
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
      // Create a fresh instance right before call to ensure up-to-date API key
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
              { text: "Execute WCT Smart Audit. Compare all contract addendums against the closing disclosure for total synchronization." }
            ]
          }
        ],
        config: {
          systemInstruction: `You are the World Class Title (WCT) Smart Audit Engine. Your goal is to ensure 100% transaction precision for our growth partners.
          
          Analyze the provided documents: 
          1. The Purchase Contract and all its Addendums (Extensions, Price Adjustments, Repair Credits).
          2. The Closing Disclosure (CD).
          
          Task: Cross-reference these documents with extreme scrutiny. 
          
          Terminology to use:
          - "SYNCHRONIZED": When figures match perfectly.
          - "GROWTH PROTECTION ALERT": When there is a discrepancy.
          - "WCT PRECISION RATING": Your confidence in the audit.
          
          Structure your report:
          1. **WCT SMART AUDIT SUMMARY**: Overall status of the file.
          2. **GROWTH PARTNER DATA BREAKDOWN**: Table-like comparison of Sale Price, Earnest Money, and specific Seller Credits.
          3. **DISCREPANCY ANALYSIS**: Detailed callouts for any "GROWTH PROTECTION ALERTS", citing specific addendums.
          4. **WCT PROACTIVE CONCLUSION**: Final recommendation for the title agent.
          
          Tone: Professional, elite, and proactive. Use bold headers. Do not use conversational filler. Focus strictly on the data.`,
          temperature: 0.1,
        }
      });

      if (!response.text) {
        throw new Error("Smart Engine: No valid extraction could be made. Ensure text is clear.");
      }

      setComparisonResult(response.text);
    } catch (err: any) {
      console.error("WCT Audit Error:", err);
      if (err.message?.includes('Requested entity was not found')) {
        setError("Secure Connection Reset: Please refresh and re-connect your key.");
      } else if (err.message?.includes('403') || err.message?.includes('API_KEY')) {
        setError("Secure Access Error: A valid API key is required. Please check your project settings.");
      } else {
        setError(err.message || "An unexpected error occurred. Please ensure files are under 10MB.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!comparisonResult) return;
    const timestamp = new Date().toLocaleString();
    const htmlContent = `
      <html>
        <head>
          <title>WCT Closing Guard™ Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; line-height: 1.6; color: #334155; max-width: 800px; margin: 0 auto; }
            h1 { color: #004EA8; border-bottom: 2px solid #004EA8; padding-bottom: 10px; }
            .content { white-space: pre-wrap; margin-top: 20px; }
            strong { color: #004EA8; }
            .footer { margin-top: 40px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Closing Guard™ Smart Audit Report</h1>
          <p>Generated: ${timestamp}</p>
          <div class="content">${comparisonResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
          <div class="footer">World Class Title | Growth Partner Experience</div>
        </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WCT-Audit-${Date.now()}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatResultText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <div key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
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
              Closing Guard™ <br/><span className="text-[#64CCC9]">Smart Audit</span>
            </h2>
            <p className="text-xl text-slate-500 font-subheader leading-relaxed mb-8">
              Experience the power of proactive closing. Our Smart Audit Engine cross-references your entire file history to ensure total financial alignment.
            </p>
          </div>

          <div className="lg:w-2/3 bg-slate-50 rounded-[3rem] p-8 lg:p-12 border border-slate-100 shadow-inner">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${contractFiles.length > 0 ? 'bg-white border-teal-200' : 'bg-white/50 border-slate-200 hover:border-[#004EA8]'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${contractFiles.length > 0 ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-widest">Contracts & Addendums</h3>
                  <div className="w-full space-y-2 mb-6">
                    {contractFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">{file.name}</span>
                        <button onClick={() => removeContractFile(idx)} className="p-1 text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                  <label className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-header font-black hover:bg-slate-50 transition-all uppercase tracking-widest flex items-center gap-2 shadow-sm">
                    <Plus className="w-3 h-3" />
                    {contractFiles.length > 0 ? 'Add More' : 'Select Files'}
                    <input type="file" className="hidden" multiple accept="image/*,application/pdf" onChange={handleContractFileChange} />
                  </label>
                </div>
              </div>

              <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${disclosureFile ? 'bg-white border-teal-200' : 'bg-white/50 border-slate-200 hover:border-[#004EA8]'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${disclosureFile ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                    <FileSearch className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-widest">Closing Disclosure</h3>
                  {disclosureFile && (
                     <div className="w-full px-4 py-2 bg-teal-50 rounded-xl border border-teal-100 mb-6 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-teal-700 truncate max-w-[180px]">{disclosureFile.name}</span>
                        <button onClick={() => setDisclosureFile(null)} className="p-1 text-teal-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                     </div>
                  )}
                  <label className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-header font-black hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm">
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
                  {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Processing Audit...</span></> : <><Sparkles className="w-5 h-5" /><span>Initiate Smart Audit</span><ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>}
                </div>
              </button>

              {error && (
                <div className="mt-8 flex items-start gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <p className="text-xs font-bold leading-tight uppercase tracking-wider">{error}</p>
                </div>
              )}

              {comparisonResult && (
                <div className="mt-12 w-full p-8 bg-white rounded-[2.5rem] shadow-2xl border border-[#004EA8]/10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#004EA8] rounded-2xl flex items-center justify-center text-white shadow-xl">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-header font-extrabold text-[#004EA8]">WCT Audit Results</h4>
                        <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Smart Engine v3.2 ACTIVE</p>
                      </div>
                    </div>
                    <button onClick={handleDownloadReport} className="p-3 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100"><Download className="w-5 h-5" /></button>
                  </div>
                  <div className="prose prose-slate max-w-none mb-10 text-slate-600 font-subheader text-sm leading-relaxed whitespace-pre-wrap">
                    {formatResultText(comparisonResult)}
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
