'use client';

import { useState } from 'react';
import { Send, User, Building2, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  text: string;
  created_at: string;
  role: 'creator' | 'brand';
}

export default function DealChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender_id: 'b1',
      sender_name: 'Arjun (Brand)',
      text: 'Hi Priya! Loved your recent reel on Bangalore cafes. Would love to collaborate for our summer skincare launch.',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      role: 'brand'
    },
    {
      id: '2',
      sender_id: 'c1',
      sender_name: 'Priya (Creator)',
      text: 'Hey Arjun! Thanks so much. I watched your brand video too, the aesthetic is great. Happy to discuss the brief.',
      created_at: new Date(Date.now() - 1800000).toISOString(),
      role: 'creator'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender_id: 'c1',
      sender_name: 'Priya (Creator)',
      text: inputText,
      created_at: new Date().toISOString(),
      role: 'creator'
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl flex flex-col h-[600px] overflow-hidden">
       <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#005B99] rounded-xl flex items-center justify-center text-white font-bold">
                <MessageSquare className="w-5 h-5" />
             </div>
             <div>
                <h3 className="font-black text-gray-900 uppercase text-sm tracking-widest">Deal Discussion</h3>
                <p className="text-[10px] text-green-500 font-bold uppercase animate-pulse flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online Now
                </p>
             </div>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'creator' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[80%] flex items-end gap-3 ${msg.role === 'creator' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 ${
                     msg.role === 'creator' ? 'bg-[#005B99] text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                     {msg.role === 'creator' ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm ${
                     msg.role === 'creator' 
                     ? 'bg-[#005B99] text-white rounded-br-none shadow-md' 
                     : 'bg-gray-100 text-gray-700 rounded-bl-none'
                  }`}>
                     <p className="font-bold text-[10px] mb-1 opacity-70 uppercase tracking-tighter">{msg.sender_name}</p>
                     <p className="leading-relaxed">{msg.text}</p>
                     <p className={`text-[8px] mt-2 text-right opacity-60`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </p>
                  </div>
               </div>
            </div>
          ))}
       </div>

       <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-100 bg-white">
          <div className="relative flex items-center">
             <input 
                type="text" 
                placeholder="Type your message..." 
                className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all font-medium text-gray-900"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
             />
             <button 
                type="submit"
                className="absolute right-2 bg-[#005B99] text-white p-3 rounded-xl hover:bg-[#004a7c] transition-all active:scale-95 shadow-lg"
             >
                <Send className="w-5 h-5" />
             </button>
          </div>
       </form>
    </div>
  );
}
