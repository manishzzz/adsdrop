'use client';

import Navbar from '@/components/Navbar';
import { 
  Plus, 
  Users, 
  TrendingUp, 
  Target, 
  ChevronRight, 
  BarChart3, 
  IndianRupee,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

const ACTIVE_CAMPAIGNS = [
  {
    id: '1',
    title: 'Summer Skincare Reels',
    category: 'Skincare',
    budget: 12000,
    applicants: 12,
    matches: 5,
    status: 'active',
  },
  {
    id: '2',
    title: 'Monsoon Sale Review',
    category: 'Fashion',
    budget: 8500,
    applicants: 8,
    matches: 3,
    status: 'active',
  }
];

export default function BrandDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Brand Dashboard</h1>
            <p className="text-gray-500 font-medium">Welcome back, Arjun!</p>
          </div>
          <Link 
            href="/brand/campaigns/new" 
            className="bg-[#005B99] text-white px-8 py-3.5 rounded-full font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> POST NEW CAMPAIGN
          </Link>
        </div>

        {/* Brand Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Spends</p>
              <div className="flex items-center text-2xl font-black text-gray-900">
                 <IndianRupee className="w-5 h-5 text-[#005B99]" />
                 <span>1,25,000</span>
              </div>
            </div>
            <div className="bg-blue-50 text-[#005B99] p-3 rounded-2xl group-hover:scale-110 transition-transform">
               <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Active Campaigns</p>
              <p className="text-2xl font-black text-gray-900">2</p>
            </div>
            <div className="bg-orange-50 text-[#FF6B2B] p-3 rounded-2xl group-hover:scale-110 transition-transform">
               <Layers className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Content ROI</p>
              <p className="text-2xl font-black text-gray-900">4.5x</p>
            </div>
            <div className="bg-green-50 text-green-600 p-3 rounded-2xl group-hover:scale-110 transition-transform">
               <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Campaigns List */}
           <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Active Campaigns</h2>
                 <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase">{ACTIVE_CAMPAIGNS.length} Live</span>
              </div>
              
              <div className="space-y-4">
                 {ACTIVE_CAMPAIGNS.map((campaign) => (
                   <div key={campaign.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-[#005B99]/30 transition-all group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-3xl">
                               {campaign.category === 'Skincare' ? '🧴' : '👗'}
                            </div>
                            <div>
                               <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#005B99] transition-colors">{campaign.title}</h3>
                               <div className="mt-1 flex items-center gap-3">
                                  <span className="text-xs font-black text-[#005B99] bg-blue-50 px-2 py-0.5 rounded-md uppercase">{campaign.category}</span>
                                  <div className="flex items-center gap-1 text-[#FF6B2B] font-black text-sm">
                                     <IndianRupee className="w-3.5 h-3.5" />
                                     <span>{campaign.budget.toLocaleString()}</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-10">
                            <div className="text-center">
                               <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Applicants</p>
                               <p className="text-lg font-black text-gray-900">{campaign.applicants}</p>
                            </div>
                            <div className="text-center">
                               <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">AI Matches</p>
                               <p className="text-lg font-black text-[#005B99]">{campaign.matches}</p>
                            </div>
                            <Link 
                               href={`/brand/campaigns/${campaign.id}/matches`}
                               className="bg-gray-50 p-3 rounded-full hover:bg-blue-50 hover:text-[#005B99] transition-all"
                            >
                               <ArrowUpRight className="w-6 h-6" />
                            </Link>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Sidebar */}
           <div className="space-y-8">
              {/* Campaign Tips */}
              <div className="bg-[#1A1A2E] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF6B2B]/20 rounded-full blur-3xl"></div>
                 <div className="w-10 h-10 bg-[#FF6B2B] rounded-xl flex items-center justify-center mb-6">
                    <Target className="w-6 h-6" />
                 </div>
                 <h3 className="text-lg font-black mb-4 uppercase tracking-tight">AI Matching Tip</h3>
                 <p className="text-sm text-gray-400 font-medium mb-6 leading-relaxed">Detailed campaign briefs result in 40% better creator matching. Be specific about your brand voice.</p>
                 <button className="text-sm font-bold text-[#FF6B2B] flex items-center gap-1 hover:gap-2 transition-all">
                    Update Guidelines <ChevronRight className="w-4 h-4" />
                 </button>
              </div>

              {/* Usage Stats */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <h3 className="font-black text-gray-900 uppercase tracking-tight mb-4 text-sm tracking-widest">Creator Network</h3>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="flex -space-x-3">
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                            <span className="text-[10px] font-bold text-gray-400">P{i}</span>
                         </div>
                       ))}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Joined by 12 new creators today</p>
                 </div>
                 <Link href="/deals" className="w-full bg-gray-50 text-gray-600 py-3 rounded-xl font-bold text-xs flex items-center justify-center hover:bg-gray-100 transition-colors uppercase tracking-widest">
                    View Network Stats
                 </Link>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
