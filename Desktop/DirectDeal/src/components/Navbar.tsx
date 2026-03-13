'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import NoSSR from './hoc/NoSSR';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NoSSR>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-[#005B99] p-2 rounded-lg group-hover:rotate-12 transition-transform">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tight">
                  Direct<span className="text-[#005B99]">Deal</span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/deals" className="text-sm font-bold text-[#005B99] hover:text-[#004a7c]">
                Live Deals
              </Link>
              <Link href="/auth" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </Link>
              <Link 
                href="/auth?type=creator"
                className="bg-[#005B99] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#004a7c] transition-all hover:shadow-lg active:scale-95"
              >
                Get Started
              </Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <Link href="/deals" className="text-lg font-bold text-[#005B99]">Live Deals</Link>
            <Link href="/auth" className="text-lg font-semibold text-gray-600">Login</Link>
            <Link 
              href="/auth?type=creator"
              className="bg-[#005B99] text-white px-6 py-3 rounded-full text-center font-bold"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </NoSSR>
  );
}
