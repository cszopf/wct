
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { UserRole } from '../types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface AssistantProps {
  role: UserRole;
}

const Assistant: React.FC<AssistantProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: `Hi! I'm your WCT Growth Assistant. Since you're here as a ${role}, how can I help you grow your business or streamline your closing today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Re-initialize to ensure it uses current environment key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user is on the World Class Title (WCT) website as a ${role}. 
        WCT is a modern title agency and "Growth Partner".
        User Question: ${userMessage}`,
        config: {
          systemInstruction: "You are the WCT Growth Assistant. Answer with professional confidence and high-energy. Keep responses concise.",
        }
      });

      const assistantText = response.text || "I'm sorry, I couldn't process that. Please try again or call 614-882-8022.";
      setMessages(prev => [...prev, { role: 'assistant', text: assistantText }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Secure access check required. Please ensure your project key is connected." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-[#004EA8] text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] h-[550px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#64CCC9] rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-header font-black text-xs uppercase tracking-widest">Growth Assistant</p>
                <p className="text-[8px] text-slate-400 font-header font-black tracking-[0.2em] uppercase">Powered by Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 opacity-50 hover:opacity-100" /></button>
          </div>

          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-2xl text-sm font-subheader leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-[#004EA8] text-white rounded-tr-none' 
                  : 'bg-white text-slate-900 border border-slate-100 shadow-sm rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <Loader2 className="w-4 h-4 animate-spin text-[#64CCC9]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="How can WCT help you win?"
                className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-full text-sm font-header font-bold focus:outline-none focus:ring-2 focus:ring-[#64CCC9]/20 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#004EA8] text-white rounded-full disabled:opacity-30 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;
