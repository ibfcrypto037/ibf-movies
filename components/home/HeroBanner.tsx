'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroBanner() {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center md:justify-start overflow-hidden md:rounded-3xl mt-0 md:mt-4 bg-[#080808]">
      {/* Subtle red gradient glow on left side */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-accent-red/10 blur-[100px] z-0 pointer-events-none" />
      
      <div className="relative z-20 w-full px-8 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side (Desktop) / Top (Mobile) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="hidden md:block mb-6 md:mb-8 text-center md:text-left">
            <span className="text-2xl md:text-3xl font-bold">
              <span className="text-accent-red">Ibf</span><span className="text-white">Movies</span>
            </span>
          </div>

          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-accent-red/20 border border-accent-red/30">
            <span className="text-accent-red text-sm font-bold flex items-center gap-2">
              🔥 Free Tool
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-white">
            Telegram Channel <br className="hidden md:block" />
            <span className="text-accent-red">Revenue Calculator</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-xl mx-auto md:mx-0">
            Calculate your Telegram channel&apos;s earning potential. Free tool for channel owners.
          </p>
          
          <button  
            onClick={() => window.open('https://telegramuniverse.tech', '_blank')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-red text-white font-bold text-lg hover:bg-red-700 hover:scale-105 transition-all shadow-[0_0_30px_rgba(229,9,20,0.3)] active:scale-95 transition-transform duration-100"
          >
            Try Free Tool <span className="text-xl">→</span>
          </button>
        </motion.div>

        {/* Right Side (Desktop Only) - Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex flex-1 justify-end"
        >
          <div className="w-full max-w-md glass-panel rounded-2xl p-6 relative overflow-hidden border-accent-red/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red/10 blur-[50px]" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="text-lg font-bold text-white">Calculator</div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">📊</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-text-muted mb-2">Subscribers</div>
                  <div className="w-full h-12 rounded-xl bg-black/40 border border-white/5 flex items-center px-4">
                    <span className="text-white font-medium">50,000</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-text-muted mb-2">Views per Post</div>
                  <div className="w-full h-12 rounded-xl bg-black/40 border border-white/5 flex items-center px-4">
                    <span className="text-white font-medium">12,500</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <div className="text-sm text-text-muted mb-1">Estimated Monthly Revenue</div>
                <div className="text-3xl font-black text-accent-red">$1,250</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
