import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Navigation, Clock, Sprout, RefreshCw, Play, Heart, Flame } from 'lucide-react';
import { mockVideos } from '../mockData';
import { VideoInfo } from '../types';
import coverRose1 from '../assets/images/regenerated_image_1779590949687.png';
import roseSticker from '../assets/images/regenerated_image_1779591464527.png';

interface RoseGardenDetailProps {
  onChangeRecommendation: () => void;
  onOpenVideo: (video: VideoInfo) => void;
}

export function RoseGardenDetail({ onChangeRecommendation, onOpenVideo }: RoseGardenDetailProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-y-auto no-scrollbar pb-20 select-none bg-gradient-to-b from-zinc-950 via-emerald-950/90 to-emerald-900">
      
      {/* 1. Immersive Full-screen Background Image with Blur */}
      <div className="absolute inset-0 w-full h-[55%] pointer-events-none z-0">
        <img 
          src={coverRose1} 
          alt="Rose Garden Background Scenic" 
          className="w-full h-full object-cover opacity-90 filter blur-[6px] brightness-[0.7] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Deep dark gradient overlay at the bottom to merge with lower card area */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
      </div>

      {/* Spacing alignment for status bar */}
      <div className="pt-12" />

      {/* 2. Page titles row with float animations */}
      <div className="relative z-10 px-6 mt-2 flex flex-col space-y-1 text-white">
        <motion.div 
          initial={{ x: -15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-1.5"
        >
          <span className="text-[28px] font-extrabold tracking-tight text-shadow-md font-sans">
            月季园
          </span>
          <span className="text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-none -mt-1">🌸</span>
        </motion.div>
        
        <p className="text-[13px] text-zinc-300 font-medium tracking-wide drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.7)]">
          季节性花景点
        </p>
      </div>

      {/* 3. Outer wrap container of details */}
      <div className="relative z-10 flex-grow px-4 mt-4 flex flex-col justify-between space-y-3.5">
        
        {/* Destination Travel Metadata list Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-emerald-950/45 backdrop-blur-md rounded-[20px] border border-emerald-500/10 p-4 space-y-3 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Metadata items list */}
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center space-x-3.5">
              <div className="w-[26px] h-[26px] py-[4px] rounded-full bg-emerald-800/80 border border-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-sans -ml-[1px]">🚗</span>
              </div>
              <span className="text-[13px] text-zinc-100 font-sans tracking-wide">约 15–20 分钟可达</span>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-[26px] h-[26px] rounded-full bg-emerald-800/80 border border-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] text-zinc-100 font-sans tracking-wide">建议游玩：20–30 分钟</span>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-[26px] h-[26px] rounded-full bg-emerald-800/80 border border-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <Sprout className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] text-zinc-100 font-sans tracking-wide">适合：散步 / 花景 / 慢逛</span>
            </div>
          </div>
        </motion.div>

        {/* Hot videos columns container row */}
        <div className="grid grid-cols-2 gap-3.5">
          
          {/* Popular Video Card 1 */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            onClick={() => onOpenVideo(mockVideos.rose1)}
            className="flex flex-col bg-emerald-950/30 backdrop-blur-md border border-emerald-500/10 hover:border-emerald-500/30 rounded-2xl overflow-hidden cursor-pointer select-none group transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-[0.98]"
          >
            {/* Header tag */}
            <div className="p-2 border-b border-white/[0.04] bg-white/[0.02] flex items-center space-x-1">
              <Flame className="w-3 h-3 text-orange-400 fill-current" />
              <span className="text-[10px] font-semibold text-zinc-350 tracking-wider">热门视频 1</span>
            </div>
            
            <div className="relative w-full h-[95px] overflow-hidden">
              <img 
                src={mockVideos.rose1.coverUrl} 
                alt="Rose park preview 1" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/25" />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1.5 bg-black/45 border border-white/20 rounded-full text-white shadow-md backdrop-blur-[1px] group-hover:scale-110 group-hover:bg-rose-600/70 transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-[1px]" />
                </div>
              </div>

              {/* Float Likes badge */}
              <div className="absolute bottom-1.5 left-2 bg-black/55 px-1.5 py-0.5 rounded-full text-[9px] text-white/90 shadow-sm flex items-center space-x-1">
                <Heart className="w-2.5 h-2.5 text-rose-500 fill-current" />
                <span className="font-mono tracking-tight font-semibold">6.2w</span>
              </div>
            </div>

            <p className="p-2.5 text-[10px] text-zinc-200 font-sans leading-relaxed tracking-wide line-clamp-2 min-h-[38px] group-hover:text-emerald-300 transition-colors">
              满园月季盛开，像走进了童话世界
            </p>
          </motion.div>

          {/* Popular Video Card 2 */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => onOpenVideo(mockVideos.rose2)}
            className="flex flex-col bg-emerald-950/30 backdrop-blur-md border border-emerald-500/10 hover:border-emerald-500/30 rounded-2xl overflow-hidden cursor-pointer select-none group transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-[0.98]"
          >
            {/* Header tag */}
            <div className="p-2 border-b border-white/[0.04] bg-white/[0.02] flex items-center space-x-1">
              <Flame className="w-3 h-3 text-orange-400 fill-current" />
              <span className="text-[10px] font-semibold text-zinc-350 tracking-wider">热门视频 2</span>
            </div>
            
            <div className="relative w-full h-[95px] overflow-hidden">
              <img 
                src={mockVideos.rose2.coverUrl} 
                alt="Rose close-up preview 2" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/25" />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1.5 bg-black/45 border border-white/20 rounded-full text-white shadow-md backdrop-blur-[1px] group-hover:scale-110 group-hover:bg-rose-600/70 transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-[1px]" />
                </div>
              </div>

              {/* Float Likes badge */}
              <div className="absolute bottom-1.5 left-2 bg-black/55 px-1.5 py-0.5 rounded-full text-[9px] text-white/90 shadow-sm flex items-center space-x-1">
                <Heart className="w-2.5 h-2.5 text-rose-500 fill-current" />
                <span className="font-mono tracking-tight font-semibold">4.3w</span>
              </div>
            </div>

            <p className="p-2.5 text-[10px] text-zinc-200 font-sans leading-relaxed tracking-wide line-clamp-2 min-h-[38px] group-hover:text-emerald-300 transition-colors">
              阳光下的月季园，浪漫又治愈
            </p>
          </motion.div>
        </div>

        {/* AI recommended reasons card with styled graphic sticker */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="relative bg-emerald-950/45 backdrop-blur-md rounded-[20px] border border-emerald-500/10 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
        >
          <div className="flex items-center space-x-1.5 text-emerald-300 text-[12.5px] font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400 fill-current animate-pulse" />
            <span className="font-sans tracking-widest">AI 推荐理由：</span>
          </div>

          <div className="pr-16 text-[12px] text-zinc-250 leading-relaxed font-sans mt-2 space-y-1">
            <p>适合你轻松散步，慢慢逛月季园。</p>
            <p>春夏季花景内容热度更高，</p>
            <p>也更适合拍氛围感照片。</p>
            <p>当前人流量较少，适合散步休闲。</p>
          </div>

          {/* Floated beautiful pink rose sticker graphic (using safe high-fidelity clip-pathed picture mockup) */}
          <div className="absolute right-4 bottom-3 w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/20 shadow-xl bg-emerald-900/40 p-0.5 group shrink-0">
            <img 
              src={roseSticker} 
              alt="Beautiful Rose Graphic Sticker" 
              className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:rotate-12 hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Dynamic Navigation button logic */}
        <button 
          onClick={onChangeRecommendation}
          className="w-full bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-emerald-950 py-3 rounded-2xl text-[13px] font-extrabold select-none cursor-pointer tracking-widest text-center transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow text-emerald-950" />
          <span>换一个推荐</span>
        </button>
      </div>

      {/* 4. Slide indicator area */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-3 pb-8 text-white/40 font-semibold tracking-wider font-mono text-[10px] space-y-1">
        <motion.div
          animate={{ y: [-3, 2, -3] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="flex flex-col items-center animate-bounce"
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
    </div>
  );
}
