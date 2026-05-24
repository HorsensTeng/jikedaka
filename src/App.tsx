/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PhoneContainer } from './components/PhoneContainer';
import { StatusBar, HomeIndicator } from './components/StatusBar';
import { XuanwuLakeHome } from './components/XuanwuLakeHome';
import { RoseGardenDetail } from './components/RoseGardenDetail';
import { WaterfallDetail } from './components/WaterfallDetail';
import { VideoOverlay } from './components/VideoOverlay';
import { PageId, VideoInfo } from './types';

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [activeVideo, setActiveVideo] = useState<VideoInfo | null>(null);
  const [activeTab, setActiveTab] = useState<string>('首页');
  const [toastMsg, setToastMsg] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  
  // Touch tracking for swipe gestures
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  // Soft Synthesized Sound FX
  const playSwooshSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.22);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.24);
    } catch (e) {
      console.warn('Audio play blocked:', e);
    }
  };

  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
      console.warn('Audio play blocked:', e);
    }
  };

  // Navigations routing trigger points
  const handleGoToNextRecommendation = () => {
    playSwooshSound();
    // Random selector of 2.1 or 2.2
    const options: PageId[] = ['rose_garden', 'waterfall'];
    const randomChoice = options[Math.floor(Math.random() * options.length)];
    setPage(randomChoice);
  };

  const handleTogglePage2Recommendation = () => {
    playSwooshSound();
    // Toggle between the two Page 2 options
    if (page === 'rose_garden') {
      setPage('waterfall');
    } else {
      setPage('rose_garden');
    }
  };

  const handleOpenVideo = (video: VideoInfo) => {
    playClickSound();
    setActiveVideo(video);
  };

  // Gesture events
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setTouchStart({ x: t.clientX, y: t.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const diffX = t.clientX - touchStart.x;
    const diffY = t.clientY - touchStart.y;

    // We verify if vertical swipe represents a strong scroll gesture
    if (Math.abs(diffY) > 55 && Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY < 0) {
        // Swiped UP -> trigger recommendation card switch
        if (page === 'home') {
          handleGoToNextRecommendation();
          triggerShortToast('已为你智能切入下一站推荐 🍃');
        } else {
          handleTogglePage2Recommendation();
          triggerShortToast('已为你更换下一个打卡路线 🔄');
        }
      } else {
        // Swiped DOWN -> Go back home as stack back
        if (page !== 'home') {
          playSwooshSound();
          setPage('home');
          triggerShortToast('返回玄武门探索首站 📍');
        } else {
          triggerShortToast('已经是第一页啦，上滑开启玄武湖推荐之旅 🏞️');
        }
      }
    }
    setTouchStart(null);
  };

  const triggerShortToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleBottomTabClick = (tab: string) => {
    playClickSound();
    setActiveTab(tab);
    if (tab === '首页') {
      setPage('home');
    } else {
      triggerShortToast(`“${tab}”板块加载就绪！玄武湖游览更精彩 ✨`);
    }
  };

  return (
    <PhoneContainer>
      {/* Top native iOS status bar layout */}
      <StatusBar />

      {/* Main Touch Area for swiping Gestures */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-full flex flex-col justify-between overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <XuanwuLakeHome 
                onNextRecommendation={handleGoToNextRecommendation}
                onOpenVideo={handleOpenVideo}
              />
            </motion.div>
          )}

          {page === 'rose_garden' && (
            <motion.div
              key="rose_garden"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <RoseGardenDetail 
                onChangeRecommendation={handleTogglePage2Recommendation}
                onOpenVideo={handleOpenVideo}
              />
            </motion.div>
          )}

          {page === 'waterfall' && (
            <motion.div
              key="waterfall"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <WaterfallDetail 
                onChangeRecommendation={handleTogglePage2Recommendation}
                onOpenVideo={handleOpenVideo}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Bottom Navigation bar (fixed and floating nicely) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pt-2 pb-5 px-6 bg-black/95 backdrop-blur-lg border-t border-white/[0.06] flex items-center justify-between z-30 select-none">
          
          <button 
            onClick={() => handleBottomTabClick('首页')}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${
              activeTab === '首页' ? 'text-white scale-105' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span className="text-[14px] font-bold tracking-wider">首页</span>
          </button>

          <button 
            onClick={() => handleBottomTabClick('朋友')}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${
              activeTab === '朋友' ? 'text-white scale-105' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span className="text-[14px] font-bold tracking-wider">朋友</span>
          </button>

          {/* Plus launcher */}
          <button 
            onClick={() => handleBottomTabClick('拍摄')}
            className="relative w-11 h-[27px] bg-white rounded-[8px] flex items-center justify-center shrink-0 cursor-pointer active:scale-90 transition-transform shadow-md"
            title="Create"
          >
            {/* The iconic left (cyan) & right (red) overlapping shadows */}
            <div className="absolute -left-[3px] top-0 bottom-0 w-[8px] bg-[#00f2fe] rounded-l-[8px] -z-10" />
            <div className="absolute -right-[3px] top-0 bottom-0 w-[8px] bg-[#fe2c55] rounded-r-[8px] -z-10" />
            <span className="text-black text-lg font-extrabold leading-none">+</span>
          </button>

          <button 
            onClick={() => handleBottomTabClick('消息')}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${
              activeTab === '消息' ? 'text-white scale-105' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span className="text-[14px] font-bold tracking-wider">消息</span>
          </button>

          <button 
            onClick={() => handleBottomTabClick('我')}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all ${
              activeTab === '我' ? 'text-white scale-105' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span className="text-[14px] font-bold tracking-wider">我</span>
          </button>
        </div>

        {/* Home Sweep Indicator Line */}
        <HomeIndicator />
      </div>

      {/* Interactive Video short player overlay modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute inset-0 z-50 overflow-hidden"
          >
            <VideoOverlay 
              video={activeVideo} 
              onClose={() => {
                playClickSound();
                setActiveVideo(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Global Gesture Swipe Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.92 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/85 border border-white/10 text-white text-[11px] px-3.5 py-2 rounded-full font-medium shadow-xl backdrop-blur-md z-45 flex items-center space-x-1"
          >
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneContainer>
  );
}
