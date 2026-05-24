# 整体架构

## 1. 架构结论

当前项目采用“单入口、单状态中枢、组件分屏渲染、本地 mock 数据驱动”的前端架构。

它没有传统意义上的后端分层、接口层或路由系统，核心运行链路非常直接：

```text
index.html
  -> src/main.tsx
    -> src/App.tsx
      -> 页面组件 / UI 容器组件 / 视频弹层组件
        -> src/mockData.ts
```

## 2. 分层视图

### 2.1 应用入口层

- `index.html`
  - 提供 `#root` 容器
  - 通过模块脚本加载 `src/main.tsx`
- `src/main.tsx`
  - 创建 React Root
  - 以 `StrictMode` 挂载 `App`

### 2.2 应用编排层

- `src/App.tsx`
  - 是整个项目的状态中枢和调度器
  - 负责页面切换、底部导航、视频弹层、Toast、手势切换
  - 决定当前渲染首页、月季园页还是假山瀑布页

### 2.3 页面显示层

- `src/components/XuanwuLakeHome.tsx`
  - 首页推荐入口
  - 展示当前景区位置、AI 提示和两个热门视频入口
- `src/components/RoseGardenDetail.tsx`
  - 月季园详情页
  - 展示景点元信息、热门视频和 AI 推荐理由
- `src/components/WaterfallDetail.tsx`
  - 假山瀑布详情页
  - 结构与月季园详情页相近，但内容主题不同

### 2.4 交互增强层

- `src/components/VideoOverlay.tsx`
  - 负责全屏视频播放和互动
  - 内含点赞、评论抽屉、分享提示、双击爱心、静音切换
- `src/components/PhoneContainer.tsx`
  - 提供手机壳容器
  - 模拟手机实体按键与息屏/亮屏
- `src/components/StatusBar.tsx`
  - 模拟顶部状态栏
  - 同文件中的 `HomeIndicator` 模拟底部横条

### 2.5 数据与类型层

- `src/mockData.ts`
  - 管理所有视频、封面、评论和统计文案
- `src/types.ts`
  - 约束 `Comment`、`VideoInfo` 和 `PageId`

## 3. 状态与数据流

### 3.1 页面流转状态

`App.tsx` 内部主要通过以下状态完成页面编排：

| 状态名 | 类型 | 作用 |
| --- | --- | --- |
| `page` | `PageId` | 决定当前页面是 `home`、`rose_garden` 还是 `waterfall` |
| `activeVideo` | `VideoInfo \| null` | 控制视频弹层是否打开，以及当前播放哪个视频 |
| `activeTab` | `string` | 控制底部导航激活态 |
| `toastMsg` | `string` | 控制全局提示文案 |
| `showToast` | `boolean` | 控制全局 Toast 显示 |
| `touchStart` | `{ x, y } \| null` | 保存手势起点，用于计算上下滑动作 |

### 3.2 典型交互流

#### 进入首页

```text
应用启动
  -> App 默认 page = home
  -> 渲染 XuanwuLakeHome
```

#### 点击“查看下一站推荐”

```text
XuanwuLakeHome 按钮点击
  -> 调用 App.handleGoToNextRecommendation()
  -> 从 rose_garden / waterfall 中随机选一个
  -> 更新 page
  -> AnimatePresence 播放切换动画
```

#### 上滑/下滑切页

```text
用户触摸主容器
  -> App 记录 touchStart
  -> 结束触摸时计算 diffX / diffY
  -> 若为明显纵向手势：
     - 上滑：首页进入下一站；详情页切换另一个推荐点
     - 下滑：详情页回到首页
```

#### 打开视频弹层

```text
页面组件点击某个视频卡片
  -> 调用 onOpenVideo(video)
  -> App 设置 activeVideo
  -> 渲染 VideoOverlay
```

#### 视频内互动

```text
VideoOverlay 本地维护播放、静音、点赞、评论输入、评论列表等状态
  -> 不会回写到全局数据层
  -> 关闭弹层后互动状态会被销毁
```

## 4. 依赖关系图

```text
App.tsx
  -> PhoneContainer.tsx
  -> StatusBar.tsx
  -> HomeIndicator (from StatusBar.tsx)
  -> XuanwuLakeHome.tsx
  -> RoseGardenDetail.tsx
  -> WaterfallDetail.tsx
  -> VideoOverlay.tsx
  -> types.ts

XuanwuLakeHome.tsx
  -> mockData.ts
  -> types.ts
  -> assets/images/*

RoseGardenDetail.tsx
  -> mockData.ts
  -> types.ts
  -> assets/images/*

WaterfallDetail.tsx
  -> mockData.ts
  -> types.ts
  -> assets/images/*

VideoOverlay.tsx
  -> types.ts
  -> 原生 HTMLVideoElement
```

## 5. 运行时行为特征

### 5.1 无真实路由

项目没有 `react-router`，因此：

- URL 不代表页面状态
- 浏览器前进后退不会驱动页面流转
- 页面切换完全由组件状态决定

### 5.2 无真实服务层

仓库未发现 `services/`、`api/` 或后端入口文件，因此：

- 所有推荐内容均为静态 mock
- 视频与头像资源来自外部 URL
- 评论新增只存在于当前会话的内存状态

### 5.3 高交互、低业务复杂度

当前实现把主要精力放在：

- 动效
- UI 还原
- 手势体验
- 音视频反馈

而没有引入复杂业务建模、持久化和跨页面共享状态。

## 6. 扩展方向建议

如果后续要把该原型演进成真实产品，可优先考虑以下重构方向：

1. 引入 `react-router`，把页面状态升级为可路由访问的页面
2. 将 `mockData.ts` 替换为 `services/` + `api/` 抽象
3. 将 `App.tsx` 中的页面编排逻辑拆分为路由层与状态层
4. 将视频互动状态抽离为可复用 hook
5. 为评论、点赞、推荐结果引入真实数据源
