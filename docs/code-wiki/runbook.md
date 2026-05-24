# 运行与依赖说明

## 1. 启动方式

### 本地开发

```bash
npm install
npm run dev
```

默认开发命令来自 `package.json`：

```json
"dev": "vite --port=3000 --host=0.0.0.0"
```

说明：

- 默认端口是 `3000`
- 监听地址是 `0.0.0.0`
- 启动后由 Vite 提供开发服务器

### 生产构建

```bash
npm run build
```

### 构建预览

```bash
npm run preview
```

### 类型检查

```bash
npm run lint
```

注意：当前 `lint` 实际执行的是 TypeScript 类型检查，而不是 ESLint。

## 2. 入口与构建链路

```text
npm run dev / npm run build
  -> vite
    -> index.html
      -> /src/main.tsx
        -> App.tsx
```

关键文件：

| 文件 | 作用 |
| --- | --- |
| `package.json` | 管理脚本与依赖 |
| `vite.config.ts` | 配置 React、Tailwind 和开发服务器行为 |
| `index.html` | HTML 入口 |
| `src/main.tsx` | React 挂载入口 |
| `src/index.css` | Tailwind 样式入口 |

## 3. 配置说明

### `vite.config.ts`

当前配置点包括：

- `react()`：启用 React 插件
- `tailwindcss()`：启用 Tailwind Vite 插件
- `@` 别名：映射到项目根目录
- `server.hmr`：受 `DISABLE_HMR` 环境变量控制
- `server.watch`：在禁用 HMR 时同步禁用文件监听

注意：

- 配置中存在针对 AI 编辑环境的说明注释
- 当前项目源码中并未实际使用 `@/` 别名导入

### `tsconfig.json`

关键配置：

| 配置项 | 说明 |
| --- | --- |
| `target: ES2022` | 面向现代 JS 运行环境 |
| `module: ESNext` | 使用 ES 模块 |
| `moduleResolution: bundler` | 适配 Vite 打包解析 |
| `jsx: react-jsx` | React JSX 转换 |
| `allowImportingTsExtensions: true` | 允许显式导入 `.ts/.tsx` 扩展名 |
| `noEmit: true` | 仅做类型检查，不输出编译结果 |

## 4. 环境变量

文件：`.env.example`

当前模板中声明了两个变量：

| 变量名 | 说明 | 当前是否被实际代码使用 |
| --- | --- | --- |
| `GEMINI_API_KEY` | 预留给 Gemini API | 未发现使用 |
| `APP_URL` | 预留给应用部署地址 | 未发现使用 |

此外，`vite.config.ts` 还会读取：

| 变量名 | 说明 |
| --- | --- |
| `DISABLE_HMR` | 控制是否禁用 HMR 与文件监听 |

结论：

- 运行当前前端 Demo 并不依赖 `.env`
- `.env.example` 更像模板环境下的预留能力说明

## 5. 依赖清单解读

### 核心有效依赖

| 依赖 | 用途 |
| --- | --- |
| `react` | 组件与状态管理基础 |
| `react-dom` | DOM 渲染 |
| `vite` | 开发与构建工具 |
| `@vitejs/plugin-react` | React 编译支持 |
| `@tailwindcss/vite` | Tailwind 与 Vite 集成 |
| `tailwindcss` | 样式原子类体系 |
| `motion` | 动画与过渡效果 |
| `lucide-react` | 图标组件 |

### 预留或暂未接线依赖

| 依赖 | 当前状态 |
| --- | --- |
| `express` | 未发现服务端入口或使用代码 |
| `dotenv` | 未发现环境变量加载逻辑 |
| `@google/genai` | 未发现 Gemini API 调用 |
| `tsx` | 未发现服务端脚本或运行入口 |
| `@types/express` | 随 `express` 预留引入 |

### 外部运行时资源

| 资源类型 | 来源 |
| --- | --- |
| 视频文件 | Vimeo 外链 |
| 用户头像 | Unsplash 外链 |
| 页面背景图 / 封面图 | 本地 `src/assets/images/` |

## 6. 已知注意事项

### `clean` 脚本的兼容性

`package.json` 中定义了：

```json
"clean": "rm -rf dist server.js"
```

该命令更适合类 Unix 环境。在 Windows 原生 PowerShell 下通常不能直接工作，若后续要长期在 Windows 使用，建议改为跨平台方案，例如：

- `rimraf dist server.js`
- 或 PowerShell 版本的删除命令

### 无测试框架

当前仓库未发现：

- 单元测试
- 组件测试
- E2E 测试

因此回归验证主要依赖手动运行和类型检查。

## 7. 推荐的验证流程

若要确认项目可运行，建议使用以下顺序：

1. 执行 `npm install`
2. 执行 `npm run lint`
3. 执行 `npm run dev`
4. 手动验证首页、详情切换、视频弹层、评论输入和手势操作

## 8. 能力声明与实际实现差异

`metadata.json` 声明了 `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`，但当前仓库中未发现对应的服务端实现或调用链路。

这说明仓库目前处于以下状态之一：

- 来自包含 AI 能力模板的脚手架
- 计划接入 AI 能力但尚未实现
- 保留了历史依赖和环境变量模板

在阅读和维护代码时，应以“当前磁盘上的真实实现”为准，而不是以模板声明推断系统已有后端能力。
