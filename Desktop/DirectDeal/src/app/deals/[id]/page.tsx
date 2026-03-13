'use client';

import { use } from 'react';
import Navbar from '@/components/Navbar';
import CountdownTimer from '@/components/CountdownTimer';
import DealChat from '@/components/DealChat';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  LayoutDashboard,
  IndianRupee,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const DEAL_STAGES = [
  { id: 'matched', label: 'Matched', date: 'Oct 12, 10:00 AM', status: 'completed' },
  { id: 'accepted', label: 'Accepted', date: 'Oct 12, 11:30 AM', status: 'completed' },
  { id: 'delivered', label: 'Content Submitted', date: null, status: 'current' },
  { id: 'approved', label: 'Approved', date: null, status: 'upcoming' },
  { id: 'paid', label: 'Paid', date: null, status: 'upcoming' },
];

export default function DealRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
           {/* Left Column: Deal Info & Chat */}
           <div className="lg:col-span-2 flex-1 space-y-8">
              {/* Header Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                 <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#005B99]/5 rounded-full blur-3xl"></div>
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#1A1A2E] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                       S
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">SkinGlow India</h1>
                          <ShieldCheck className="w-5 h-5 text-[#005B99]" />
                       </div>
                       <p className="text-gray-500 font-bold flex items-center gap-2">
                          Summer Skincare Campaign <span className="text-gray-200">|</span> 
                          <span className="text-[#005B99] flex items-center font-black">
                             <IndianRupee className="w-3.5 h-3.5" /> 12,000
                          </span>
                       </p>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 min-w-[200px]">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Deal Deadline</p>
                    <div className="flex items-center gap-2">
                       <CountdownTimer expiresAt={new Date(Date.now() + 42 * 60 * 60 * 1000).toISOString()} />
                       <div className="text-[8px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">48H Cycle</div>
                    </div>
                 </div>
              </div>

              {/* Deal Execution Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                          <Zap className="w-5 h-5 text-[#FF6B2B] fill-[#FF6B2B]" /> Campaign Brief
                       </h2>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-5">
                          <FileText className="w-20 h-20" />
                       </div>
                       <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                          "Create a 15-30s high-energy Instagram Reel showcasing the new Vitamin C serum. Focus on the texture and the glow it leaves on your skin. Hook: '3 seconds to instant glow'."
                       </p>
                       <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                          <button className="flex items-center gap-2 text-[#005B99] font-bold text-xs hover:underline uppercase tracking-widest">
                             <FileText className="w-4 h-4" /> Download Brand Assets
                          </button>
                       </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-blue-200 shadow-sm relative group overflow-hidden bg-blue-50/10">
                        <div className="absolute top-0 right-0 p-4">
                           <div className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-lg">Creator Task</div>
                        </div>
                        <h3 className="font-black text-gray-900 mb-4 uppercase text-xs tracking-widest">Submit Deliverables</h3>
                        <div className="space-y-4">
                           <div className="relative">
                              <input 
                                 type="text" 
                                 placeholder="Paste Drive/YouTube/Reel link here..." 
                                 className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#005B99] outline-none transition-all font-medium text-gray-900 shadow-inner"
                              />
                           </div>
                           <button className="w-full bg-[#005B99] text-white py-4 rounded-xl font-black text-sm hover:bg-[#004a7c] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 group">
                              SUBMIT CONTENT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </button>
                        </div>
                    </div>
                 </div>

                 <DealChat />
              </div>
           </div>

           {/* Right Column: Timeline & Payout */}
           <div className="lg:w-80 space-y-8">
              {/* Timeline */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                 <h3 className="font-black text-gray-900 uppercase tracking-tight mb-8 text-sm tracking-widest">Deal Status</h3>
                 <div className="space-y-10 relative">
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-100 -z-10 rounded-full"></div>
                    {DEAL_STAGES.map((stage, i) => (
                      <div key={stage.id} className="flex gap-4 items-start relative">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 border-white shadow-sm ring-1 ring-gray-100 ${
                            stage.status === 'completed' ? 'bg-[#005B99] text-white' : 
                            stage.status === 'current' ? 'bg-white border-[#005B99] text-[#005B99] animate-pulse' : 
                            'bg-gray-100 text-gray-300'
                         }`}>
                            {stage.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                         </div>
                         <div className="pt-0.5">
                            <p className={`font-black text-sm uppercase tracking-tight ${stage.status === 'upcoming' ? 'text-gray-300' : 'text-gray-900'}`}>{stage.label}</p>
                            {stage.date && <p className="text-[10px] text-gray-400 font-bold">{stage.date}</p>}
                            {stage.status === 'current' && <p className="text-[10px] text-[#005B99] font-black uppercase mt-1 tracking-tighter">Action Required</p>}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Escrow Badge */}
              <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100 flex flex-col items-center text-center shadow-inner relative overflow-hidden group">
                 <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-md border border-green-50">
                    <ShieldCheck className="w-8 h-8 text-green-500" />
                 </div>
                 <h4 className="text-green-800 font-black uppercase tracking-tight text-sm mb-2">Escrow Protected</h4>
                 <p className="text-green-600/80 text-xs font-bold leading-relaxed px-2">
                    ₹12,000 is secured in DirectDeal Escrow. Funds release on content approval.
                 </p>
              </div>

              {/* Quick Navigation */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <Link href="/creator/dashboard" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-blue-100 transition-all group">
                    <div className="flex items-center gap-3">
                       <LayoutDashboard className="w-4 h-4 text-gray-400 group-hover:text-[#005B99]" />
                       <span className="text-xs font-black text-gray-600 uppercase tracking-widest">My Dashboard</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
