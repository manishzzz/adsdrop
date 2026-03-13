import Navbar from '@/components/Navbar';
import CampaignCard from '@/components/CampaignCard';
import Link from 'next/link';
import { Rocket, Zap, ShieldCheck, TrendingUp, Users, CheckCircle } from 'lucide-react';

const FEATURED_CAMPAIGNS = [
  {
    id: '1',
    title: 'Instagram Reels for Skincare Launch',
    category: 'Skincare',
    budget: 15000,
    niche_target: ['Skincare', 'Beauty'],
    min_followers: 10000,
    max_followers: 50000,
    expires_at: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'YouTube Review for New Smartphone',
    category: 'Tech',
    budget: 45000,
    niche_target: ['Tech', 'Gadgets'],
    min_followers: 50000,
    max_followers: 200000,
    expires_at: new Date(Date.now() + 41 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Fitness App Transformation Story',
    category: 'Fitness',
    budget: 22000,
    niche_target: ['Fitness', 'Health'],
    min_followers: 5000,
    max_followers: 30000,
    expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#1A1A2E] pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#005B99] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF6B2B] rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#FF6B2B] px-4 py-2 rounded-full mb-8 border border-white/10">
            <Zap className="w-4 h-4 fill-[#FF6B2B]" />
            <span className="text-sm font-bold tracking-tight">India's First 48-Hour Deal Marketplace</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
            Close Brand Deals <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005B99] to-[#00A3FF]">in 48 Hours</span>
          </h1>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-12 font-medium">
            India's first marketplace where creators and brands connect, negotiate, and close — fast. No managers, no long waits, just results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth?type=creator" className="bg-[#005B99] text-white px-10 py-5 rounded-full font-black text-lg hover:bg-[#004a7c] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,91,153,0.3)] shadow-xl active:scale-95">
              I'M A CREATOR
            </Link>
            <Link href="/auth?type=brand" className="bg-white text-[#1A1A2E] px-10 py-5 rounded-full font-black text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl active:scale-95 border-b-4 border-gray-200">
              I'M A BRAND
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <p className="text-3xl font-black text-[#005B99] mb-1 group-hover:scale-110 transition-transform">200+</p>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Active Creators</p>
          </div>
          <div className="text-center border-y md:border-y-0 md:border-x border-gray-100 py-6 md:py-0 group">
            <p className="text-3xl font-black text-[#FF6B2B] mb-1 group-hover:scale-110 transition-transform">10+</p>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Live Campaigns</p>
          </div>
          <div className="text-center group">
            <p className="text-3xl font-black text-gray-900 mb-1 group-hover:scale-110 transition-transform">₹0</p>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Cost to Join</p>
          </div>
        </div>
      </div>

      {/* Live Preview Strip */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Live Deals Board</h2>
              <p className="text-gray-500 font-medium">Apply to these active campaigns right now</p>
            </div>
            <Link href="/deals" className="text-[#005B99] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Deals <TrendingUp className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_CAMPAIGNS.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-[#005B99] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* For Creators */}
            <div className="bg-[#005B99]/5 p-10 rounded-3xl border border-[#005B99]/10">
              <h3 className="text-2xl font-black text-[#005B99] mb-8 flex items-center gap-3">
                <Users className="w-8 h-8" /> FOR CREATORS
              </h3>
              <div className="space-y-8">
                {[
                  { title: "Connect Socials", desc: "Link your Instagram or YouTube. We pull your real stats automatically." },
                  { title: "Apply to Deals", desc: "Browse the Live Board. Apply to deals you love in one click." },
                  { title: "Get Paid Fast", desc: "48-hour matching. Secure escrow payments. No chasing brands." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-[#005B99] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h4>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Brands */}
            <div className="bg-[#FF6B2B]/5 p-10 rounded-3xl border border-[#FF6B2B]/10">
              <h3 className="text-2xl font-black text-[#FF6B2B] mb-8 flex items-center gap-3">
                <Rocket className="w-8 h-8" /> FOR BRANDS
              </h3>
              <div className="space-y-8">
                {[
                  { title: "Post a Brief", desc: "Describe your campaign and target niche. It goes live instantly." },
                  { title: "AI Matching", desc: "We match you with the top 5 creators based on content style and ROI." },
                  { title: "Close in 48hrs", desc: "Accept a match, fund escrow, and get your content delivered fast." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-[#FF6B2B] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h4>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-900 py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-white text-3xl font-black mb-16 opacity-50 uppercase tracking-widest">Built for Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-16 h-16 text-[#005B99] mb-4" />
              <h4 className="text-white font-bold text-xl mb-2">Verified Stats</h4>
              <p className="text-gray-400">Direct API integration ensures no fake followers or engagement numbers.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#FF6B2B] rounded-2xl p-4 mb-4">
                 <IndianRupee className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-white font-bold text-xl mb-2">Escrow Protected</h4>
              <p className="text-gray-400">Payments are held securely and only released when content is approved.</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h4 className="text-white font-bold text-xl mb-2">48hr Commitment</h4>
              <p className="text-gray-400">Matches expire in 48 hours. No ghosting from either side, guaranteed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function IndianRupee({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m6 13 8.5 8" />
      <path d="M6 13h3" />
      <path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  );
}
