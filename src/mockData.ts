import { VideoInfo } from './types';
import coverHuanhu from './assets/images/regenerated_image_1779589339718.png';
import coverYouchuan from './assets/images/regenerated_image_1779589336850.png';
import coverRose1 from './assets/images/regenerated_image_1779590949687.png';
import coverRose2 from './assets/images/regenerated_image_1779590953354.png';
import coverWaterfall1 from './assets/images/regenerated_image_1779591818488.png';
import coverWaterfall2 from './assets/images/regenerated_image_1779591822466.png';

export const mockVideos: Record<string, VideoInfo> = {
  huanhu: {
    id: 'huanhu',
    title: '玄武湖环湖步道',
    desc: '湖光漫步 | 治愈系路线',
    coverUrl: coverHuanhu,
    videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e339d37536965cca997dc68a278&profile_id=139&oauth2_token_id=57447761',
    likes: '2.3万',
    commentsCount: 382,
    shares: '4801',
    comments: [
      { id: '1', author: '小林在江南', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', content: '今天刚走完环湖步道，微风太舒服了！一定要从玄武门进！', likes: 1208, time: '2小时前' },
      { id: '2', author: '六朝古都吃货', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', content: '这条路线特别推荐给第一次来南京的朋友，走一走整个人都治愈了。', likes: 520, time: '5小时前' },
      { id: '3', author: '不负韶华', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', content: '周末带孩子去特别合适，人不多还很开阔。', likes: 142, time: '1天前' }
    ]
  },
  youchuan: {
    id: 'youchuan',
    title: '玄武湖游船全景',
    desc: '湖中观景 | 四季皆美',
    coverUrl: coverYouchuan,
    videoUrl: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27db95a9f1966141315fc4b38dcd24ec68593cc&profile_id=165&oauth2_token_id=57447761',
    likes: '1.8万',
    commentsCount: 219,
    shares: '2541',
    comments: [
      { id: '1', author: '爱吹晚风的猫', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', content: '落日时候去包一艘独木船才40一小时！在湖上看夕阳映红紫金山，绝了！', likes: 450, time: '4小时前' },
      { id: '2', author: '行走在世界的风', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', content: '泛舟湖上吹着清风，这就是江南温柔的极致吧！', likes: 98, time: '8小时前' }
    ]
  },
  rose1: {
    id: 'rose1',
    title: '热门视频 1',
    desc: '满园月季盛开，像走进了童话世界',
    coverUrl: coverRose1,
    videoUrl: 'https://player.vimeo.com/external/490807755.sd.mp4?s=d0046fc0b92db200d440ad810facbc622997ba74&profile_id=165&oauth2_token_id=57447761',
    likes: '6.2w',
    commentsCount: 942,
    shares: '1.2万',
    comments: [
      { id: '1', author: '玫瑰收藏家', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', content: '月季园现在正值盛花期，花墙 and 拱门太适合穿裙子去拍照了！', likes: 1892, time: '1小时前' },
      { id: '2', author: '摄影师阿乐', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80', content: '下午四五点逆光拍月季园，简直像童话一样！极力推荐去。', likes: 785, time: '3小时前' }
    ]
  },
  rose2: {
    id: 'rose2',
    title: '热门视频 2',
    desc: '阳光下的月季园，浪漫又治愈',
    coverUrl: coverRose2,
    videoUrl: 'https://player.vimeo.com/external/459389137.sd.mp4?s=994e6df94dc89e2c659ae2872f23b7a5bf77717d&profile_id=165&oauth2_token_id=57447761',
    likes: '4.3w',
    commentsCount: 651,
    shares: '8402',
    comments: [
      { id: '1', author: '南京周末好去处', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80', content: '真的太美了！呼吸里都是花香，玄武湖的宝藏免费园区。', likes: 1104, time: '5小时前' },
      { id: '2', author: '小红豆', avatar: 'https://images.unsplash.com/photo-1517841905240-472988bad157?auto=format&fit=crop&w=100&q=80', content: '最近天气好，周末必须安排，看着好舒心。', likes: 320, time: '12小时前' }
    ]
  },
  waterfall1: {
    id: 'waterfall1',
    title: '热门视频 1',
    desc: '假山瀑布近距离打卡，水流清澈，机位绝佳，拍照超出片！',
    coverUrl: coverWaterfall1,
    videoUrl: 'https://player.vimeo.com/external/413554161.sd.mp4?s=95b6a71cb0afeeae95116766df6513d332616fd1&profile_id=165&oauth2_token_id=57447761',
    likes: '6.2w',
    commentsCount: 812,
    shares: '1.1w',
    comments: [
      { id: '1', author: '国风美学探店', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&q=80', content: '穿汉服在这拍真的绝了！假山流水，完全是中式古典美学。', likes: 1450, time: '30分钟前' },
      { id: '2', author: '游吟诗人', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80', content: '没想到玄武湖里还有如此清幽秀丽的假山瀑布！声音也很静心。', likes: 628, time: '2小时前' }
    ]
  },
  waterfall2: {
    id: 'waterfall2',
    title: '热门视频 2',
    desc: '玄武湖隐藏机位！瀑布+湖景同框，氛围感拉满~',
    coverUrl: coverWaterfall2,
    videoUrl: 'https://player.vimeo.com/external/409247348.sd.mp4?s=6a2b375b470bf7c5f590dc249d3e51dd26cb0bf0&profile_id=165&oauth2_token_id=57447761',
    likes: '4.3w',
    commentsCount: 521,
    shares: '7190',
    comments: [
      { id: '1', author: '爱摄影的小张', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', content: '这个隐藏机位要绕过假山到另一侧才能拍到，强烈建议带个广角镜头！', likes: 981, time: '4小时前' },
      { id: '2', author: '江南百景老铁', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80', content: '清凉避暑首选！水花飞溅在身上特别舒服。', likes: 219, time: '1天前' }
    ]
  }
};
