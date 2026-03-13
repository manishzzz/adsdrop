'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';
import { Phone, ArrowRight, ShieldCheck, Loader2, Rocket } from 'lucide-react';
import NoSSR from '@/components/hoc/NoSSR';

export default function AuthPage() {
  const [userType, setUserType] = useState<'creator' | 'brand'>('creator');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPlaceholder = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isPlaceholder) {
        console.warn('Using simulation mode (placeholder keys detected)');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStep('otp');
        return;
      }

      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone}`,
      });

      if (error) throw error;
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isPlaceholder) {
        console.warn('Using simulation mode (placeholder keys detected)');
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.location.href = userType === 'creator' ? '/onboarding/creator' : '/onboarding/brand';
        return;
      }

      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone}`,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;
      if (data.session) {
        window.location.href = userType === 'creator' ? '/onboarding/creator' : '/onboarding/brand';
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoSSR>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
          <div className="w-full max-w-md">
            {/* Toggle */}
            <div className="bg-white p-1.5 rounded-2xl flex shadow-sm border border-gray-100 mb-8">
              <button
                onClick={() => setUserType('creator')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  userType === 'creator' ? 'bg-[#005B99] text-white shadow-lg scale-[1.02]' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                CREATOR
              </button>
              <button
                onClick={() => setUserType('brand')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  userType === 'brand' ? 'bg-[#005B99] text-white shadow-lg scale-[1.02]' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                BRAND
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#005B99]/10 text-[#005B99] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  {userType === 'creator' ? 'Ready to earn?' : 'Ready to scale?'}
                </h1>
                <p className="text-gray-500 mt-1">
                  {step === 'phone' ? 'Log in with your phone number' : `Enter code sent to ${phone}`}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 border border-red-100">
                  {error}
                </div>
              )}

              {step === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        placeholder="+91-XXXXXXXXXX"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all font-medium text-gray-900"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    disabled={loading}
                    className="w-full bg-[#005B99] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#004a7c] transition-all hover:scale-[1.02] shadow-xl active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>CONTINUE <ArrowRight className="w-6 h-6" /></>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">
                      OTP Code
                    </label>
                    <input
                      type="text"
                      placeholder="• • • • • •"
                      maxLength={6}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all font-black text-3xl tracking-[1.5em] text-center text-[#005B99]"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button
                    disabled={loading}
                    className="w-full bg-[#FF6B2B] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#e65a1b] transition-all hover:scale-[1.02] shadow-xl active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>VERIFY & LOGIN <ShieldCheck className="w-6 h-6" /></>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="w-full text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </div>

            <p className="text-center text-gray-400 text-sm mt-8 px-8">
              By joining, you agree to DirectDeal's 48-hour deal commitment and community guidelines.
            </p>
          </div>
        </main>
      </div>
    </NoSSR>
  );
}
