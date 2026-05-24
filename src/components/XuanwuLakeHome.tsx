import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Menu, Sparkles, Flame, Check, Play, Heart } from 'lucide-react';
import { mockVideos } from '../mockData';
import { VideoInfo } from '../types';
import mapThumbnail from '../assets/images/regenerated_image_1779589343384.png';

interface XuanwuLakeHomeProps {
  onNextRecommendation: () => void;
  onOpenVideo: (video: VideoInfo) => void;
}

export function XuanwuLakeHome({ onNextRecommendation, onOpenVideo }: XuanwuLakeHomeProps) {
  const [showToast, setShowToast] = useState(false);

  const handleNotInterested = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-y-auto no-scrollbar pb-20 select-none bg-gradient-to-b from-zinc-950 via-emerald-950/90 to-emerald-900">
      
      {/* Absolute Scenic Background Image */}
      <div className="absolute inset-0 w-full h-[55%] pointer-events-none z-0">
        <img 
          src={mapThumbnail} 
          alt="Nanjing Xuanwu Lake Gate Background"
          className="w-full h-full object-cover opacity-100"
          referrerPolicy="no-referrer"
        />
        {/* Deep dark gradient overlay at the bottom to merge with lower card area */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
      </div>

      {/* 1. Header Bar Area (9:41 status bar space padding to prevent overlaps) */}
      <div className="relative z-10 pt-10 px-4 flex items-center justify-between text-white/95 text-shadow-sm select-none">
        <button className="p-2 -ml-2 active:scale-95 cursor-pointer" title="Menu">
          <Menu className="w-5 h-5 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)]" />
        </button>

        {/* Douyin Header Navigation Tabs Row */}
        <div className="flex items-center space-x-3 text-[14px] font-medium tracking-wide">
          <span className="text-white/60 hover:text-white cursor-pointer transition-colors drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.8)]">团购</span>
          <span className="text-white/60 hover:text-white cursor-pointer transition-colors drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.8)]">经验</span>
          <span className="text-white/60 hover:text-white cursor-pointer transition-colors drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.8)]">北京</span>
          <span className="text-white/60 hover:text-white cursor-pointer transition-colors drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.8)]">关注</span>
          <span className="text-white/60 hover:text-white cursor-pointer transition-colors drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.8)]">商城</span>
          <div className="relative flex flex-col items-center">
            <span className="text-white font-semibold cursor-pointer tracking-wider drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">推荐</span>
            <div className="absolute -bottom-1 w-[20px] h-[2.5px] bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />
          </div>
        </div>

        <button className="p-2 -mr-2 active:scale-95 cursor-pointer" title="Search">
          <Search className="w-5 h-5 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)]" />
        </button>
      </div>

      {/* 2. Nanjing Xuanwu Lake Titles Column */}
      <div className="relative z-10 px-6 mt-1.5 flex flex-col space-y-1.5 text-white">
        <div className="flex items-center space-x-2">
          <h1 className="text-[25px] font-bold tracking-tight text-shadow-md">
            南京玄武湖·即刻打卡
          </h1>
          <span className="bg-white/15 border border-white/20 text-[9px] px-1.5 py-[1px] rounded tracking-widest font-mono text-zinc-100 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            AI生成
          </span>
        </div>
        
        <p className="text-[13px] text-zinc-200 tracking-wide font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] flex items-center space-x-1">
          <span>你已到达：玄武湖 · 玄武门附近</span>
        </p>
        <p className="text-[11.5px] text-emerald-300 font-mono tracking-widest drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.8)] uppercase">
          经典入口 / 轻松打卡 / 第一次来
        </p>
      </div>

      {/* 3. Main Dark-Green Transparent Recommendations Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.55 }}
        className="relative z-10 mx-4 mt-4 bg-emerald-950/65 backdrop-blur-xl rounded-[22px] border border-emerald-500/15 p-4 flex flex-col space-y-3.5 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.4)]"
      >
        {/* Dynamic Map thumbnail cover */}
        <div className="relative w-full h-[155px] rounded-xl overflow-hidden shadow-inner group">
          <img 
            src={mapThumbnail} 
            alt="Xuanwu Gate View" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-neutral-900/15 pointer-events-none" />
          
          {/* Location Pin Indicator Tag */}
          <div className="absolute bottom-3 left-3 bg-neutral-950/75 border border-white/10 px-2.5 py-1 rounded-full flex items-center space-x-1 text-white text-[11px] font-medium backdrop-blur-md shadow-lg">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300">📍</span>
            <span className="font-sans">你现在在玄武门附近</span>
          </div>
        </div>

        {/* AI Hint Section */}
        <div className="flex flex-col space-y-1 bg-white/[0.02] p-3 rounded-xl border border-white/[0.02]">
          <div className="flex items-center space-x-1.5 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400 fill-current" />
            <span className="tracking-widest font-sans">AI 提示：</span>
          </div>
          <div className="text-[12px] text-zinc-200 leading-relaxed font-sans space-y-0.5 pl-5.5">
            <p>刚到玄武门？先别急着乱逛。</p>
            <p>AI 已根据距离、热度和打卡视频，</p>
            <p className="text-emerald-300 font-medium font-sans">为你整理了适合下一站的点。</p>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-white/10 w-full" />

        {/* Hot sights layout header */}
        <div className="flex items-center space-x-1.5 text-zinc-300 text-xs pl-0.5">
          <Flame className="w-3.5 h-3.5 text-orange-400 fill-current animate-pulse" />
          <span className="tracking-wide">这个景区大家正在看：</span>
        </div>

        {/* Sights/Videos previews row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left Sight Preview Card (玄武湖环湖步道) */}
          <div 
            onClick={() => onOpenVideo(mockVideos.huanhu)}
            className="flex flex-col bg-neutral-950/80 border border-white/5 hover:border-emerald-500/20 rounded-xl overflow-hidden cursor-pointer select-none group transition-all duration-300 active:scale-[0.98] shadow-md"
          >
            <div className="relative w-full h-[85px] overflow-hidden">
              <img 
                src={mockVideos.huanhu.coverUrl} 
                alt="Walkway" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Overlapping Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1.5 bg-black/45 border border-white/20 rounded-full text-white/90 shadow-md backdrop-blur-[1px] group-hover:scale-110 group-hover:bg-emerald-600/60 transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-[1px]" />
                </div>
              </div>
              
              {/* Location indicator bubble on video card */}
              <div className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[9px] text-white/90 font-mono tracking-tight shadow-sm flex items-center space-x-0.5">
                <span>📍</span>
                <span className="truncate max-w-[50px] font-sans">环湖步道</span>
              </div>
            </div>
            
            <div className="p-2 space-y-1">
              <div className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-300">
                <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                <span className="truncate">{mockVideos.huanhu.title}</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-medium">
                <span className="truncate">湖光漫步 | 治愈</span>
                <span className="flex items-center space-x-0.5 text-rose-400 shrink-0">
                  <Heart className="w-2.5 h-2.5 fill-current" />
                  <span>2.3万</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Sight Preview Card (玄武湖游船全景) */}
          <div 
            onClick={() => onOpenVideo(mockVideos.youchuan)}
            className="flex flex-col bg-neutral-950/80 border border-white/5 hover:border-emerald-500/20 rounded-xl overflow-hidden cursor-pointer select-none group transition-all duration-300 active:scale-[0.98] shadow-md"
          >
            <div className="relative w-full h-[85px] overflow-hidden">
              <img 
                src={mockVideos.youchuan.coverUrl} 
                alt="Boating" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Overlapping Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1.5 bg-black/45 border border-white/20 rounded-full text-white/90 shadow-md backdrop-blur-[1px] group-hover:scale-110 group-hover:bg-emerald-600/60 transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-[1px]" />
                </div>
              </div>

              {/* Location indicator bubble on video card */}
              <div className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[9px] text-white/90 font-mono tracking-tight shadow-sm flex items-center space-x-0.5">
                <span>📍</span>
                <span className="truncate max-w-[50px] font-sans">游船码头</span>
              </div>
            </div>
            
            <div className="p-2 space-y-1">
              <div className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-300">
                <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                <span className="truncate">{mockVideos.youchuan.title}</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-medium">
                <span className="truncate">湖中观景 | 四季</span>
                <span className="flex items-center space-x-0.5 text-rose-400 shrink-0">
                  <Heart className="w-2.5 h-2.5 fill-current" />
                  <span>1.8万</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Bottom Control Buttons Row */}
        <div className="flex items-center space-x-3 pt-1">
          {/* Reject button */}
          <button 
            onClick={handleNotInterested}
            className="flex-1 bg-emerald-900/10 hover:bg-emerald-900/25 active:scale-95 border border-emerald-500/35 text-white py-2.5 rounded-xl text-xs font-semibold select-none cursor-pointer tracking-wider text-center transition-all duration-200"
          >
            不感兴趣
          </button>
          
          {/* Target core navigation redirect trigger button */}
          <button 
            onClick={onNextRecommendation}
            className="flex-1 bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-emerald-950 py-2.5 rounded-xl text-xs font-bold select-none cursor-pointer tracking-wider text-center transition-all duration-200 shadow-md flex items-center justify-center space-x-1.5 animate-pulse"
          >
            <span>查看下一站推荐</span>
            <span className="text-[10px] font-bold">&gt;</span>
          </button>
        </div>
      </motion.div>

      {/* 4. Scroll indicator with delicate animations */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-3 pb-8 text-white/40 font-semibold tracking-wider font-mono text-[10px] space-y-1">
        <motion.div
          animate={{ y: [-3, 2, -3] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <svg className="w-3.5 h-3.5 -mt-2 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </motion.div>
        <span className="font-sans font-medium text-[11px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">上滑继续看视频</span>
      </div>

      {/* Floating alert toast */}
      <div className="absolute inset-x-0 bottom-36 flex justify-center pointer-events-none z-50">
        <div className={`bg-neutral-900/90 border border-white/5 text-zinc-100 text-xs px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center space-x-1.5 transition-all duration-300 ${showToast ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-3'}`}>
          <span className="text-emerald-400 font-sans">🌿</span>
          <span className="font-sans font-medium">不感兴趣：已收到！我们将为你多推荐其他不同景点</span>
        </div>
      </div>
    </div>
  );
}
