'use client';

import MatchScore from './MatchScore';
import { Instagram, Youtube, Users, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CreatorCardProps {
  creator: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    followers: number;
    engagement: number;
    niches: string[];
    rate_reel: number;
    match_score: number;
    match_reason: string;
  };
  onAccept?: () => void;
  onSkip?: () => void;
}

export default function CreatorCard({ creator, onAccept, onSkip }: CreatorCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative">
       <div className="absolute top-6 right-6">
          <MatchScore score={creator.match_score} />
       </div>

       <div className="flex items-start gap-5 mb-6">
          <div className="w-16 h-16 bg-[#005B99] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
             {creator.name[0]}
          </div>
          <div className="pr-12">
             <h3 className="text-xl font-black text-gray-900 leading-tight mb-1">{creator.name}</h3>
             <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
                <Instagram className="w-4 h-4" /> @{creator.handle}
             </div>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-2xl">
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                <Users className="w-3 h-3" /> Followers
             </p>
             <p className="font-black text-gray-900">{(creator.followers / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl">
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Engagement
             </p>
             <p className="font-black text-gray-900">{creator.engagement}%</p>
          </div>
       </div>

       <div className="mb-6">
          <p className="text-[10px] text-[#005B99] font-black uppercase tracking-widest mb-2">AI Match Recommendation:</p>
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-50 relative">
             <p className="text-xs text-blue-800 font-medium leading-relaxed italic">
                "{creator.match_reason}"
             </p>
          </div>
       </div>

       <div className="flex flex-wrap gap-1.5 mb-8">
          {creator.niches.map(niche => (
            <span key={niche} className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md uppercase">
               {niche}
            </span>
          ))}
       </div>

       <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <div>
             <p className="text-[10px] text-gray-400 font-bold uppercase">Rate (Reel)</p>
             <p className="text-lg font-black text-gray-900">₹{creator.rate_reel.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
             <button onClick={onSkip} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">Skip</button>
             <button 
                onClick={onAccept}
                className="bg-[#005B99] text-white px-8 py-2.5 rounded-full text-sm font-black hover:bg-[#004a7c] transition-all shadow-lg active:scale-95 flex items-center gap-2"
             >
                Accept Match <CheckCircle2 className="w-4 h-4" />
             </button>
          </div>
       </div>
    </div>
  );
}
