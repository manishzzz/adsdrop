'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Rocket, Building2, Instagram, Wallet, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function BrandOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    category: '',
    instagram: '',
    budget_range: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-12 px-8">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  s <= step ? 'bg-[#005B99] shadow-sm' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 min-h-[400px] flex flex-col">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-blue-50 text-[#005B99] rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Company Info</h1>
                  <p className="text-gray-500">Tell us about your brand.</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. SkinGlow India" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-medium"
                      value={formData.company_name}
                      onChange={e => setFormData({...formData, company_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1">Your Name (Contact)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Arjun Gupta" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-medium"
                      value={formData.contact_name}
                      onChange={e => setFormData({...formData, contact_name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-8 mt-auto">
                    <button 
                      onClick={handleNext} 
                      disabled={!formData.company_name || !formData.contact_name}
                      className="w-full bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:scale-[1.02] shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      CONTINUE <ArrowRight className="w-6 h-6" />
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
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Social Presence</h1>
                  <p className="text-gray-500">Help creators learn about your products.</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1">Instagram Handle</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                      <input 
                        type="text" 
                        placeholder="brandname" 
                        className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-medium"
                        value={formData.instagram}
                        onChange={e => setFormData({...formData, instagram: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block px-1">Category</label>
                    <select 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900 font-medium appearance-none"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      <option value="Food">Food & Beverage</option>
                      <option value="Tech">Tech & Gadgets</option>
                      <option value="Fitness">Fitness & Health</option>
                      <option value="Skincare">Skincare & Beauty</option>
                      <option value="Finance">Finance</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Travel">Travel</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8 mt-auto flex gap-4">
                    <button onClick={handleBack} className="p-5 bg-gray-50 text-gray-400 rounded-2xl hover:text-gray-600 transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={handleNext} 
                      disabled={!formData.instagram || !formData.category}
                      className="flex-1 bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:scale-[1.02] shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      NEXT STEP <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Typical Budget</h1>
                  <p className="text-gray-500">Help us match you with the right creators.</p>
                </div>

                <div className="space-y-4 flex-1">
                  {[
                    "Below ₹10,000",
                    "₹10,000 - ₹50,000",
                    "₹50,000 - ₹2,00,000",
                    "₹2,00,000+",
                  ].map((range) => (
                    <button
                      key={range}
                      onClick={() => setFormData({...formData, budget_range: range})}
                      className={`w-full p-5 rounded-2xl border-2 font-bold transition-all text-left flex justify-between items-center ${
                        formData.budget_range === range
                        ? 'bg-[#005B99]/5 border-[#005B99] text-[#005B99]'
                        : 'bg-white border-gray-100 text-gray-500 hover:border-blue-100'
                      }`}
                    >
                      {range}
                      {formData.budget_range === range && <CheckCircle2 className="w-6 h-6" />}
                    </button>
                  ))}
                </div>

                <div className="pt-8 mt-auto flex gap-4">
                    <button onClick={handleBack} className="p-5 bg-gray-50 text-gray-400 rounded-2xl hover:text-gray-600 transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={handleNext} 
                      disabled={!formData.budget_range}
                      className="flex-1 bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      FINISH SETUP <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in zoom-in duration-500 flex flex-col h-full items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">You're All Set!</h1>
                <p className="text-gray-500 text-lg mb-10 max-w-sm">
                  Welcome aboard, {formData.contact_name}. Ready to post your first campaign?
                </p>

                <button 
                  onClick={() => window.location.href = '/brand/dashboard'}
                  className="w-full max-w-sm bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:scale-[1.05] shadow-2xl active:scale-95 flex items-center justify-center gap-2"
                >
                  GO TO DASHBOARD <Rocket className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {step < 4 && (
            <div className="text-center mt-8">
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Step {step} of 3</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
