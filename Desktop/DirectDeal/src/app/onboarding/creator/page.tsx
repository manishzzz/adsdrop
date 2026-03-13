'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Rocket, User, Instagram, Youtube, TrendingUp, CreditCard, Tag, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

const NICHES = ['Food', 'Tech', 'Fitness', 'Skincare', 'Finance', 'Fashion', 'Travel'];

export default function CreatorOnboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    language: 'English',
    instagram: '',
    youtube: '',
    rate_reel: '',
    rate_story: '',
    rate_youtube: '',
    niches: [] as string[],
  });

  const [stats, setStats] = useState({
    followers: 0,
    engagement: 0,
    bio: '',
    fetched: false
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Simulate Apify call to backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStats({
        followers: 12500,
        engagement: 4.2,
        bio: 'Foodie by heart | Bangalore explorer | 🍕 Reviewing India one plate at a time',
        fetched: true
      });
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleNiche = (niche: string) => {
    setFormData(prev => ({
      ...prev,
      niches: prev.niches.includes(niche) 
        ? prev.niches.filter(n => n !== niche) 
        : [...prev.niches, niche]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-12 px-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s} 
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  s <= step ? 'bg-[#005B99] shadow-sm' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 min-h-[500px] flex flex-col">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-blue-50 text-[#005B99] rounded-xl flex items-center justify-center mb-4">
                    <User className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">The Basics</h1>
                  <p className="text-gray-500">Let's start with who you are.</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Priya Sharma" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-medium"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1">Current City</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Bangalore" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-medium"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-8 mt-auto">
                    <button 
                      onClick={handleNext} 
                      disabled={!formData.name || !formData.city}
                      className="w-full bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:scale-[1.02] shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      NEXT STEP <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Connect Platform</h1>
                  <p className="text-gray-500">Enter your handles to fetch verified stats.</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1">Instagram Handle</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                      <input 
                        type="text" 
                        placeholder="username" 
                        className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-medium"
                        value={formData.instagram}
                        onChange={e => setFormData({...formData, instagram: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1 font-bold italic opacity-70">Optional</label>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1">YouTube Handle</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                      <input 
                        type="text" 
                        placeholder="channel" 
                        className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-medium"
                        value={formData.youtube}
                        onChange={e => setFormData({...formData, youtube: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-auto flex gap-4">
                    <button onClick={handleBack} className="p-5 bg-gray-50 text-gray-400 rounded-2xl hover:text-gray-600 transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={fetchStats} 
                      disabled={loading || !formData.instagram}
                      className="flex-1 bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:scale-[1.02] shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>FETCH MY STATS <TrendingUp className="w-6 h-6" /></>}
                    </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in zoom-in duration-500 flex flex-col h-full">
                <div className="mb-8 text-center">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-white shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Stats Verified!</h1>
                  <p className="text-gray-500">We've found your profile on Instagram.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-8 flex-1">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-[#005B99] rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                        {formData.instagram[0]?.toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">@{formData.instagram}</h4>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Verified Profile</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl shadow-sm">
                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Followers</p>
                         <p className="text-2xl font-black text-[#005B99]">{stats.followers.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm">
                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Engagement</p>
                         <p className="text-2xl font-black text-[#FF6B2B]">{stats.engagement}%</p>
                      </div>
                   </div>

                   <div className="mt-4 p-4 bg-white rounded-2xl shadow-sm">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Bio Preview</p>
                      <p className="text-sm text-gray-600 italic line-clamp-2">"{stats.bio}"</p>
                   </div>
                </div>

                <div className="pt-2 mt-auto">
                    <button 
                      onClick={handleNext} 
                      className="w-full bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                      CONFIRM & CONTINUE <ArrowRight className="w-6 h-6" />
                    </button>
                    <button onClick={handleBack} className="w-full text-center text-gray-400 font-bold text-sm mt-4">This isn't me</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-orange-50 text-[#FF6B2B] rounded-xl flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Rate Card</h1>
                  <p className="text-gray-500">What do you charge per collaboration?</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1 italic">Instagram Reel</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input 
                        type="number" 
                        placeholder="e.g. 5000" 
                        className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-black text-xl"
                        value={formData.rate_reel}
                        onChange={e => setFormData({...formData, rate_reel: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block px-1 italic">Insta Story</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                        <input 
                          type="number" 
                          placeholder="2000" 
                          className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-black text-xl"
                          value={formData.rate_story}
                          onChange={e => setFormData({...formData, rate_story: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block px-1 italic">YouTube Video</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                        <input 
                          type="number" 
                          placeholder="0" 
                          className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-black text-xl"
                          value={formData.rate_youtube}
                          onChange={e => setFormData({...formData, rate_youtube: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-auto flex gap-4">
                    <button onClick={handleBack} className="p-5 bg-gray-50 text-gray-400 rounded-2xl hover:text-gray-600 transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={handleNext} 
                      disabled={!formData.rate_reel || !formData.rate_story}
                      className="flex-1 bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      ALMOST THERE <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-blue-50 text-[#005B99] rounded-xl flex items-center justify-center mb-4">
                    <Tag className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Select Your Niches</h1>
                  <p className="text-gray-500">Pick up to 3 topics you create content about.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1 overflow-y-auto max-h-[300px] mb-8 pr-2 no-scrollbar">
                  {NICHES.map((niche) => (
                    <button
                      key={niche}
                      onClick={() => toggleNiche(niche)}
                      className={`p-4 rounded-2xl border-2 font-bold transition-all text-center ${
                        formData.niches.includes(niche)
                        ? 'bg-[#005B99] border-[#005B99] text-white shadow-lg scale-95'
                        : 'bg-white border-gray-100 text-gray-500 hover:border-blue-100'
                      }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-auto">
                    <button 
                      onClick={() => window.location.href = '/creator/dashboard'}
                      disabled={formData.niches.length === 0}
                      className="w-full bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      COMPLETE ONBOARDING <CheckCircle2 className="w-6 h-6" />
                    </button>
                    <button onClick={handleBack} className="w-full text-center text-gray-400 font-bold text-sm mt-4">Go Back</button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Step {step} of 5</p>
          </div>
        </div>
      </main>
    </div>
  );
}
