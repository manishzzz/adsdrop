'use client';

import Navbar from '@/components/Navbar';
import CreatorCard from '@/components/CreatorCard';
import { ArrowLeft, Sparkles, Filter, Info } from 'lucide-react';
import { use } from 'react';

const MOCK_MATCHES = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    handle: 'priyaeats',
    followers: 18500,
    engagement: 4.2,
    niches: ['Food', 'Lifestyle'],
    rate_reel: 5000,
    match_score: 94,
    match_reason: 'Her food content style perfectly matches your brand tone. 78% of her audience is female, 22-34, Bangalore — your exact buyer.',
  },
  {
    id: 'c2',
    name: 'Rahul Vlogs',
    handle: 'rahul.travels',
    followers: 42000,
    engagement: 3.8,
    niches: ['Travel', 'Food'],
    rate_reel: 8500,
    match_score: 88,
    match_reason: 'High engagement in Bangalore region. Previous collaborations with similar D2C brands show strong ROI.',
  },
  {
    id: 'c3',
    name: 'Sneha Kapur',
    handle: 'sneha.glow',
    followers: 12000,
    engagement: 5.1,
    niches: ['Skincare', 'Beauty'],
    rate_reel: 4000,
    match_score: 82,
    match_reason: 'Niche authority in skincare. Audience demographic is highly aligned, though reach is slightly lower than others.',
  }
];

export default function MatchesPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
           <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-[#005B99] transition-colors uppercase tracking-widest"
           >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
           </button>
           <div className="flex items-center gap-2 bg-[#005B99]/10 text-[#005B99] px-4 py-1.5 rounded-full border border-blue-100 italic">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">AI Matching Engine: Active</span>
           </div>
        </div>

        <header className="mb-12">
           <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase">Top AI Matches</h1>
           <p className="text-gray-500 font-medium max-w-2xl text-lg">
              We've analyzed your campaign brief and ranked these creators for maximum ROI.
           </p>
        </header>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                 <Info className="w-6 h-6 text-[#005B99]" />
              </div>
              <p className="text-sm font-bold text-gray-600 leading-relaxed">
                 Review these matches and <span className="text-gray-900">Accept</span> to start the 48-hour deal clock.
              </p>
           </div>
           <button className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase bg-gray-50 px-6 py-3 rounded-2xl hover:text-gray-700 transition-colors tracking-widest border border-gray-100">
              <Filter className="w-4 h-4" /> Refine Criteria
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
           {MOCK_MATCHES.map((creator) => (
             <CreatorCard 
               key={creator.id} 
               creator={creator} 
               onAccept={() => window.location.href = `/deals/${resolvedParams.id}`}
             />
           ))}
        </div>
      </main>
    </div>
  );
}
