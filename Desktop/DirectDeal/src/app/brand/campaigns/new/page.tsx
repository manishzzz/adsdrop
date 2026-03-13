'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Rocket, 
  Target, 
  IndianRupee, 
  Users, 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2,
  Sparkles
} from 'lucide-react';

const NICHES = ['Food', 'Tech', 'Fitness', 'Skincare', 'Finance', 'Fashion', 'Travel'];

export default function NewCampaignPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brief: '',
    niche_target: [] as string[],
    budget: '',
    min_followers: '1000',
    max_followers: '100000',
    deliverables: '',
  });

  const toggleNiche = (niche: string) => {
    setFormData(prev => ({
      ...prev,
      niche_target: prev.niche_target.includes(niche) 
        ? prev.niche_target.filter(n => n !== niche) 
        : [...prev.niche_target, niche]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call + AI Matching trigger
      await new Promise(resolve => setTimeout(resolve, 2500));
      setSuccess(true);
      // Wait for 2 seconds and redirect
      setTimeout(() => {
        window.location.href = '/brand/dashboard';
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
           <div className="text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-white shadow-xl">
                 <CheckCircle2 className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-black text-white/0 mb-4 bg-clip-text bg-[#005B99]">Campaign Live!</h1>
              <h1 className="text-4xl font-black text-[#005B99] mb-4">Campaign Live!</h1>
              <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">
                 Your campaign is now on the Live Deals Board. Our AI is matching you with creators right now.
              </p>
              <div className="flex items-center justify-center gap-2 text-[#FF6B2B] font-bold">
                 <Sparkles className="w-5 h-5 animate-pulse" /> Triggering AI Match Engine...
              </div>
           </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12 w-full">
        <button 
           onClick={() => window.history.back()}
           className="flex items-center gap-2 text-gray-400 font-bold text-sm mb-8 hover:text-[#005B99] transition-colors uppercase tracking-widest"
        >
           <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
           <div className="mb-10">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase">Post a New Campaign</h1>
              <p className="text-gray-500 font-medium italic">Create a high-converting brief. Every match expires in 48 hours.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-10">
              {/* Campaign Details */}
              <section className="space-y-6">
                 <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3 px-1">Campaign Title</label>
                    <input 
                       type="text" 
                       placeholder="e.g. 15s Reel for SkinGlow Face Cream" 
                       className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all font-bold text-lg text-gray-900"
                       required
                       value={formData.title}
                       onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                 </div>

                 <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3 px-1">Campaign Brief & Requirements</label>
                    <textarea 
                       placeholder="Describe what you want the creator to do. Mention key features, tone of voice, and any 'Must Says'." 
                       rows={5}
                       className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all font-medium text-gray-700 leading-relaxed"
                       required
                       value={formData.brief}
                       onChange={e => setFormData({...formData, brief: e.target.value})}
                    />
                 </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {/* Niche Targets */}
                 <section>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-4 px-1 flex items-center gap-2">
                       <Target className="w-4 h-4 text-[#FF6B2B]" /> Target Niches
                    </label>
                    <div className="flex flex-wrap gap-2">
                       {NICHES.map((niche) => (
                         <button
                           key={niche}
                           type="button"
                           onClick={() => toggleNiche(niche)}
                           className={`px-4 py-2.5 rounded-xl border-2 font-bold transition-all text-sm ${
                             formData.niche_target.includes(niche)
                             ? 'bg-[#005B99] border-[#005B99] text-white shadow-md'
                             : 'bg-white border-gray-100 text-gray-500 hover:border-blue-100'
                           }`}
                         >
                           {niche}
                         </button>
                       ))}
                    </div>
                 </section>

                 {/* Budget & Deliverables */}
                 <section className="space-y-6">
                    <div>
                       <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-4 px-1 flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-[#005B99]" /> Total Budget (₹)
                       </label>
                       <input 
                          type="number" 
                          placeholder="e.g. 15000" 
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all font-black text-2xl text-[#005B99]"
                          required
                          value={formData.budget}
                          onChange={e => setFormData({...formData, budget: e.target.value})}
                       />
                    </div>
                 </section>
              </div>

              <section className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200">
                 <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-gray-400" />
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Follower Range Target</h3>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input 
                       type="number" 
                       placeholder="Min: 1,000" 
                       className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#005B99] outline-none text-gray-900"
                       value={formData.min_followers}
                       onChange={e => setFormData({...formData, min_followers: e.target.value})}
                    />
                    <input 
                       type="number" 
                       placeholder="Max: 200,000" 
                       className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#005B99] outline-none text-gray-900"
                       value={formData.max_followers}
                       onChange={e => setFormData({...formData, max_followers: e.target.value})}
                    />
                 </div>
              </section>

              <div className="pt-6 border-t border-gray-100">
                 <button 
                    disabled={loading}
                    className="w-full bg-[#1A1A2E] text-white py-6 rounded-2xl font-black text-xl hover:bg-black transition-all hover:scale-[1.02] shadow-2xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                    {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <>POST CAMPAIGN NOW <Rocket className="w-8 h-8" /></>}
                 </button>
              </div>
           </form>
        </div>
      </main>
    </div>
  );
}
