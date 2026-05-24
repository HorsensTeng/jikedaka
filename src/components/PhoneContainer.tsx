import React, { useState } from 'react';

interface PhoneContainerProps {
  children: React.ReactNode;
}

export function PhoneContainer({ children }: PhoneContainerProps) {
  const [powerOn, setPowerOn] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-0 md:p-6 select-none font-sans overflow-hidden">
      {/* Decorative ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />

      {/* Main Container */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md h-screen md:h-[840px] transition-all duration-500">
        
        {/* Physical buttons on the left - mock */}
        <div className="hidden md:block absolute -left-1.5 top-32 w-1.5 h-16 bg-neutral-800 rounded-l-md border-r border-neutral-700/50" />
        <div className="hidden md:block absolute -left-1.5 top-56 w-1.5 h-12 bg-neutral-800 rounded-l-md border-r border-neutral-700/50" />
        <div className="hidden md:block absolute -left-1.5 top-72 w-1.5 h-12 bg-neutral-800 rounded-l-md border-r border-neutral-700/50" />
        
        {/* Physical Power Button on the right - interactive mock! */}
        <button 
          onClick={() => setPowerOn(!powerOn)}
          className="hidden md:block absolute -right-1.5 top-44 w-1.5 h-20 bg-neutral-800 hover:bg-neutral-750 active:bg-neutral-700 rounded-r-md border-l border-neutral-700/50 cursor-pointer z-50 transition-colors"
          title="Toggle Screen Power"
        />

        {/* Outer Phone Shell Case */}
        <div className="relative w-full h-full md:rounded-[55px] md:border-[12px] md:border-neutral-900 md:bg-neutral-900 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] md:ring-1 md:ring-white/10 overflow-hidden flex flex-col">
          
          {/* Inner Screen Surface */}
          <div className="relative w-full h-full bg-neutral-950 flex flex-col text-white overflow-hidden">
            {powerOn ? (
              children
            ) : (
              <div 
                onClick={() => setPowerOn(true)}
                className="w-full h-full bg-black flex flex-col items-center justify-center cursor-pointer select-none space-y-4 animate-fade-in"
              >
                <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white/50 animate-pulse">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-600 font-mono tracking-widest text-center px-6">
                  SCREEN SLEEP<br/>
                  <span className="text-[10px] text-neutral-700 mt-1 block">CLICK POWER BUTTON OR SCREEN TO WAKE</span>
                </p>
              </div>
            )}
          </div>

          {/* Phone Dynamic Island/Notch overlay (Only on PC sizes mock) */}
          <div className="hidden md:block absolute top-[11px] left-1/2 -translate-x-1/2 w-32 h-[28px] bg-black rounded-3xl z-50 flex items-center justify-between px-3.5 border-t border-neutral-800/30">
            {/* Camera */}
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-900 shadow-inner flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-950/40" />
            </div>
            {/* Dynamic island green dot / sensor indicator */}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
            {/* Speaker Line */}
            <div className="w-12 h-1 bg-neutral-950 rounded-full border border-neutral-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
