'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CampaignCard from '@/components/CampaignCard';
import { Search, Filter, Rocket } from 'lucide-react';

const SEEDED_CAMPAIGNS = [
  {
    id: '1',
    title: 'Instagram Reels for Skincare Launch',
    category: 'Skincare',
    budget: 15000,
    niche_target: ['Skincare', 'Beauty', 'Lifestyle'],
    min_followers: 10000,
    max_followers: 50000,
    expires_at: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
    applicant_count: 12,
  },
  {
    id: '2',
    title: 'YouTube Review for New Smartphone',
    category: 'Tech',
    budget: 45000,
    niche_target: ['Tech', 'Gadgets', 'Gaming'],
    min_followers: 50000,
    max_followers: 200000,
    expires_at: new Date(Date.now() + 41 * 60 * 60 * 1000).toISOString(),
    applicant_count: 8,
  },
  {
    id: '3',
    title: 'Fitness App Transformation Story',
    category: 'Fitness',
    budget: 22000,
    niche_target: ['Fitness', 'Health', 'Yoga'],
    min_followers: 5000,
    max_followers: 30000,
    expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    applicant_count: 24,
  },
  {
    id: '4',
    title: 'Cafe Review & Food Vlog',
    category: 'Food',
    budget: 8000,
    niche_target: ['Food', 'Travel'],
    min_followers: 2000,
    max_followers: 15000,
    expires_at: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    applicant_count: 31,
  },
];

const NICHES = ['All', 'Food', 'Tech', 'Fitness', 'Skincare', 'Finance', 'Fashion', 'Travel'];

export default function DealsPage() {
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = SEEDED_CAMPAIGNS.filter((campaign) => {
    const matchesNiche = selectedNiche === 'All' || campaign.category === selectedNiche;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNiche && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-[#1A1A2E] py-12 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 bg-[#FF6B2B]/20 text-[#FF6B2B] px-4 py-1.5 rounded-full mb-6 border border-[#FF6B2B]/30">
            <span className="w-2 h-2 bg-[#FF6B2B] rounded-full animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider">🔴 LIVE — {SEEDED_CAMPAIGNS.length} Active Campaigns</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Live Deals <span className="text-[#005B99]">Board</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            High-converting deals for Indian creators. Apply before the clock runs out. No login required to browse.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {NICHES.map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedNiche === niche 
                  ? 'bg-[#005B99] text-white shadow-md' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {niche}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
          {filteredCampaigns.length === 0 && (
            <div className="col-span-full py-20 text-center">
               <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-10 h-10 text-gray-400" />
               </div>
               <h3 className="text-xl font-bold text-gray-900">No deals found for "{selectedNiche}"</h3>
               <p className="text-gray-500">Try changing your filters or searching for something else.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">Ready to close your first deal?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
               href="/auth?type=creator"
               className="bg-[#005B99] text-white px-12 py-5 rounded-full font-black text-lg hover:bg-[#004a7c] transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95"
            >
              HIRE ME AS A CREATOR
            </Link>
            <Link 
               href="/auth?type=brand"
               className="bg-white text-[#005B99] border-2 border-[#005B99] px-12 py-5 rounded-full font-black text-lg hover:bg-gray-50 transition-all hover:-translate-y-1 active:scale-95"
            >
              POST A CAMPAIGN
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
