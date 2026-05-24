export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  time: string;
}

export interface VideoInfo {
  id: string;
  title: string;
  desc: string;
  coverUrl: string;
  videoUrl: string;
  likes: string;
  commentsCount: number;
  shares: string;
  comments: Comment[];
}

export type PageId = 'home' | 'rose_garden' | 'waterfall';
