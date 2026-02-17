
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  X, 
  MapPin, 
  User, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  Phone, 
  Building2,
  DollarSign,
  ShieldAlert,
  Zap,
  Sparkles,
  UserPlus,
  Briefcase,
  UserCircle,
  Upload,
  File,
  Trash2
} from 'lucide-react';

interface OrderTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TransactionType = 'Purchase' | 'Refinance' | '';
type SubmitterRole = 'Listing Real Estate Agent' | 'Lender' | 'Buy Side Real Estate Agent' | 'Other' | '';

const OrderTitleModal: React.FC<OrderTitleModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isParsingAddress, setIsParsingAddress] = useState(false);
  const [addressQuery, setAddressQuery] = useState('');
  
  // File state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Form State - Refined for essential title opening
  const [formData, setFormData] = useState({
    // Step 1: Submitter & Co-op
    submitterRole: '' as SubmitterRole,
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    coopAgentName: '',
    coopAgentCompany: '',
    coopAgentContact: '',
    
    // Step 2: The Property
    street: '',
    city: '',
    state: '',
    zip: '',
    county: '',
    transactionType: '' as TransactionType,
    
    // Step 3: The Parties & Deal
    purchasePrice: '',
    seller1Name: '',
    seller1Contact: '',
    seller2Name: '',
    buyer1Name: '',
    buyer1Contact: '',
    buyer2Name: '',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  // AI Address Autopopulation
  const handleSmartAddressLookup = async () => {
    if (!addressQuery.trim()) return;
    setIsParsingAddress(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Parse this address and return ONLY a JSON object with keys: street, city, state, zip, county. Address: ${addressQuery}`,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are the WCT Smart Address Parser. Extract structured address data from strings. Return valid JSON."
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      setFormData(prev => ({
        ...prev,
        street: parsed.street || prev.street,
        city: parsed.city || prev.city,
        state: parsed.state || prev.state,
        zip: parsed.zip || prev.zip,
        county: parsed.county || prev.county
      }));
    } catch (err) {
      console.error("Smart Address Error:", err);
    } finally {
      setIsParsingAddress(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fileListText = uploadedFiles.length > 0 
      ? uploadedFiles.map(f => `- ${f.name}`).join('\n')
      : 'No files attached';

    const body = `
WCT SMART TITLE ORDER
---------------------
SUBMITTED BY: ${formData.firstName} ${formData.lastName}
ROLE: ${formData.submitterRole}
EMAIL: ${formData.email}
PHONE: ${formData.phone}
COMPANY: ${formData.company}

CO-OP AGENT / OTHER PARTY:
Name: ${formData.coopAgentName || 'N/A'}
Company: ${formData.coopAgentCompany || 'N/A'}
Contact: ${formData.coopAgentContact || 'N/A'}

PROPERTY:
Street: ${formData.street}
City: ${formData.city}, ${formData.state} ${formData.zip}
County: ${formData.county}

TRANSACTION:
Type: ${formData.transactionType}
Price: ${formData.purchasePrice}

PARTIES:
Seller 1: ${formData.seller1Name} (${formData.seller1Contact})
Seller 2: ${formData.seller2Name}
Buyer 1: ${formData.buyer1Name} (${formData.buyer1Contact})
Buyer 2: ${formData.buyer2Name}

ATTACHED DOCUMENTS:
${fileListText}

NOTES:
${formData.additionalInfo}

(Please ensure all listed documents are attached to this email before sending.)
    `;

    const mailtoUrl = `mailto:info@worldclasstitle.com?subject=New Title Order: ${formData.street}&body=${encodeURIComponent(body)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
        
        {/* Progress Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#004EA8]/5 rounded-2xl flex items-center justify-center text-[#004EA8]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-header font-black text-[#004EA8]">Smart Order</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 w-4 rounded-full transition-all ${step >= i ? 'bg-[#64CCC9]' : 'bg-slate-100'}`} />
                  ))}
                </div>
                <span className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">
                  Step {step}: {step === 1 ? 'Identify Parties' : step === 2 ? 'Property Details' : 'Deal Structure'}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-teal-50 text-[#64CCC9] rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-header font-black text-slate-900 mb-4">Request Prepared</h4>
            <p className="text-slate-500 font-subheader mb-8 leading-relaxed max-w-sm mx-auto text-sm">
              Your order is ready. Click "Send" in the email client that just opened. Don't forget to attach the files you selected!
            </p>
            <button onClick={onClose} className="px-10 py-4 bg-[#004EA8] text-white rounded-full font-header font-black text-xs tracking-widest hover:bg-[#003375] transition-all">
              DONE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
            <div className="flex-grow overflow-y-auto p-8 lg:p-12">
              
              {step === 1 && (
                <div className="space-y-10 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <User className="w-5 h-5 text-[#64CCC9]" />
                      <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest">Identify Yourself</h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Listing Real Estate Agent', 'Lender', 'Buy Side Real Estate Agent', 'Other'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, submitterRole: role as SubmitterRole }))}
                          className={`px-3 py-4 rounded-xl text-[8px] font-header font-black uppercase tracking-widest border transition-all flex flex-col items-center gap-2 text-center ${
                            formData.submitterRole === role 
                            ? 'bg-[#004EA8] text-white border-[#004EA8] shadow-lg scale-[1.02]' 
                            : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {role === 'Other' ? <UserCircle className="w-4 h-4" /> : role === 'Lender' ? <Building2 className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                          {role === 'Listing Real Estate Agent' ? 'Listing Agent' : role === 'Buy Side Real Estate Agent' ? 'Buyer Agent' : role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">First Name *</label>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#004EA8]/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Last Name *</label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#004EA8]/10" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#004EA8]/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Company / Brokerage *</label>
                      <input name="company" value={formData.company} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#004EA8]/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Direct Phone *</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#004EA8]/10" />
                    </div>
                  </div>

                  {/* Co-op Agent Section */}
                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <UserPlus className="w-5 h-5 text-[#64CCC9]" />
                      <label className="text-[10px] font-header font-black text-slate-900 uppercase tracking-widest">Co-op Agent / Other Professional (Optional)</label>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[8px] font-header font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input name="coopAgentName" value={formData.coopAgentName} onChange={handleChange} placeholder="e.g. Jane Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#004EA8]/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-header font-black text-slate-400 uppercase tracking-widest">Company</label>
                        <input name="coopAgentCompany" value={formData.coopAgentCompany} onChange={handleChange} placeholder="Brokerage or Firm" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#004EA8]/10" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-[8px] font-header font-black text-slate-400 uppercase tracking-widest">Contact Info (Email/Phone)</label>
                        <input name="coopAgentContact" value={formData.coopAgentContact} onChange={handleChange} placeholder="jane@example.com / 555-0123" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#004EA8]/10" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                    <MapPin className="w-5 h-5 text-[#64CCC9]" />
                    <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest">Property Details</h4>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center text-[#64CCC9]">
                      {isParsingAddress ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <input 
                      value={addressQuery}
                      onChange={(e) => setAddressQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSmartAddressLookup())}
                      placeholder="Paste address to autopopulate fields..." 
                      className="w-full pl-12 pr-32 py-4 bg-[#004EA8]/5 border border-[#004EA8]/10 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#004EA8]/5 outline-none"
                    />
                    <button 
                      type="button"
                      onClick={handleSmartAddressLookup}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#004EA8] text-white rounded-xl text-[9px] font-header font-black uppercase tracking-widest hover:bg-[#003375]"
                    >
                      Process
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Street Address *</label>
                      <input name="street" value={formData.street} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">City</label>
                      <input name="city" value={formData.city} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">State</label>
                      <input name="state" value={formData.state} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Zip Code</label>
                      <input name="zip" value={formData.zip} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">County *</label>
                      <input name="county" value={formData.county} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Transaction Type *</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Purchase', 'Refinance'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, transactionType: type as TransactionType }))}
                          className={`py-3 rounded-xl text-[10px] font-header font-black uppercase tracking-widest border transition-all ${
                            formData.transactionType === type 
                            ? 'bg-[#004EA8] text-white border-[#004EA8]' 
                            : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-12 animate-in slide-in-from-right-4 duration-300 pb-12">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <FileText className="w-5 h-5 text-[#64CCC9]" />
                    <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest">Parties & Documents</h4>
                  </div>
                  
                  {formData.transactionType === 'Purchase' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Purchase Price *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} required placeholder="ex: $450,000" className="w-full pl-10 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-bold" />
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#64CCC9]" />
                        <label className="text-[10px] font-header font-black text-slate-900 uppercase tracking-widest">Seller(s)</label>
                      </div>
                      <div className="space-y-4">
                        <input name="seller1Name" value={formData.seller1Name} onChange={handleChange} placeholder="Seller 1 Name *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                        <input name="seller1Contact" value={formData.seller1Contact} onChange={handleChange} placeholder="Seller Email or Phone" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#004EA8]" />
                        <label className="text-[10px] font-header font-black text-slate-900 uppercase tracking-widest">Buyer(s)</label>
                      </div>
                      <div className="space-y-4">
                        <input name="buyer1Name" value={formData.buyer1Name} onChange={handleChange} placeholder="Buyer 1 Name *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                        <input name="buyer1Contact" value={formData.buyer1Contact} onChange={handleChange} placeholder="Buyer Email or Phone" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                      </div>
                    </div>
                  </div>

                  {/* Supporting Documents Section */}
                  <div className="space-y-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-[#64CCC9]" />
                        <h4 className="font-header font-black text-xs text-slate-900 uppercase tracking-widest">Supporting Documents</h4>
                      </div>
                      <span className="text-[8px] font-header font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">Smart Upload v3.0</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Upload Area */}
                      <label className="group relative flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-white hover:border-[#004EA8] transition-all cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-[#004EA8]" />
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] font-header font-black text-slate-900 uppercase tracking-widest">Upload Contract / Docs</p>
                            <p className="text-[9px] font-header font-bold text-slate-400 uppercase mt-1 tracking-tighter">PDF, JPEG, or PNG</p>
                          </div>
                        </div>
                        <input type="file" multiple onChange={handleFileChange} className="hidden" />
                      </label>

                      {/* File List */}
                      <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2">
                        {uploadedFiles.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-40 italic">
                            <p className="text-[9px] font-header font-bold uppercase">No files selected</p>
                          </div>
                        ) : (
                          uploadedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-[#64CCC9] transition-all">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                                  <File className="w-4 h-4 text-[#004EA8]" />
                                </div>
                                <div className="truncate">
                                  <p className="text-[10px] font-header font-black text-slate-700 truncate">{file.name}</p>
                                  <p className="text-[8px] font-header font-bold text-slate-400 uppercase tracking-tighter">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button 
                                type="button" 
                                onClick={() => removeFile(idx)}
                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest">Additional Instructions</label>
                    <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} className="w-full h-24 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#004EA8]/10" placeholder="Any special instructions or nuances?" />
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#004EA8]/5 rounded-2xl border border-[#004EA8]/10">
                    <ShieldAlert className="w-5 h-5 text-[#004EA8] shrink-0" />
                    <p className="text-[9px] text-[#004EA8] font-header font-bold uppercase leading-relaxed tracking-wider">
                      Orders are initiated within 2 business hours. Our processing team will contact all parties. Ensure all documents are attached to the draft email.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Sticky Actions */}
            <div className="p-8 border-t border-slate-100 shrink-0 flex items-center justify-between bg-white">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={handleBack}
                  className="px-8 py-4 bg-slate-50 text-slate-500 rounded-full font-header font-black text-[10px] tracking-widest hover:bg-slate-100 transition-all flex items-center gap-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  BACK
                </button>
              ) : <div />}

              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  disabled={step === 1 && !formData.submitterRole}
                  className="px-10 py-4 bg-[#004EA8] text-white rounded-full font-header font-black text-[10px] tracking-widest hover:bg-[#003375] transition-all flex items-center gap-3 shadow-lg disabled:opacity-50"
                >
                  NEXT
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-[#004EA8] text-white rounded-full font-header font-black text-xs tracking-[0.2em] hover:bg-[#003375] transition-all flex items-center gap-4 shadow-2xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      OPEN TITLE FILE
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderTitleModal;
