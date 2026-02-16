
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
      // Directly initialize - the SDK handles the process.env.API_KEY injection
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
        throw new Error("The Smart Engine was unable to extract clear data from these files. Please ensure documents are well-lit and legible.");
      }

      setComparisonResult(response.text);
    } catch (err: any) {
      console.error("WCT Audit Error:", err);
      // Map technical errors to user-friendly WCT branded messages
      if (err.message?.includes('403') || err.message?.includes('API_KEY')) {
        setError("Secure Connection Unavailable: The audit engine is undergoing maintenance. Please contact your WCT account executive.");
      } else if (err.message?.includes('429')) {
        setError("High Traffic Alert: The Smart Audit Engine is processing multiple files. Please retry in 30 seconds.");
      } else {
        setError(err.message || "An unexpected error occurred. Please refresh and ensure files are under 10MB.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!comparisonResult) return;

    const logoUrl = "https://images.squarespace-cdn.com/content/v1/5f4d40b11b4f1e6a11b920b5/1598967776211-2JVFU1R4U8PQM71BWUVE/WorldClassTitle_Logos-RGB-Primary.png?format=1500w";
    const timestamp = new Date().toLocaleString();
    const disclaimer = "LEGAL DISCLAIMER: This AI-generated audit report is provided for informational purposes only and must be reviewed by a licensed World Class Title agent before closing. World Class Title makes no warranties, express or implied, as to the accuracy, completeness, or reliability of this automated analysis. Final figures are subject to verification and adjustment by the title agency and lender.";

    const htmlContent = `
      <html>
        <head>
          <title>WCT Closing Guard™ Smart Audit</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&display=swap');
            body { font-family: 'Nunito Sans', sans-serif; padding: 60px; color: #1e293b; line-height: 1.6; max-width: 900px; margin: 0 auto; background: #fff; }
            .header { text-align: center; border-bottom: 3px solid #004EA8; padding-bottom: 30px; margin-bottom: 40px; }
            .logo { max-height: 70px; margin-bottom: 15px; }
            .title { color: #004EA8; font-size: 28px; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 0.05em; }
            .meta { font-size: 11px; color: #64748b; text-transform: uppercase; margin-top: 8px; font-weight: 700; letter-spacing: 0.1em; }
            .content { background: #fdfdfd; padding: 40px; border-radius: 24px; border: 1px solid #f1f5f9; white-space: pre-wrap; font-size: 15px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); color: #334155; }
            .content strong { color: #004EA8; text-transform: uppercase; letter-spacing: 0.025em; }
            .disclaimer { margin-top: 50px; padding: 25px; border: 2px solid #fee2e2; background: #fef2f2; border-radius: 16px; font-size: 12px; color: #991b1b; font-weight: 700; line-height: 1.5; }
            .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 30px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logoUrl}" class="logo" />
            <h1 class="title">Closing Guard™ Smart Audit Report</h1>
            <div class="meta">WCT Intelligence Engine v3.2 | Generated: ${timestamp}</div>
          </div>
          <div class="content">${comparisonResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
          <div class="disclaimer">${disclaimer}</div>
          <div class="footer">
            World Class Title | Growth Partner Experience<br/>
            5040 Pine Creek Drive, Westerville, OH 43081 | 614-882-8022
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WCT-Smart-Audit-Report-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper to render basic markdown bolding in UI
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
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#004EA8] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Branded Analysis</h4>
                  <p className="text-sm text-slate-500">Tailored to WCT's elite standards of transaction precision.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#004EA8] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Growth Protection</h4>
                  <p className="text-sm text-slate-500">Automated alerts keep your commissions and credits safe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 bg-slate-50 rounded-[3rem] p-8 lg:p-12 border border-slate-100 shadow-inner">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${contractFiles.length > 0 ? 'bg-white border-teal-200' : 'bg-white/50 border-slate-200 hover:border-[#004EA8]'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${contractFiles.length > 0 ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-widest">Contracts & Addendums</h3>
                  <p className="text-[10px] text-slate-400 mb-6 uppercase">Upload contract plus any price or repair addendums</p>
                  
                  <div className="w-full space-y-2 mb-6">
                    {contractFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">{file.name}</span>
                        <button onClick={() => removeContractFile(idx)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <label className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-header font-black hover:bg-slate-50 transition-all uppercase tracking-widest flex items-center gap-2 shadow-sm">
                    <Plus className="w-3 h-3" />
                    {contractFiles.length > 0 ? 'Add More Docs' : 'Select Files'}
                    <input 
                      type="file" 
                      className="hidden" 
                      multiple
                      accept="image/*,application/pdf"
                      onChange={handleContractFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${disclosureFile ? 'bg-white border-teal-200' : 'bg-white/50 border-slate-200 hover:border-[#004EA8]'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${disclosureFile ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                    <FileSearch className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-widest">Closing Disclosure</h3>
                  <p className="text-[10px] text-slate-400 mb-6 uppercase">Upload latest CD draft</p>
                  
                  {disclosureFile && (
                     <div className="w-full px-4 py-2 bg-teal-50 rounded-xl border border-teal-100 mb-6 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-teal-700 truncate max-w-[180px]">{disclosureFile.name}</span>
                        <button onClick={() => setDisclosureFile(null)} className="p-1 text-teal-400 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                     </div>
                  )}

                  <label className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-header font-black hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm">
                    {disclosureFile ? 'Change File' : 'Select File'}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,application/pdf"
                      onChange={(e) => setDisclosureFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleCompare}
                disabled={contractFiles.length === 0 || !disclosureFile || isLoading}
                className="group relative px-12 py-6 bg-[#004EA8] text-white rounded-full font-header font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-[#003375] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <div className="flex items-center gap-4">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Synchronizing Data...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Initiate WCT Smart Audit</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </div>
              </button>

              {error && (
                <div className="mt-8 flex items-start gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300 max-w-md">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold leading-tight uppercase tracking-wider">{error}</p>
                </div>
              )}

              {comparisonResult && (
                <div className="mt-12 w-full p-8 lg:p-12 bg-white rounded-[2.5rem] shadow-2xl border border-[#004EA8]/10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#004EA8] rounded-2xl flex items-center justify-center text-white shadow-[0_8px_16px_rgba(0,78,168,0.2)]">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-header font-extrabold text-[#004EA8]">Official WCT Audit Results</h4>
                      <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Smart Engine v3.2 ACTIVE</p>
                    </div>
                  </div>
                  
                  <div className="prose prose-slate max-w-none mb-10">
                    <div className="text-slate-600 font-subheader text-sm leading-relaxed whitespace-pre-wrap">
                      {formatResultText(comparisonResult)}
                    </div>
                  </div>

                  <div className="p-6 bg-red-50 border border-red-100 rounded-2xl mb-10">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] leading-relaxed font-bold text-red-700 uppercase tracking-wider">
                        LEGAL DISCLAIMER: This AI-generated audit report is provided for informational purposes only and must be reviewed by a licensed World Class Title agent before closing. World Class Title makes no warranties, express or implied, as to accuracy. Final figures are subject to verification and adjustment.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3 order-2 sm:order-1">
                      <div className="w-2 h-2 bg-[#64CCC9] rounded-full animate-pulse" />
                      <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Audit Pipeline Secure</p>
                    </div>
                    <button 
                      onClick={handleDownloadReport}
                      className="px-8 py-3 bg-[#004EA8] text-white rounded-full text-[10px] font-header font-black uppercase tracking-widest flex items-center gap-3 hover:bg-[#003375] transition-all hover:shadow-xl order-1 sm:order-2 shadow-md active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      Download WCT Report
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
