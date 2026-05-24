import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, X, Send, Play, Volume2, VolumeX } from 'lucide-react';
import { VideoInfo, Comment } from '../types';

interface VideoOverlayProps {
  video: VideoInfo;
  onClose: () => void;
}

export function VideoOverlay({ video, onClose }: VideoOverlayProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<Comment[]>(video.comments);
  const [newCommentText, setNewCommentText] = useState('');
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);

  // Play/pause handler
  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    // Show quick play/pause overlay splash
    setShowPlayOverlay(true);
    setTimeout(() => {
      setShowPlayOverlay(false);
    }, 500);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Heart like mechanism
  const handleLike = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!hasLiked) {
      setHasLiked(true);
      // increment count text roughly
      if (video.likes.includes('万')) {
        const val = parseFloat(video.likes) + 0.1;
        setLikesCount(`${val.toFixed(1)}万`);
      } else if (video.likes.includes('w')) {
        const val = parseFloat(video.likes) + 0.1;
        setLikesCount(`${val.toFixed(1)}w`);
      } else {
        setLikesCount((parseInt(video.likes) + 1).toString());
      }
    } else {
      setHasLiked(false);
      setLikesCount(video.likes);
    }
  };

  // Double tap heart spawning
  const doubleTapTimer = useRef<number | null>(null);
  const handleVideoTouch = (e: React.MouseEvent<HTMLDivElement>) => {
    const delay = 250;
    if (doubleTapTimer.current === null) {
      doubleTapTimer.current = window.setTimeout(() => {
        doubleTapTimer.current = null;
        // single tap: toggle play
        handleTogglePlay();
      }, delay);
    } else {
      window.clearTimeout(doubleTapTimer.current);
      doubleTapTimer.current = null;
      // double tap: spawn floating heart and toggle like
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newHeart = {
        id: Date.now(),
        x,
        y
      };
      setHearts(prev => [...prev, newHeart]);
      if (!hasLiked) {
        handleLike();
      }
      
      // Cleanup after animation finishes
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 1000);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setToastMsg('链接复制成功！快分享给小伙伴吧 🚀');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: '路过的旅行者',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      content: newCommentText.trim(),
      likes: 0,
      time: '刚刚'
    };

    setCommentsList([newComment, ...commentsList]);
    setNewCommentText('');
    if (commentInputRef.current) {
      commentInputRef.current.blur();
    }
  };

  // Ensure natural autoplay inside preview container environment
  useEffect(() => {
    const attemptPlay = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // auto block by browser means let's mute it
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    };
    attemptPlay();
  }, [video.videoUrl]);

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col justify-between overflow-hidden select-none">
      
      {/* Absolute Video Element */}
      <div 
        onClick={handleVideoTouch}
        className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center bg-zinc-950"
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover"
        />

        {/* Double tap floating hearts renderer */}
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0.4, opacity: 1, x: heart.x - 30, y: heart.y - 30, rotate: Math.random() * 30 - 15 }}
            animate={{ 
              scale: [1, 1.6, 1.2], 
              opacity: [1, 1, 0], 
              y: heart.y - 180,
              x: heart.x - 30 + (Math.random() * 60 - 30)
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute pointer-events-none text-red-500 z-50"
          >
            <svg className="w-16 h-16 drop-shadow-lg fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}

        {/* Big visual Play/Pause Indicator Overlay */}
        <AnimatePresence>
          {showPlayOverlay && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute pointer-events-none p-5 rounded-full bg-black/40 text-white z-40 backdrop-blur-sm"
            >
              {isPlaying ? (
                <Play className="w-10 h-10 fill-current ml-1" />
              ) : (
                <div className="flex space-x-1.5 items-center justify-center w-10 h-10">
                  <div className="w-[6px] h-8 bg-white rounded-full" />
                  <div className="w-[6px] h-8 bg-white rounded-full" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top Controls Overlay */}
      <div className="absolute top-12 left-0 right-0 px-4 flex items-center justify-between z-30 pointer-events-none">
        {/* Back button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="pointer-events-auto p-2 bg-neutral-900/60 hover:bg-neutral-800/80 active:scale-95 text-white rounded-full border border-white/10 shadow-lg backdrop-blur-md cursor-pointer transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sound trigger */}
        <button
          onClick={handleToggleMute}
          className="pointer-events-auto p-2 bg-neutral-900/60 hover:bg-neutral-800/80 active:scale-95 text-white rounded-full border border-white/10 shadow-lg backdrop-blur-md cursor-pointer transition-all"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Right Side Sidebar Actions (Icons Overlay) */}
      <div className="absolute right-3.5 bottom-36 flex flex-col items-center space-y-5 z-30">
        {/* Author Avatar with Follow Star */}
        <div className="relative mb-2">
          <div className="w-[46px] h-[46px] rounded-full border-2 border-white overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="author" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-500 text-white w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-bold leading-none border border-black cursor-pointer shadow-sm"
          >
            +
          </motion.div>
        </div>

        {/* Heart Action */}
        <button 
          onClick={handleLike}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className={`p-2.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-md transition-all ${hasLiked ? 'text-rose-500 scale-110 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'text-white group-active:scale-90'}`}>
            <Heart className={`w-6 h-6 ${hasLiked ? 'fill-current' : ''}`} />
          </div>
          <span className="text-[11px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-semibold mt-1">{likesCount}</span>
        </button>

        {/* Comments Drawer Trigger */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowComments(true);
          }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="p-2.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-md text-white group-active:scale-95 transition-all">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-[11px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-semibold mt-1">{commentsList.length}</span>
        </button>

        {/* Share trigger */}
        <button 
          onClick={handleShare}
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="p-2.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-md text-white group-active:scale-95 transition-all">
            <Share2 className="w-6 h-6" />
          </div>
          <span className="text-[11px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-semibold mt-1">{video.shares}</span>
        </button>

        {/* Rolling Music Record Disc */}
        <div className="pt-2">
          <div className="w-[38px] h-[38px] rounded-full bg-zinc-900 border-4 border-zinc-850 shadow-lg flex items-center justify-center animate-[spin_4s_linear_infinite]">
            <div className="w-[18px] h-[18px] rounded-full overflow-hidden border border-black">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=52&q=80" 
                alt="music" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Title Area & Info Details */}
      <div className="absolute left-0 right-0 bottom-6 px-4 pt-10 pb-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none">
        <div className="pointer-events-auto max-w-[80%] flex flex-col space-y-1.5">
          <h2 className="text-sm font-semibold tracking-wide drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)]">
            @南京玄武湖探索者 <span className="inline-block bg-white/10 text-white border border-white/10 text-[9px] px-1 rounded ml-1 scale-95 origin-left">原创视频</span>
          </h2>
          <h3 className="text-base font-medium tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
            {video.title}
          </h3>
          <p className="text-xs text-zinc-100 line-clamp-3 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {video.desc}。在这里你可以感受到金陵古都的别样微风与自然温情！✨ 快来打卡呀！
          </p>
          
          {/* Scroll text music icon line */}
          <div className="flex items-center space-x-2 text-zinc-300 text-xs pt-1">
            <svg className="w-3.5 h-3.5 fill-current animate-pulse text-emerald-400" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            <div className="overflow-hidden w-40 relative h-4">
              <p className="absolute whitespace-nowrap animate-[marquee_12s_linear_infinite] font-mono text-zinc-300 text-[11px]">
                南京玄武湖原声音乐 - 慢生活旅行特辑
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Comments Drawer Slide Panel */}
      <AnimatePresence>
        {showComments && (
          <>
            {/* Backdrop cover for click dismissal */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(false);
              }}
              className="absolute inset-0 bg-black/40 z-40 transition-opacity"
            />
            
            {/* Slide up screen sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 h-[60%] bg-neutral-900 rounded-t-[20px] z-50 flex flex-col text-white shadow-2xl border-t border-white/5"
            >
              {/* Header section of sheet */}
              <div className="relative py-4 px-5 border-b border-white/5 text-center flex items-center justify-between">
                <div className="w-6" /> {/* spacer */}
                <h3 className="text-xs font-semibold text-zinc-400 font-mono tracking-wide">
                  {commentsList.length} 条评论
                </h3>
                <button
                  onClick={() => setShowComments(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-200 active:scale-90 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable list of comments */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {commentsList.map(comment => (
                  <div key={comment.id} className="flex space-x-3 items-start p-1 bg-white/[0.01] rounded-lg">
                    <img 
                      src={comment.avatar} 
                      alt={comment.author} 
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-zinc-300">{comment.author}</span>
                        <div className="flex items-center space-x-1 text-zinc-500 hover:text-rose-500 cursor-pointer">
                          <Heart className="w-3 h-3 fill-current" />
                          <span className="text-[10px]">{comment.likes}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-100 leading-relaxed font-sans">{comment.content}</p>
                      <span className="text-[9px] text-zinc-500 block pt-0.5">{comment.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive bottom input block */}
              <form 
                onSubmit={handlePostComment}
                className="p-4 bg-neutral-950 border-t border-white/5 flex items-center space-x-3"
              >
                <input
                  ref={commentInputRef}
                  type="text"
                  placeholder="留下你的精彩评论..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 bg-neutral-800 border-none outline-none text-white rounded-full px-4 py-2.5 text-xs text-zinc-200 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="bg-emerald-600 active:bg-emerald-700 disabled:opacity-40 p-2 text-white rounded-full transition-all cursor-pointer flex items-center justify-center shadow-lg"
                >
                  <Send className="w-4 h-4 ml-[1px] -mt-[1px]" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating alert toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 bg-emerald-600/90 text-white text-xs px-4 py-2.5 rounded-full font-medium shadow-xl backdrop-blur-md z-50 flex items-center space-x-1.5"
          >
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
