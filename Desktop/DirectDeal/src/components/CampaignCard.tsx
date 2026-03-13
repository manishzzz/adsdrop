'use client';

import CountdownTimer from './CountdownTimer';
import { BadgeCheck, Users, IndianRupee } from 'lucide-react';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    category: string;
    budget: number;
    niche_target: string[];
    min_followers: number;
    max_followers: number;
    expires_at: string;
    applicant_count?: number;
  };
}

const categoryIcons: Record<string, string> = {
  Food: '🍕',
  Tech: '💻',
  Fitness: '🏋️',
  Skincare: '🧴',
  Finance: '💰',
  Fashion: '👗',
  Travel: '✈️',
};

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const icon = categoryIcons[campaign.category] || '📢';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5 flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3">
        <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-semibold border border-green-100">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          LIVE
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="text-3xl bg-gray-50 p-3 rounded-lg border border-gray-100 group-hover:bg-blue-50 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 line-clamp-1">{campaign.title}</h3>
          <p className="text-sm text-gray-500">{campaign.category}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-50">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Budget</p>
          <div className="flex items-center gap-1 text-[#005B99] font-bold">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{campaign.budget.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-50">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Followers</p>
          <div className="flex items-center gap-1 text-gray-700 font-semibold text-sm">
            <Users className="w-3.5 h-3.5" />
            <span>
              {campaign.min_followers >= 1000 ? `${campaign.min_followers / 1000}K` : campaign.min_followers} - {campaign.max_followers / 1000}K
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {campaign.niche_target.map((niche) => (
          <span key={niche} className="bg-blue-50 text-[#005B99] text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 uppercase">
            {niche}
          </span>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-100 mt-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Expires In</span>
          <CountdownTimer expiresAt={campaign.expires_at} />
        </div>
        <Link 
          href={`/deals/${campaign.id}`}
          className="bg-[#005B99] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#004a7c] transition-colors shadow-sm"
        >
          Apply Now
        </Link>
      </div>

      {campaign.applicant_count !== undefined && (
        <div className="mt-2 text-[10px] text-gray-400 font-medium text-center">
          {campaign.applicant_count} applicants so far
        </div>
      )}
    </div>
  );
}
