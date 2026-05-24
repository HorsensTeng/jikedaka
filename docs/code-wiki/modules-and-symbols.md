# 模块与核心符号

## 1. 核心模块清单

| 模块 | 文件 | 职责 |
| --- | --- | --- |
| 应用总控 | `src/App.tsx` | 管理页面状态、全局手势、底部导航、视频弹层与全局 Toast |
| 手机外壳 | `src/components/PhoneContainer.tsx` | 提供设备壳体、实体按键与息屏/亮屏体验 |
| 系统状态栏 | `src/components/StatusBar.tsx` | 渲染时间、网络、电量与底部 Home Indicator |
| 首页推荐 | `src/components/XuanwuLakeHome.tsx` | 提供首屏推荐、AI 提示和热门视频入口 |
| 月季园详情 | `src/components/RoseGardenDetail.tsx` | 展示月季园信息、热点视频与推荐理由 |
| 假山瀑布详情 | `src/components/WaterfallDetail.tsx` | 展示假山瀑布信息、热点视频与推荐理由 |
| 视频弹层 | `src/components/VideoOverlay.tsx` | 负责视频播放和交互功能 |
| 模拟数据层 | `src/mockData.ts` | 提供页面使用的视频、评论、点赞和分享数据 |
| 类型定义 | `src/types.ts` | 定义数据对象和页面枚举类型 |

## 2. 关键组件说明

### 2.1 `App`

文件：`src/App.tsx`

职责：

- 作为应用唯一状态中枢
- 管理页面切换和弹层开关
- 封装上滑、下滑手势逻辑
- 协调首页、详情页和视频弹层的事件传递

关键状态：

| 状态 | 含义 |
| --- | --- |
| `page` | 当前页面标识 |
| `activeVideo` | 当前正在播放的视频 |
| `activeTab` | 当前选中的底部导航标签 |
| `showToast` / `toastMsg` | 全局手势反馈提示 |
| `touchStart` | 手势起始坐标 |

关键函数：

| 函数 | 作用 |
| --- | --- |
| `playSwooshSound()` | 播放切页提示音 |
| `playClickSound()` | 播放点击提示音 |
| `handleGoToNextRecommendation()` | 从首页随机进入下一个推荐页 |
| `handleTogglePage2Recommendation()` | 在两个详情页之间切换 |
| `handleOpenVideo(video)` | 打开视频弹层 |
| `handleTouchStart(e)` | 记录手势起点 |
| `handleTouchEnd(e)` | 判断上下滑并执行切页逻辑 |
| `triggerShortToast(msg)` | 显示短时浮层提示 |
| `handleBottomTabClick(tab)` | 处理底部导航点击 |

设计要点：

- 将“路由”抽象成 `page` 状态
- 所有子组件都通过回调把用户动作上抛给 `App`
- 通过 `AnimatePresence` + `motion.div` 统一处理切换动画

### 2.2 `PhoneContainer`

文件：`src/components/PhoneContainer.tsx`

职责：

- 提供统一的移动设备展示框架
- 在桌面视图下模拟边框、按键、刘海与实体电源键
- 通过 `powerOn` 状态模拟息屏与唤醒

关键点：

- `powerOn` 为 `false` 时，不渲染业务页面，只展示黑屏唤醒界面
- 该组件不参与业务数据流，主要用于视觉承载

### 2.3 `StatusBar` 与 `HomeIndicator`

文件：`src/components/StatusBar.tsx`

职责：

- 提供状态栏时间、电量、信号、Wi-Fi 的视觉模拟
- 提供底部 Home Indicator

关键函数：

| 函数 | 作用 |
| --- | --- |
| `updateTime()` | 每 30 秒刷新一次显示时间 |

### 2.4 `XuanwuLakeHome`

文件：`src/components/XuanwuLakeHome.tsx`

职责：

- 提供首页视觉入口
- 显示当前位置、AI 提示、地图缩略图与两个热门视频
- 提供“查看下一站推荐”和“不感兴趣”交互

输入属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `onNextRecommendation` | `() => void` | 请求进入下一站推荐 |
| `onOpenVideo` | `(video: VideoInfo) => void` | 请求打开某条视频 |

关键函数：

| 函数 | 作用 |
| --- | --- |
| `handleNotInterested()` | 显示本地 Toast，不改变全局数据 |

依赖：

- `mockVideos.huanhu`
- `mockVideos.youchuan`
- 首页背景图 `mapThumbnail`

### 2.5 `RoseGardenDetail`

文件：`src/components/RoseGardenDetail.tsx`

职责：

- 展示“月季园”景点信息
- 提供两个热门视频入口
- 展示 AI 推荐理由
- 提供“换一个推荐”按钮

输入属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `onChangeRecommendation` | `() => void` | 请求切换另一个详情页 |
| `onOpenVideo` | `(video: VideoInfo) => void` | 请求打开视频 |

依赖：

- `mockVideos.rose1`
- `mockVideos.rose2`
- 背景图与圆形花朵贴纸素材

### 2.6 `WaterfallDetail`

文件：`src/components/WaterfallDetail.tsx`

职责：

- 展示“假山瀑布”景点信息
- 提供两个热门视频入口
- 展示 AI 推荐理由
- 提供“换一个推荐”按钮

输入属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `onChangeRecommendation` | `() => void` | 请求切换另一个详情页 |
| `onOpenVideo` | `(video: VideoInfo) => void` | 请求打开视频 |

依赖：

- `mockVideos.waterfall1`
- `mockVideos.waterfall2`
- 假山瀑布背景图

### 2.7 `VideoOverlay`

文件：`src/components/VideoOverlay.tsx`

职责：

- 负责全屏短视频播放
- 实现单击播放/暂停、双击点赞、静音切换
- 提供评论抽屉、新增评论、分享提示与点赞数变化

输入属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `video` | `VideoInfo` | 当前展示的视频数据 |
| `onClose` | `() => void` | 关闭弹层 |

内部状态：

| 状态 | 作用 |
| --- | --- |
| `isPlaying` | 记录播放/暂停状态 |
| `isMuted` | 记录静音状态 |
| `likesCount` | 记录当前显示的点赞数 |
| `hasLiked` | 记录当前用户是否已点赞 |
| `showComments` | 控制评论抽屉开关 |
| `commentsList` | 当前评论列表 |
| `newCommentText` | 评论输入框内容 |
| `hearts` | 双击时浮动爱心动画数据 |
| `showPlayOverlay` | 播放/暂停状态提示层 |
| `showToast` / `toastMsg` | 分享提示层 |

关键函数：

| 函数 | 作用 |
| --- | --- |
| `handleTogglePlay()` | 切换播放状态并显示短暂提示层 |
| `handleToggleMute(e)` | 切换静音并阻止事件冒泡 |
| `handleLike(e?)` | 点赞或取消点赞，同时更新显示文案 |
| `handleVideoTouch(e)` | 区分单击与双击；单击切播放，双击触发爱心和点赞 |
| `handleShare(e)` | 显示“复制成功”提示 |
| `handlePostComment(e)` | 新增评论到本地列表顶部 |

实现特点：

- 使用 `videoRef` 直接操作原生视频节点
- 自动播放失败时自动降级为静音播放
- 评论与点赞只存在于组件会话内，不会同步回 `mockData.ts`

## 3. 数据模型

### 3.1 `Comment`

文件：`src/types.ts`

```ts
export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  time: string;
}
```

用途：

- 表示视频评论项
- 被 `VideoInfo.comments` 和 `VideoOverlay` 使用

### 3.2 `VideoInfo`

文件：`src/types.ts`

```ts
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
```

用途：

- 表示单条视频卡片和播放内容的完整数据
- 被首页、详情页和视频弹层共同依赖

说明：

- `likes` 与 `shares` 使用字符串而非数值，便于直接显示 `2.3万`、`1.2万` 等文案

### 3.3 `PageId`

文件：`src/types.ts`

```ts
export type PageId = 'home' | 'rose_garden' | 'waterfall';
```

用途：

- 作为页面状态枚举
- 由 `App.tsx` 直接消费

## 4. 模拟数据说明

文件：`src/mockData.ts`

`mockVideos` 是当前项目唯一的业务数据源，结构为 `Record<string, VideoInfo>`。

主要分组：

| 键名 | 场景 |
| --- | --- |
| `huanhu` | 首页热门视频 1 |
| `youchuan` | 首页热门视频 2 |
| `rose1` / `rose2` | 月季园热门视频 |
| `waterfall1` / `waterfall2` | 假山瀑布热门视频 |

数据特点：

- 封面图来自本地静态素材
- 视频地址来自 Vimeo 外链
- 评论头像来自 Unsplash 外链
- 文案、点赞数、评论数都为演示数据

## 5. 模块依赖摘要

```text
types.ts
  -> 被 App.tsx、页面组件、VideoOverlay.tsx 共同依赖

mockData.ts
  -> 被首页和两个详情页读取

App.tsx
  -> 通过 props 向页面组件下发事件处理器
  -> 通过 activeVideo 把数据传入 VideoOverlay.tsx
```

## 6. 维护建议

- 若继续增加景点页，建议将 `RoseGardenDetail` 和 `WaterfallDetail` 抽象为通用详情模板
- 若继续增加视频互动逻辑，建议把 `VideoOverlay` 中的播放、点赞、评论逻辑拆成 hook
- 若接入真实接口，建议把 `mockData.ts` 替换为独立数据访问层
