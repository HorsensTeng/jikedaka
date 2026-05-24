import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, Camera, RefreshCw, Play, Heart, Flame } from 'lucide-react';
import { mockVideos } from '../mockData';
import { VideoInfo } from '../types';
import coverWaterfall1 from '../assets/images/regenerated_image_1779591818488.png';

interface WaterfallDetailProps {
  onChangeRecommendation: () => void;
  onOpenVideo: (video: VideoInfo) => void;
}

export function WaterfallDetail({ onChangeRecommendation, onOpenVideo }: WaterfallDetailProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-y-auto no-scrollbar pb-20 select-none bg-gradient-to-b from-zinc-950 via-emerald-950/90 to-emerald-900">
      
      {/* 1. Immersive Full-screen Background Image */}
      <div className="absolute inset-0 w-full h-[55%] pointer-events-none z-0">
        <img 
          src={coverWaterfall1} 
          alt="Waterfall Background Scenic" 
          className="w-full h-full object-cover opacity-100 filter brightness-[0.8] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Soft edge ambient dark mask for details readability */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
      </div>

      {/* Spacing alignment for status bar */}
      <div className="pt-12" />

      {/* 2. Top Location Tag Option (Directly from screen screenshot) */}
      <div className="relative z-10 px-5 mb-1.5 flex select-none">
        <div className="bg-black/60 border border-white/10 px-3.5 py-1 rounded-full flex items-center space-x-1 text-white text-[10.5px] font-sans backdrop-blur-md shadow-lg">
          <span className="text-emerald-300">📍</span>
          <span className="font-sans font-medium">你现在在玄武门附近</span>
        </div>
      </div>

      {/* 3. Page Title & Badger Badge Row */}
      <div className="relative z-10 px-6 mt-1 flex flex-col space-y-1.5 text-white">
        <motion.div 
          initial={{ x: -15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-2"
        >
          <span className="text-[28px] font-extrabold tracking-tight text-shadow-md font-sans">
            假山瀑布
          </span>
          <span className="text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)] leading-none animate-pulse">🔥</span>
        </motion.div>
        
        {/* Green subtitle pill badge */}
        <div>
          <span className="inline-block bg-emerald-950/65 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase shadow-sm">
            近距离拍照点
          </span>
        </div>
      </div>

      {/* 4. Outer wrap container of details */}
      <div className="relative z-10 flex-grow px-4 mt-4 flex flex-col justify-between space-y-3.5">
        
        {/* Destination Travel Metadata Grid Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-emerald-950/45 backdrop-blur-md rounded-[20px] border border-emerald-500/10 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
        >
          {/* Columns matching photo with divider lines */}
          <div className="grid grid-cols-3 gap-1 divide-x divide-white/15 text-center">
            {/* Walking col */}
            <div className="flex flex-col items-center justify-center space-y-1.5 px-1 py-1">
              <span className="text-[14px] leading-none">🚶</span>
              <span className="text-[10px] text-zinc-100 font-sans leading-tight">约 8-12 分钟可达</span>
            </div>

            {/* Time col */}
            <div className="flex flex-col items-center justify-center space-y-1.5 px-1 py-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[10px] text-zinc-100 font-sans leading-tight">建议游玩: 15–25 分钟</span>
            </div>

            {/* Camera col */}
            <div className="flex flex-col items-center justify-center space-y-1.5 px-1 py-1">
              <Camera className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[10px] text-zinc-100 font-sans leading-tight">适合: 拍照 / 湖景 / 轻松</span>
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
            onClick={() => onOpenVideo(mockVideos.waterfall1)}
            className="flex flex-col bg-emerald-950/30 backdrop-blur-md border border-emerald-500/10 hover:border-emerald-500/30 rounded-2xl overflow-hidden cursor-pointer select-none group transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-[0.98]"
          >
            {/* Header tag */}
            <div className="p-2 border-b border-white/[0.04] bg-white/[0.02] flex items-center space-x-1">
              <Flame className="w-3 h-3 text-orange-400 fill-current" />
              <span className="text-[10px] font-semibold text-zinc-350 tracking-wider font-sans">热门视频 1</span>
            </div>
            
            <div className="relative w-full h-[95px] overflow-hidden">
              <img 
                src={mockVideos.waterfall1.coverUrl} 
                alt="Waterfall park preview 1" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/25" />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1.5 bg-black/45 border border-white/20 rounded-full text-white shadow-md backdrop-blur-[1px] group-hover:scale-110 group-hover:bg-emerald-600/70 transition-all">
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
              假山瀑布近距离打卡，水流清澈，机位绝佳，拍照超出片！
            </p>
          </motion.div>

          {/* Popular Video Card 2 */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => onOpenVideo(mockVideos.waterfall2)}
            className="flex flex-col bg-emerald-950/30 backdrop-blur-md border border-emerald-500/10 hover:border-emerald-500/30 rounded-2xl overflow-hidden cursor-pointer select-none group transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-[0.98]"
          >
            {/* Header tag */}
            <div className="p-2 border-b border-white/[0.04] bg-white/[0.02] flex items-center space-x-1">
              <Flame className="w-3 h-3 text-orange-400 fill-current" />
              <span className="text-[10px] font-semibold text-zinc-350 tracking-wider font-sans">热门视频 2</span>
            </div>
            
            <div className="relative w-full h-[95px] overflow-hidden">
              <img 
                src={mockVideos.waterfall2.coverUrl} 
                alt="Waterfall close-up preview 2" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/25" />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1.5 bg-black/45 border border-white/20 rounded-full text-white shadow-md backdrop-blur-[1px] group-hover:scale-110 group-hover:bg-emerald-600/70 transition-all">
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
              玄武湖隐藏机位！瀑布+湖景同框，氛围感拉满~
            </p>
          </motion.div>
        </div>

        {/* AI recommended reasons card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-emerald-950/45 backdrop-blur-md rounded-[20px] border border-emerald-500/10 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
        >
          <div className="flex items-center space-x-1.5 text-emerald-300 text-[12.5px] font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400 fill-current animate-pulse bg-emerald-500/5 p-0.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
            <span className="font-sans tracking-widest">AI 推荐理由：</span>
          </div>

          <div className="text-[12px] text-zinc-250 leading-relaxed font-sans mt-2 space-y-1">
            <p>离玄武门较近，打卡视频多，</p>
            <p>适合刚进入景区后先拍照，再继续往湖边方向走。</p>
            <p>当前人流量多，更热闹。</p>
          </div>
        </motion.div>

        {/* Toggle Recommendation button with slow circle spin */}
        <button 
          onClick={onChangeRecommendation}
          className="w-full bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-emerald-950 py-3 rounded-2xl text-[13px] font-extrabold select-none cursor-pointer tracking-widest text-center transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow text-emerald-950" />
          <span>换一个推荐</span>
        </button>
      </div>

      {/* 5. Slide indicator area */}
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
    </div>
  );
}
