# 项目总览

## 1. 项目定位

本项目是一个移动端沉浸式旅游推荐前端原型，围绕“南京玄武湖打卡路径推荐”展开。应用通过首页推荐、景点详情、短视频弹层和手势操作，模拟用户从“进入景区”到“查看下一站推荐”再到“浏览相关热门视频”的交互过程。

## 2. 技术栈

| 类别 | 选型 | 说明 |
| --- | --- | --- |
| 前端框架 | React 19 | 应用 UI 与状态驱动核心 |
| 语言 | TypeScript | 负责类型约束与编辑期校验 |
| 构建工具 | Vite 6 | 本地开发、打包与预览 |
| 样式系统 | Tailwind CSS 4 | 通过 `@tailwindcss/vite` 集成 |
| 动画库 | `motion/react` | 页面切换、弹层、浮动反馈动画 |
| 图标库 | `lucide-react` | 常规 UI 图标 |
| 数据来源 | 本地 `mockData.ts` | 当前无真实后端接口 |

## 3. 仓库结构

```text
jikedaka/
|-- src/
|   |-- assets/images/            # 页面背景图、视频卡片封面图
|   |-- components/
|   |   |-- PhoneContainer.tsx    # 手机壳容器与息屏/亮屏模拟
|   |   |-- StatusBar.tsx         # 状态栏与 Home Indicator
|   |   |-- XuanwuLakeHome.tsx    # 首页推荐页
|   |   |-- RoseGardenDetail.tsx  # 月季园详情页
|   |   |-- WaterfallDetail.tsx   # 假山瀑布详情页
|   |   |-- VideoOverlay.tsx      # 短视频全屏弹层
|   |-- App.tsx                   # 应用总控、状态中枢
|   |-- main.tsx                  # React 入口
|   |-- index.css                 # 样式入口
|   |-- mockData.ts               # 模拟视频与评论数据
|   |-- types.ts                  # 领域类型定义
|-- index.html                    # HTML 入口
|-- package.json                  # 依赖与脚本
|-- vite.config.ts                # Vite 配置
|-- tsconfig.json                 # TypeScript 配置
|-- .env.example                  # 预留环境变量模板
|-- metadata.json                 # 项目能力声明
```

## 4. 关键特征

- 单页应用，没有接入 `react-router`
- 页面切换由 `App.tsx` 中的 `page` 状态控制
- 视频播放使用原生 `<video>` 元素
- 评论、点赞、分享提示均为前端本地状态
- 所有业务内容都由本地 mock 数据和静态图片驱动
- UI 重点偏向高保真交互演示，而非复杂业务逻辑

## 5. 当前能力边界

### 已实现

- 首页到详情页的推荐跳转
- 详情页之间的切换
- 上滑/下滑手势切页
- 视频弹层播放、点赞、评论、分享提示
- 手机壳、状态栏、底部导航等沉浸式外壳体验

### 未实现

- 真实用户体系
- 真实后端接口和数据库
- 真实评论持久化
- 真实分享链路
- 真实推荐算法
- 多页面路由系统

## 6. 代码组织结论

从工程视角看，当前仓库最接近“展示型交互原型”而非“完整业务系统”。代码采用非常直接的组织方式：

- `App.tsx` 负责全局状态和页面编排
- `components/` 负责所有显示层与交互层
- `mockData.ts` 承担临时数据层职责
- `types.ts` 提供基础领域模型

这种结构的优点是上手快、改动集中；缺点是业务状态、页面编排和展示逻辑耦合度较高，后续若要扩展为真实产品，通常需要补充路由层、服务层、状态管理层与 API 抽象层。
