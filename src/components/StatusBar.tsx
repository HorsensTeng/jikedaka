import React, { useState, useEffect } from 'react';

export function StatusBar() {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    // Elegant live-updating clock to showcase real product quality
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-10 px-6 pt-2 flex items-center justify-between pointer-events-none z-40 select-none text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
      {/* Time */}
      <span className="text-[13px] font-semibold tracking-tight">{time}</span>

      {/* Dynamic Island Spacer for desktop view / bezel notch spacer on mobile */}
      <div className="w-16 h-4 md:hidden" />

      {/* Connectivity / Battery */}
      <div className="flex items-center space-x-1.5 pt-[2px]">
        {/* Cellular Signal Strength Icon (3 bars active) */}
        <div className="flex items-end space-x-[2px] h-[10px]">
          <div className="w-[3px] h-1 bg-white rounded-[1px]" />
          <div className="w-[3px] h-1.5 bg-white rounded-[1px]" />
          <div className="w-[3px] h-[8px] bg-white rounded-[1px]" />
          <div className="w-[3px] h-[10px] bg-white rounded-[1px] opacity-100" />
        </div>

        {/* WiFi Icon */}
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 21a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm0-5a5 5 0 1 1-5-5 5 5 0 0 1 5 5zm0-5a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm0-5a11 11 0 1 1-11-11 11 11 0 0 1 11 11z" />
        </svg>

        {/* Battery Container */}
        <div className="relative w-[21px] h-[11px] border border-white/80 rounded-[3px] p-[1px] flex items-center">
          <div className="h-full w-5/6 bg-white rounded-[1px]" />
          <div className="absolute -right-[3px] top-[3.5px] w-1 h-[4px] bg-white/80 rounded-r-[1px]" />
        </div>
      </div>
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white rounded-full z-40 pointer-events-none opacity-90 bottom-indicator-bar shadow-sm" />
  );
}
