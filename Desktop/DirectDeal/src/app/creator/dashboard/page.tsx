'use client';

import Navbar from '@/components/Navbar';
import CountdownTimer from '@/components/CountdownTimer';
import { 
  TrendingUp, 
  Wallet, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  ChevronRight, 
  LayoutDashboard,
  IndianRupee,
  MessageSquare,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const ACTIVE_MATCHES = [
  {
    id: '1',
    brand_name: 'SkinGlow India',
    campaign_title: 'Summer Skincare Campaign',
    budget: 12000,
    expires_at: new Date(Date.now() + 32 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: '2',
    brand_name: 'TechGeek',
    campaign_title: 'Smartphone Review Reel',
    budget: 25000,
    expires_at: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  }
];

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Creator Dashboard</h1>
            <p className="text-gray-500 font-medium">Welcome back, Priya!</p>
          </div>
          <Link 
            href="/deals" 
            className="bg-[#005B99] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm flex items-center gap-2"
          >
            Browse New Deals <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow transition-all">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Earned</p>
              <div className="flex items-center text-2xl font-black text-gray-900">
                 <IndianRupee className="w-5 h-5 text-[#005B99]" />
                 <span>45,000</span>
              </div>
            </div>
            <div className="bg-green-50 text-green-600 p-3 rounded-2xl group-hover:scale-110 transition-transform">
               <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow transition-all">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Payout</p>
              <div className="flex items-center text-2xl font-black text-gray-900">
                 <IndianRupee className="w-5 h-5 text-[#FF6B2B]" />
                 <span>12,000</span>
              </div>
            </div>
            <div className="bg-orange-50 text-[#FF6B2B] p-3 rounded-2xl group-hover:scale-110 transition-transform">
               <Clock className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow transition-all">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Success Rate</p>
              <p className="text-2xl font-black text-gray-900">92%</p>
            </div>
            <div className="bg-blue-50 text-[#005B99] p-3 rounded-2xl group-hover:scale-110 transition-transform">
               <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Active Matches */}
           <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6 text-gray-900">
                 <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#FF6B2B] fill-[#FF6B2B]" /> Active Matches
                 </h2>
                 <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase">2 New</span>
              </div>
              
              <div className="space-y-4">
                 {ACTIVE_MATCHES.map((match) => (
                   <div key={match.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-[#005B99]/30 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4">
                         <div className="text-[10px] text-gray-400 font-bold uppercase mb-1 text-right">Expires In</div>
                         <CountdownTimer expiresAt={match.expires_at} />
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-2xl font-black text-gray-300">
                               {match.brand_name[0]}
                            </div>
                            <div>
                               <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#005B99] transition-colors">{match.brand_name}</h3>
                               <p className="text-sm text-gray-500 font-medium">{match.campaign_title}</p>
                               <div className="mt-2 flex items-center gap-2 text-[#005B99] font-black">
                                  <IndianRupee className="w-4 h-4" />
                                  <span>{match.budget.toLocaleString()}</span>
                               </div>
                            </div>
                         </div>
                         
                         <div className="flex flex-col sm:flex-row gap-3">
                            <Link 
                               href={`/deals/${match.id}`}
                               className="bg-white text-gray-600 border border-gray-200 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors text-center"
                            >
                               View Brief
                            </Link>
                            <Link 
                               href={`/deals/${match.id}?action=chat`}
                               className="bg-[#005B99] text-white px-8 py-2.5 rounded-full text-sm font-black hover:bg-[#004a7c] transition-all shadow-lg text-center"
                            >
                               Accept Deal
                            </Link>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Sidebar */}
           <div className="space-y-8">
              {/* Profile Completion */}
              <div className="bg-[#1A1A2E] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#005B99]/20 rounded-full blur-3xl"></div>
                 <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Profile Status</h3>
                 <div className="w-full bg-white/10 h-3 rounded-full mb-4">
                    <div className="bg-[#FF6B2B] h-full w-[85%] rounded-full shadow-[0_0_15px_rgba(255,107,43,0.5)]"></div>
                 </div>
                 <p className="text-sm text-gray-400 font-medium mb-6">Your profile is 85% complete. Add your YouTube to unlock more deals.</p>
                 <Link href="/onboarding/creator?step=2" className="text-sm font-bold text-[#FF6B2B] flex items-center gap-1 hover:gap-2 transition-all">
                    Complete Now <ChevronRight className="w-4 h-4" />
                 </Link>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <h3 className="font-black text-gray-900 uppercase tracking-tight mb-4 text-sm tracking-widest">Quick Actions</h3>
                 <div className="flex flex-col gap-2">
                    <button className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                       <div className="flex items-center gap-3">
                          <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-[#005B99]" />
                          <span className="text-sm font-bold text-gray-600">Update Rate Card</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-300" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                       <div className="flex items-center gap-3">
                          <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-[#005B99]" />
                          <span className="text-sm font-bold text-gray-600">Support Chat</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-300" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
